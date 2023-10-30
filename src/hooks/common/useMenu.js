export const isMenuAllowed = (menu, user) => {
    if (menu.permission) {
        // If the menu has a specific permission
        if (user?.roles?.[0]?.permissions) {
            return user?.roles?.[0]?.permissions.some(
                (permission) => menu.permission.some(permitName => permitName === permission.name)
            );
        } else {
            return true;
        }
    }
    if (menu.children && menu.children.length != 0) {
        // If the menu has children, check if any child menu is allowed
        let childMenu = menu.children.some((childMenu) => isMenuAllowed(childMenu, user));
        return menu.children = childMenu;
    }

    // If no permission is specified for the menu and it has no children, it is allowed by default
    return true;
};

export const allowedMenuList = (menuDetails, user) => {
    if (user?.roles?.[0]?.name == 'Super Admin') {
        const menus = user?.id
            ? menuDetails.filter((menu) => !menu?.adminHidden)
            : [];
        return menus;
    } else {
        const menus = user?.id
            ? menuDetails.filter((menu) => isMenuAllowed(menu, user))
            : [];
        const menusWithChild = menus?.length != 0
            ? menus?.filter(menu => typeof menu.children != 'boolean').map((menu) => {
                if (menu?.children?.length != 0 && Array.isArray(menu.children)) {
                    const childMenu = menu?.children.filter(child => isMenuAllowed(child, user))
                    return menu = {
                        ...menu,
                        children: childMenu
                    }
                } else if (typeof menu.children == 'boolean') {
                    return menu = {
                        ...menu,
                        children: false
                    }
                } else {
                    return menu
                }
            })
            : []
        return menusWithChild;
    }
}

// Function to check if the location.pathname matches with any menuDetail path

const isMatchedPath = (pathname, menu) => {
    // Check if the pathname matches with the menu's path
    if (pathname === menu.path) {
        return true;
    }

    // If the menu has children, recursively check the children paths
    if (menu.children && menu.children.length > 0) {
        for (const childMenu of menu.children) {
            if (isMatchedPath(pathname, childMenu)) {
                return true;
            }
        }
    }

    return false;
};

export const isMatchMenu = (menuDetails, pathname) => {
    const isMatched = menuDetails.some((menu) => isMatchedPath(pathname, menu));
    return isMatched;
} 
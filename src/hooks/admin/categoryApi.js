import { Headertoken, authenticate } from "../../lib/axios";

//get category api
export function getCategories({ count }) {
    return authenticate.get(`admin/category?count=${count}`, Headertoken());
}

//delete category api
export function deleteCategory(Id) {
    return authenticate.delete(`admin/category/${Id}`, Headertoken());
}



//get subcategory api
export function getSubCategories({ count }) {
    return authenticate.get(`admin/subcategory?count=${count}`, Headertoken());
}

//delete subcategory api
export function deleteSubCategory(Id) {
    return authenticate.delete(`admin/subcategory/${Id}`, Headertoken());
}

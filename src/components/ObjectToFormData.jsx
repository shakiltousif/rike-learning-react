function objectToFormData(obj) {
    const formData = new FormData();

    for (let key in obj) {
        if (obj?.hasOwnProperty(key)) {
            formData.append(key, obj[key]);
        }
    }

    return formData;
}

export default objectToFormData;
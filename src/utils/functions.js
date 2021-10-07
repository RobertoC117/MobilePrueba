const hasErrorOn = (formik, property) =>{
    return formik.errors.hasOwnProperty(property) && formik.touched.hasOwnProperty(property)
}

export {
    hasErrorOn
}
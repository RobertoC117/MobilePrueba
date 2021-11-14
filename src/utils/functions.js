const hasErrorOn = (formik, property) =>{
    return formik.errors.hasOwnProperty(property) && formik.touched.hasOwnProperty(property)
}

const priceWithDiscount = (price, discount = 0) =>{
    if(discount === 0) return price
    let discountReal = price * discount / 100
    return price - discountReal.toFixed(2)
}

export {
    hasErrorOn,
    priceWithDiscount
}
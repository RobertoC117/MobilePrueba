import AsyncStorage from '@react-native-async-storage/async-storage'
import { CART } from '../utils/constants'
import { getProduct } from './product'

export const getCart = async() =>{
    try {
        const carrito = await AsyncStorage.getItem(CART)
        if(!carrito) return {}
        return JSON.parse(carrito)
    } catch (error) {
        return null
    }
}

export const addToCart = async({id, quantity, price}) =>{
    try {
        let cart = await getCart();

        if(!cart) throw new Error('No se pudieron obtener los productos del carrito')

        let exist = cart.hasOwnProperty(id)

        if(exist){
            cart[id].quantity += quantity
            cart[id].price = price
            cart[id].subtotal = cart[id].quantity * price
        }
        else{
            cart[id] = {quantity, price, subtotal: price*quantity}
        }

        await AsyncStorage.setItem(CART, JSON.stringify(cart))

        console.log(cart)

        return true

    } catch (error) {
        console.log(error)
        return false
    }
}

export const removeFromCart = async(id) =>{
    try {
        let cart = await getCart()
        if(!cart) throw new Error('No se pudieron obtener los productos del carrito')
        delete cart[id]
        await AsyncStorage.setItem(CART, JSON.stringify(cart))
        console.log(cart)
        return true
    } catch (error) {
        return false
    }
}

export const updateProductQuantity = async({id, quantity}) =>{
    try {
        const cart = await getCart()
        cart[id].quantity = quantity
        cart[id].subtotal = quantity * cart[id].price
        await AsyncStorage.setItem(CART, JSON.stringify(cart))
        console.log(cart)
        return true
    } catch (error) {
        return false
    }
}

export const deteleCart = async() =>{
    try {
        await AsyncStorage.removeItem(CART)
        return true
    } catch (error) {
        return false
    }
}

export const getProductsFromServer = async() =>{
    try {
        const cart = await getCart()
        let keys = Object.keys(cart)
        if(keys.length === 0) return []
        const products = await Promise.all(keys.map(id => getProduct(id)))
        products.forEach(function(item){
            item.data.result.quantity = cart[item.data.result.id].quantity
            item.data.result.subtotal = cart[item.data.result.id].subtotal
        })
        // console.log(products)
        return products
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getTotal = async() =>{
    try {
        const cart = await getCart()
        let subtotal = 0;
        console.log("CARRITO",cart)
        for (const key in cart) {
            subtotal += cart[key].subtotal
        }
        console.log("Subtotal: ", subtotal)
        return subtotal
    } catch (error) {
        console.log(error)
        return null
    }
}

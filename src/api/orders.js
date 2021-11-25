import axios from "axios";
import { API_URL } from "../utils/constants";
import { getCart } from "./cart";

export const listOrders = async(token) =>{
    try {
        const config = {
            method:'get',
            url: `${API_URL}/order/list`,
            headers:{ "Content-Type": "application/json", token },
        }
        const {status, data} = await axios(config)
        return{ status, data }
    } catch (error) {
        console.log("error", error.response.data)
        return {
            status: error.response.status,
            data: error.response.data
        }
    }
}

export const buy = async(idAddress, token)=>{
    try {
        let order = await getCart()
        let objeto = {
            address: idAddress,
            order
        }
        const config = {
            method:'post',
            url: `${API_URL}/order/create`,
            headers:{ "Content-Type": "application/json", token },
            data: JSON.stringify(objeto)
        }
        const {status, data} = await axios(config)
        console.log(data)
        return{ status, data }
    } catch (error) {
        console.log("error", error.response.data)
        return {
            status: error.response.status,
            data: error.response.data
        }
    }
}
import axios from "axios";
import { API_URL } from "../utils/constants";

export const getAddressesList = async(token) =>{
    try {
        const config = {
            method:'get',
            url: `${API_URL}/address/list`,
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


export const getAddress = async(id, token) =>{
    try {
        const config = {
            method:'get',
            url: `${API_URL}/address/getaddress/${id}`,
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

export const addNewAddress = async(formData, token) =>{
    try {
        const config = {
            method:'post',
            url: `${API_URL}/address/create`,
            headers:{ "Content-Type": "application/json", token },
            data: JSON.stringify(formData)
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

export const editAddress = async(formData, token) =>{
    try {
        const {id, ...rest} = formData
        const config = {
            method:'put',
            url: `${API_URL}/address/edit/${id}`,
            headers:{ "Content-Type": "application/json", token },
            data: JSON.stringify(rest)
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

export const deleteAddress = async(id, token) =>{
    try {
        const config = {
            method:'delete',
            url: `${API_URL}/address/delete/${id}`,
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
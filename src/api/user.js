import axios from "axios";
import { API_URL } from "../utils/constants";

export const getUserData = async(token) =>{
    try {
        const config = {
            method:'get',
            url: `${API_URL}/user/profile`,
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

export const updateInfo = async(formData, token) =>{
    try {
        const {nombre, ...rest} = formData
        rest.name = nombre
        const config = {
            method:'put',
            url: `${API_URL}/user/edit/profile`,
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

export const updatePassword = async(formData, token) =>{
    try {
        const config = {
            method:'put',
            url: `${API_URL}/user/edit/password`,
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
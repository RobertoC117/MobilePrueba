import axios from "axios";
import { API_URL } from "../utils/constants";

export const farmaLogin = async(formData) =>{
    try {

        const config = {
            method:'post',
            url: `${API_URL}/auth/login`,
            headers:{ "Content-Type": "application/json" },
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

export const googleLogin = async(formData) =>{

}

export const register = async(formData) =>{
    try {
        const {nombre, ...restData} = formData
        restData.name = nombre
        restData.gender = "male"

        const config = {
            method:'post',
            url: `${API_URL}/auth/register`,
            headers:{ "Content-Type": "application/json" },
            data: JSON.stringify(restData)
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

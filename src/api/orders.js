import axios from "axios";
import { API_URL } from "../utils/constants";

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
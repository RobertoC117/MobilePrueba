import axios from 'axios'
import {API_URL} from '../utils/constants'

export const getMainProducts = async() =>{
    try {
        let skip = Math.floor(Math.random() * (4 - 0)) + 0;
        let config = {
            method:"GET",
            url: `${API_URL}/product/list/published?sort=minortime&skip=${skip}&limit=4`,
            headers:{ "Content-Type": "application/json"},
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
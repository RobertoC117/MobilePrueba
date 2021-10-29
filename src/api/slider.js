import axios from 'axios'
import {API_URL} from '../utils/constants'

export const getCarouselImgs = async() =>{
    try {
        let config = {
            method:"GET",
            url: `${API_URL}/carousel/list`,
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
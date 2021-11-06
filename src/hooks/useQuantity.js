import {useState} from 'react'

export const useQuantity = (value = 0) =>{
    const [quantity, setQuantity] = useState(value)

    const increase = () =>{
        // if(quantity < 10){
            setQuantity(quantity + 1)
        // }
    }
    const decrease = () =>{
        if(quantity > 0){
            setQuantity(quantity - 1)
        }
    }

    return {
        quantity,
        increase,
        decrease
    }
}

export default useQuantity
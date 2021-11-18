import AsyncStorage from '@react-native-async-storage/async-storage'
import { HISTORY } from '../utils/constants'

export const getHistory = async() =>{
    try {
        // await AsyncStorage.removeItem(HISTORY)
        const history = await AsyncStorage.getItem(HISTORY)
        if(!history) return []
        return JSON.parse(history)
    } catch (error) {
        console.log(error)
        return null
    }
}

const existSearch = (history, search) =>{
    try {
        let match = false
        let valueIndex = -1
        let regExpSearch = new RegExp(search, 'i')
        
        history.every((item, index)=>{
            if(regExpSearch.test(item)){
                match = true
                valueIndex = index
                return
            }
        })

        if(!match) return -1
        
        return valueIndex
        
    } catch (error) {
        
    }
}

export const addItem = async(word) =>{
    try {
        let history = await getHistory()

        if(!history) throw new Error('Error al obtener el historial')

        let index = existSearch(history, word)

        if(index > 0 || index < 0){
            history.splice(index, index)
            if(history.length === 10)
                history.pop()
        }else if(index === 0){
            history.shift()
        }

        history.unshift(word)

        await AsyncStorage.setItem(HISTORY, JSON.stringify(history))

        return true

    } catch (error) {
        console.log(error)
        return false
    }
}

export const deleteItem = async(index) =>{
    try {
        let history = await getHistory()
        if(index > 0)
            history.splice(index, index)
        else
            history.shift()
        
        await AsyncStorage.setItem(HISTORY, JSON.stringify(history))
    
    } catch (error) {
        console.log(error)    
    }
}

export const deleteHistory = async() =>{
    try {
        await AsyncStorage.removeItem(HISTORY)
        return true
    } catch (error) {
        console.log(error)
        return null
    }
}



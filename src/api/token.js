import AsyncStorage from "@react-native-async-storage/async-storage";

export const setToken = async(value, name) =>{
    try {
        await AsyncStorage.setItem(name, value)
        return true
    } catch (error) {
        return false
    }
}

export const getToken = async(name) =>{
    try {
        const token = await AsyncStorage.getItem(name)
        return token
    } catch (error) {
        return null
    }
}

export const removeToken = async(name) =>{
    try {
        await AsyncStorage.removeItem(name)
        return true
    } catch (error) {
        return false
    }
}
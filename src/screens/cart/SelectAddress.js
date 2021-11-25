import React,{useState, useCallback} from 'react'
import { View, Text, ScrollView, StyleSheet, ToastAndroid } from 'react-native'
import { Button } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/core'
import { useNavigation } from '@react-navigation/core'
import { getAddressesList } from '../../api/address'
import useAuth from '../../hooks/useAuth'
import TransparentScreenLoading from '../../components/TransparentScreenLoading'
import AddressSelectList from '../../components/Cart/AddressSelectList'
import EmptyList from '../../components/EmptyList'
import NoAddresses from '../../../assets/images/map.png'
import { formsStyles } from '../../styles'
import { buy } from '../../api/orders'
import { deteleCart } from '../../api/cart'

export default function SelectAddress() {

    const [address, setAddress] = useState(null)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [loading, setLoading] = useState(false)

    const {auth} = useAuth()
    const navigation = useNavigation()

    useFocusEffect(
        useCallback(()=>{
            (async()=>{
                setLoading(true)
                const {data, status} = await getAddressesList(auth.token)
                setAddress(data.result)
                setLoading(false)
            })()
        }, [])
    )

    if(loading) return (<TransparentScreenLoading text="Cargando direcciones de envio..." />)

    const emptyListView = () => {
        return(
            <View>
                <EmptyList
                    title="¡Vaya!"
                    message="Aun no tienes direcciones de entrega registradas"
                    imagen={NoAddresses}
                />
                <Button
                    mode="contained"
                    style={styles.addButton}
                    onPress={()=>navigation.navigate('account')}
                >
                    Agregar direccion
                </Button>
            </View>
        )
    }

    const comprar = async() =>{
        try {
            const {status, data} = await buy(selectedAddress.id, auth.token)
            if(status !== 200) throw new Error(data.errors[0].msg)
            await deteleCart()
            navigation.goBack()
        } catch (error) {
            console.log(error)
            ToastAndroid.showWithGravity("Vaya! Algo salio mal:(", ToastAndroid.LONG, ToastAndroid.CENTER)
        }
    }

    return (
        <>
            <ScrollView style={{backgroundColor:"white"}}>
                {
                    address && (
                        address.length > 0 ? (
                            <AddressSelectList 
                                addresses={address} 
                                selectedAddress={selectedAddress}
                                setSelectedAddress={setSelectedAddress} 
                            />
                        ):(
                            emptyListView()
                        )
                    )
                }
            </ScrollView>
            <View style={ styles.btnComprar}>
                <Button
                    mode="contained"
                    style={formsStyles.btnDefault}
                    onPress={comprar}
                >
                    comprar
                </Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    addButton:{
        marginHorizontal:50,
        padding:5
    },
    btnComprar:{
        padding:10,
        borderTopStartRadius: 15,
        borderTopEndRadius:15,
        borderColor:"#C4C4C4",
        borderWidth:1,
        backgroundColor:"white"
    }
})

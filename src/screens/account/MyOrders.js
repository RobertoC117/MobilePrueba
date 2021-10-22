import React,{useCallback, useState} from 'react'
import { useFocusEffect } from '@react-navigation/core'
import { View, Text, StyleSheet, ScrollView, ToastAndroid } from 'react-native'

import Box from '../../../assets/images/box.png'
import useAuth from '../../hooks/useAuth'
import { layoutStyles } from '../../styles'
import EmptyList from '../../components/EmptyList'
import TransparentScreenLoading from '../../components/TransparentScreenLoading'
import { listOrders } from '../../api/orders'
import ListOrders from '../../components/Orders/ListOrders'

export default function MyOrders() {

    const [orders, setOrders] = useState(null)
    const {auth} = useAuth()

    useFocusEffect(
        useCallback(()=>{
            (async()=>{
                try {
                    const {status, data} = await listOrders(auth.token)
                    if(status !== 200) throw new Error(data.errors[0].message)
                    setOrders(data.result)
                    console.log("Se cargaron con exito los pedidos")
                } catch (error) {
                    ToastAndroid.showWithGravity("Ocurrió un error al cargar los pedidos", ToastAndroid.LONG, ToastAndroid.CENTER)
                    setOrders([])
                }
            })()
        }, [])
    )

    if(!orders){
        return(
            <TransparentScreenLoading text="Cargando pedidos..." />
        )
    }

    return (
        <ScrollView style={styles.container}>
            {
                orders && orders.length > 0 ?(
                    <ListOrders orders={orders} />
                ):(
                    <EmptyList 
                        title="¡Oh!"  
                        message="Aun no has realizado ningun pedido"
                        imagen={Box}
                    />
                )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: layoutStyles.container.backgroundColor
    }
})

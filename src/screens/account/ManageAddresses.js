import React, { useState, useCallback } from 'react'
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native'
import { Button, FAB } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'

import AddressIcon from '../../../assets/images/map.png'
import ListAddresses from '../../components/Addresses/ListAddresses'
import TransparentScreenLoading from '../../components/TransparentScreenLoading'
import EmptyList from '../../components/EmptyList'
import { formsStyles, layoutStyles } from '../../styles'
import { getAddress, getAddressesList } from '../../api/address'
import useAuth from '../../hooks/useAuth'


export default function ManageAddresses(props) {

    const {navigation} = props

    const [addresses, setAddresses] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const {auth} = useAuth()

    const getAddresses = async() =>{
        try {
            const {data, status} = await getAddressesList(auth.token)
            console.log("Se cargaron las direcciones")
            setAddresses(data.result)
        } catch (error) {
            
        }
    }

    useFocusEffect(
        useCallback(()=>{
            getAddresses()
        }, [refresh])
    )

    const reloadList = () => setRefresh(!refresh)

    if(!addresses){
        return (
            <TransparentScreenLoading text="Cargando direcciones..." />
        )
    }

    return (
        <>
        <ScrollView style={styles.container}>
            {
                addresses && addresses.length > 0 ? (
                    <ListAddresses addresses={addresses} reloadList={reloadList}/>
                ):(
                    <EmptyList
                        title="¡Vaya!"
                        message="Aun no tienes direcciones de entrega registradas"
                        imagen={AddressIcon}
                    />
                )
            }
        </ScrollView>
        <FAB 
            label="Agregar"
            style={styles.fab}
            icon="map-plus"
            onPress={()=>navigation.push('address-form')}
        />
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        // padding:20,
        backgroundColor: layoutStyles.container.backgroundColor
    },
    fab:{
        position:"absolute",
        margin: 16,
        right: 0,
        bottom: 20,
        justifyContent:"center",
        // backgroundColor: "red"
    }
})

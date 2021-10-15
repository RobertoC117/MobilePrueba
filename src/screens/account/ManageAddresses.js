import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Button, FAB } from 'react-native-paper'

import AddressIcon from '../../../assets/images/map.png'
import ListAddresses from '../../components/Addresses/ListAddresses'
import EmptyList from '../../components/EmptyList'
import { formsStyles, layoutStyles } from '../../styles'


export default function ManageAddresses(props) {

    const {navigation} = props

    const [addresses, setAddresses] = useState(null)

    return (
        <>
        <ScrollView style={styles.container}>
            {/* <View style={styles.btnAddContainer}>
                <Button 
                    mode="contained"
                    style={[formsStyles.btnDefault,styles.btnAdd]}
                    icon="plus-circle"
                >
                    Agregar
                </Button>
            </View> */}
            {
                addresses ? (
                    <ListAddresses addresses={addresses}/>
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
    btnAddContainer:{
        // backgroundColor:"red",
        width:"100%",
        flexDirection:"row",
        justifyContent:"flex-end"
    },
    btnAdd:{
        width:"40%",
        marginTop:0
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

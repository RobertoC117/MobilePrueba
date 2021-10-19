import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Alert, ToastAndroid } from 'react-native'
import { Title, IconButton, Button, Caption, Paragraph, Card } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'

import useAuth from '../../hooks/useAuth'
import { deleteAddress } from '../../api/address'

export default function ListAddresses(props) {

    const navigation = useNavigation()
    const {addresses, reloadList} = props

    const {auth} = useAuth()

    const deteleAddress = (id) =>{
        Alert.alert(
            "Eliminar direccion",
            "¿Desea eliminar esta direccion?",
            [
                {
                    text:"Si",
                    onPress:async()=>{
                        try {
                            await deleteAddress(id, auth.token)
                            reloadList()
                        } catch (error) {
                            ToastAndroid.showWithGravity("Error al eliminar", ToastAndroid.LONG, ToastAndroid.CENTER)
                        }
                    }
                },
                {
                    text:"No"
                }
            ],
            {cancelable: false}
        )
    }

    return (
        <View style={styles.container}>
            {
                addresses.map(address =>(
                    <TouchableWithoutFeedback key={address.id} onPress={()=>navigation.push('address-form',{address})}>
                        <View style={styles.addressCard}>
                            <View style={styles.titeContainer}>
                                <Title style={styles.title}>{address.title}</Title>
                                <IconButton icon="delete" color="red" size={25} style={styles.deleteButton} onPress={()=>deteleAddress(address.id)} />
                            </View>
                            {/* <Paragraph>Calle Francisco de P. Mariel, Col. Coco chico, Huejutla de Reyes Hidalgo </Paragraph> */}
                            <Paragraph>
                                {`${address.street}, ${address.colony}, `} 
                                {address.int_num && `numero interior ${address.int_num}, `}
                                {address.out_num && `numero exterior ${address.out_num} `}
                            </Paragraph>
                            <Caption>{`${address.reference}`}</Caption>
                        </View>
                    </TouchableWithoutFeedback>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        // padding:10,
    },
    addressCard:{
        borderBottomWidth:1,
        padding:15,
        borderColor:"#E0E0E0",
        // marginTop:10
    },
    btnContainer:{
        flexDirection:"row",
        justifyContent:"flex-end"
    },
    titeContainer:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    title:{
        maxWidth:"85%",
    },
    deleteButton:{
        zIndex:3
    }
})

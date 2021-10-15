import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Title, IconButton, Button, Caption, Paragraph, Card } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'

export default function ListAddresses(props) {
    const navigation = useNavigation()
    const {addresses} = props
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={()=>navigation.push('address-form',{idAddress:"aaaa"})}>
                <View style={styles.addressCard}>
                    <View style={styles.titeContainer}>
                        <Title style={styles.title}>Casa Jose</Title>
                        <IconButton icon="delete" color="red" size={25} style={styles.deleteButton} onPress={()=>console.log("adios")} />
                    </View>
                    <Paragraph>Calle Francisco de P. Mariel, Col. Coco chico, Huejutla de Reyes Hidalgo </Paragraph>
                    <Caption>A mitad de calle, casa color blanca </Caption>
                </View>
            </TouchableWithoutFeedback>
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

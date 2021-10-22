import React,{useState} from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import {Title, Subheading, Caption} from 'react-native-paper'

export default function ViewOrderDetail(props) {

    const { route:{params:{products, address, total}} } = props

    return (
        <View>
            <View style={styles.addressInfoContainer}>
                <Title>Direccion de entrega</Title>
                <Subheading>{address.colony}, {address.street}</Subheading>
                <Subheading>{address.int_num ? address.int_num : "s/n"} int, {address.out_num ? address.out_num : "s/n"} ext.</Subheading>
                <Title style={{fontSize:18}}>
                    Total: <Title style={{fontSize:18, color:"green"}}>${total}</Title>
                </Title>
            </View>
            {
                products.map((item, index) => (
                    <View key={index} style={styles.container}>
                        <View style={styles.imgContainer}>
                            <Image style={styles.img} source={{uri: item.product.main_img}} />
                        </View>
                        <View style={styles.infoContainer}>
                            <Title style={styles.productName}>{item.product.title}</Title>
                            <Caption>{item.product.brand}</Caption>
                            <Subheading>Cantidad: {item.quantity}</Subheading>
                            <Subheading>
                                Subtotal: 
                                <Subheading style={styles.subtotal}> ${item.subtotal}</Subheading>
                            </Subheading>
                        </View>
                    </View>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        borderColor:"#CDCDCD",
        borderBottomWidth:1,
        // backgroundColor:"red",
    },
    addressInfoContainer:{
        padding:10,
        borderColor:"#CDCDCD",
        borderBottomWidth:1,
    },
    imgContainer:{
        height:"100%",
        width:"35%",
        padding:3,
        // backgroundColor:"green",
    },
    img:{
        resizeMode:"contain",
        height:150,
        width:"100%",
        alignItems:"center"
    },
    infoContainer:{
        padding:5,
        width:"65%",
    },
    productName:{
        fontSize:17
    },
    subtotal:{
        color:"green"
    }
})

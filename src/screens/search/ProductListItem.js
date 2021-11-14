import React from 'react'
import { View, Text, StyleSheet, Image, TouchableNativeFeedback } from 'react-native'
import { Caption, Title } from 'react-native-paper'

export default function ProductListItem() {
    return (
        <TouchableNativeFeedback onPress={()=>console.log("Ok")}>
            <View style={styles.container}>
                <View style={styles.containerPhoto}>
                    <Image style={styles.img} source={{ uri: 'https://picsum.photos/700' }} />
                </View>
                <View style={styles.containerInfo}>
                    <Title style={styles.title} numberOfLines={2}>
                        Nombre del producto honhsh jjdjj djdjjdjd
                    </Title>
                    <Caption style={styles.brand}>Marca</Caption>
                    {/* <Title style={styles.price}>$60</Title> */}
                    <Title style={styles.oldPrice}>Antes: $60</Title>
                    <View style={styles.discountInfo}>
                        <Title style={styles.newPrice}>Ahora: $60</Title>
                        <Title style={styles.save}>Ahorras: $60</Title>
                    </View>
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles= StyleSheet.create({
    container:{
        width:"100%",
        flexDirection:"row",
        padding:5,
        borderBottomColor:"#D4D4D4",
        borderBottomWidth:1.5,
        // height:175,
        // backgroundColor:"yellow"
    },
    containerPhoto:{
        width:"35%",
        // backgroundColor:"red"
    },
    containerInfo:{
        width:"65%",
        // backgroundColor:"blue",
        padding:5
    },
    title:{
        fontSize:16,
    },
    img:{
        resizeMode:"contain",
        height:150
    },
    price:{
        color:"green",
        fontSize:22,
        margin:0,
    },
    newPrice:{
        color:"green",
        fontSize:16,
        margin:0,
        width:"48%"
    },
    oldPrice:{
        color:"red",
        textDecorationLine:"line-through",
        fontSize:16,
        margin:0
    },
    save:{
        color:"white",
        fontSize:16,
        backgroundColor:"#E1C300",
        borderRadius:10,
        textAlignVertical:"center",
        textAlign:"center",
        width:"48%"
    },
    brand:{
        fontSize:15,
        fontWeight:"600"
    },
    discountInfo:{
        flexDirection:"row",
        justifyContent:"space-evenly",
    }
})

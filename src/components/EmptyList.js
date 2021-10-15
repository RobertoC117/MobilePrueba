import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Title, Subheading } from 'react-native-paper'
import { layoutStyles } from '../styles'

export default function EmptyList(props) {

    const {title, message, imagen} = props

    return (
        <View style={[layoutStyles.container, styles.container]}>
            <Image source={imagen} style={styles.img}/>
            <Title style={styles.title}>{title}</Title>
            <Subheading style={styles.text}>{message}</Subheading>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        // backgroundColor:"red",
        height:500
    },
    img:{
        width: "100%",
        height:180,
        resizeMode: "contain",
        marginBottom: 20,
    },
    title:{
        fontWeight:"bold",
        fontSize:22,
        textAlign:"center"
    },
    text:{
        textAlign:"center"
    },
    button:{
        padding:12,
        textAlign:"center",
        width:"60%",
        marginTop:20,
    }
})

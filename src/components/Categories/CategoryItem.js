import React from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import { Avatar, Subheading, Surface } from 'react-native-paper'

export default function CategoryItem(props) {
    const {text, icon} = props
    return (
        <TouchableNativeFeedback onPress={()=>console.log("Hola")}>
            <Surface style={styles.container}>
                <Avatar.Image source={{ uri: 'https://picsum.photos/700' }} size={50} />
                {/* <AwesomeIcon name={icon} color="#103F6E" size={20} /> */}
                <Subheading style={styles.text} numberOfLines={2}>
                    {text}
                </Subheading>
            </Surface>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    container:{
        borderRadius:10,
        borderColor:"#C4C4C4",
        borderWidth:1,
        width:"49%",
        height:70,
        marginBottom:5,
        flexDirection:"row",
        alignItems:"center",
        padding:5,
        elevation:2
    },
    text:{
        fontSize:15,
        fontWeight:"bold",
        // color:"white",
        width:"65%",
        marginStart:10,
    },
})

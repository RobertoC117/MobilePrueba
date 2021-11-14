import React from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native'
import { IconButton } from 'react-native-paper'

export default function HistoryItem(props) {
    const {text, index} = props
    return (
        <View style={styles.container}>
            <TouchableNativeFeedback onPress={()=>console.log("Hola")}>
                <View style={styles.label}>
                    <Text>Busqueda</Text>
                </View>
            </TouchableNativeFeedback>
            <IconButton icon="close" size={25} color="#A0A0A0" onPress={()=>console.log("eliminado")} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        width:"100%",
        height:40,
        // backgroundColor:"red",
        justifyContent:"space-between",
        alignItems:"center",
        // paddingHorizontal:10,
        margin:0,
        borderBottomColor:"#C4C4C4",
        borderBottomWidth:1,
    },
    label:{
        height:"100%",
        // backgroundColor:"green",
        width:"85%",
        justifyContent:"center",
        paddingStart:20,
    }
})

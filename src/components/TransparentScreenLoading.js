import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native'

export default function TransparentScreenLoading(props) {

    const {text, size, color} = props

    return (
        <SafeAreaView style={styles.container}>
            <ActivityIndicator size="large" color="white" style={styles.loading} />
            <Text style={styles.title}> {text} </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
        height:"100%",
        width:"100%",
        zIndex:2,
        position:"absolute"
    },
    loading:{
        marginBottom:10,
    },
    title:{
        fontSize:18,
        color: 'white'
    }
})

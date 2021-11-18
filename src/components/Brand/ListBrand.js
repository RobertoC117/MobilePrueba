import React from 'react'
import { View, StyleSheet, TouchableNativeFeedback} from 'react-native'
import { Avatar, Surface, Title } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'

export default function ListBrand(props) {

    const {brands} = props
    const navigation = useNavigation()

    return (
        <>
            {
                brands.map(item =>(
                    <TouchableNativeFeedback key={item.id} onPress={()=>navigation.push("search",{busqueda: item.name, filtro:"marca"})}>
                        <View style={styles.item}>
                            <Avatar.Image
                                source={{ uri: item.img_url }}
                            />
                            <Title style={styles.title}>{item.name}</Title>
                        </View>
                    </TouchableNativeFeedback>
                ))
            }
        </>
    )
}

const styles = StyleSheet.create({
    item:{
        flexDirection:"row",
        padding:10,
        paddingStart:20,
        alignItems:"center",
        backgroundColor:"white"
    },
    title:{
        paddingStart:10,
    }
})

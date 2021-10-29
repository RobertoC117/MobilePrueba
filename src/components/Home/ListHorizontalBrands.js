import React,{useEffect, useState} from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import { Avatar, Surface, Subheading, Title } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'
import { getBrands } from '../../api/brands'

export default function ListHorizontalBrands() {

    const [brands, setBrands] = useState(null)
    const [fullBrands, setFullBrands] = useState(null)
    const navigation = useNavigation()

    useEffect(()=>{
        (async()=>{
            let {data} = await getBrands()
            setBrands(data.result.slice(0,4))
            setFullBrands(data.result)
        })()
    }, [])

    return (
        <View>
            <Title style={styles.titulo}>Marcas</Title>
            <ScrollView horizontal={true} style={styles.containerScroll} showsHorizontalScrollIndicator={false}>

                {
                    brands && (
                        brands.map(item => (
                            <TouchableNativeFeedback key={item.id} onPress={()=>console.log("Hola")}>
                                <Surface style={styles.card}>
                                    <Avatar.Image
                                        source={{uri:item.img_url}}
                                        size={50}
                                    />
                                    <Subheading numberOfLines={2} style={{textAlign:"center"}} >
                                        {item.name}
                                    </Subheading>
                                </Surface>
                            </TouchableNativeFeedback>
                        ))
                    )
                }

                <TouchableNativeFeedback onPress={()=>navigation.push("brands")}>
                    <Surface style={styles.card}>
                        <Subheading numberOfLines={2} style={{textAlign:"center"}} >
                            VER MAS
                        </Subheading>
                    </Surface>
                </TouchableNativeFeedback>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginBottom:10,
        paddingEnd:10
    },
    containerScroll:{
        padding:10,
    },
    titulo:{
        marginVertical:0,
        paddingStart:15
    },
    card:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        height:130,
        width:100,
        backgroundColor:"white",
        borderRadius:5,
        padding:5,
        marginRight:10,
        marginBottom:10,
        elevation:4
    }
})

import { useNavigation } from '@react-navigation/core'
import React,{useEffect, useState} from 'react'
import { View, StyleSheet, ScrollView, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native'
import { Title, Card, Caption, Paragraph } from 'react-native-paper'
import { getProductsByCategory } from '../../api/product'
import { priceWithDiscount } from '../../utils/functions'
import VerticalProductItem from './VerticalProductItem'

export default function Interest(props) {

    const {category} = props

    const [products, setProducts] = useState(null)

    const navigation = useNavigation()

    useEffect(()=>{
        (async()=>{
            let {data} = await getProductsByCategory(category)
            setProducts(data.result)
        })()
    }, [])

    if(!products || products.length === 0) return null

    return (
        <View>
            <Title style={styles.title}>Tambien te podria interesar:</Title>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    products.map(item => (
                        <TouchableWithoutFeedback key={item.id} onPress={()=>navigation.push('detail', {idProduct: item.id})}>
                            <View style={styles.items}>
                                <VerticalProductItem product={item} />
                            </View>
                        </TouchableWithoutFeedback>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        flexWrap:"wrap",
        width:"100%",
        // backgroundColor:"green",
        padding:15,
        justifyContent:"space-between"
    },
    items:{
        width:150,
        // backgroundColor:"red",
        margin:5
    },
    title:{
        paddingStart:15
    },
})

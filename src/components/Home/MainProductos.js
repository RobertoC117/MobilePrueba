import React,{useEffect, useState} from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback, TouchableWithoutFeedback} from 'react-native'
import { Card, Title, Paragraph, Caption} from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'
import { getMainProducts } from '../../api/product'
import { priceWithDiscount } from '../../utils/functions'
import VerticalProductItem from '../Product/VerticalProductItem'


export default function MainProductos(props) {
    // const {products} = props
    const navigation = useNavigation()

    const [products, setProducts] = useState(null)

    useEffect(()=>{
        (async()=>{
            let {data} = await getMainProducts()
            setProducts(data.result)
        })()
    }, [])

    return (
        <View>
            <Title style={styles.title}>Recomendaciones</Title>
            <View style={styles.container}>
                {
                    products && (
                        products.map(item => (
                            <TouchableWithoutFeedback key={item.id} onPress={()=>navigation.push('detail',{idProduct: item.id})}>
                                <View style={styles.items}>
                                    <VerticalProductItem product={item} />
                                </View>
                                {/* <Card style={styles.items}>
                                    <Card.Cover style={{
                                        width: "100%",
                                        height:100,
                                        resizeMode: "contain",
                                    }} source={{ uri: item.main_img }} />
                                    <Card.Content>
                                        <Paragraph numberOfLines={2}>{item.title}</Paragraph>
                                        <Caption>{item.brand}</Caption>
                                        <View style={{flexDirection:"row"}}>
                                            {
                                                !item.discount ? (
                                                    <Paragraph style={styles.price}>${item.price}</Paragraph>
                                                ):(
                                                    <>
                                                        <Paragraph style={styles.oldPrice}>${item.price}</Paragraph>
                                                        <Paragraph style={styles.price}>${priceWithDiscount(item.price, item.discount)}</Paragraph>
                                                    </>
                                                )
                                            }
                                        </View>
                                    </Card.Content>
                                </Card> */}
                            </TouchableWithoutFeedback>
                        ))
                    )
                }
            </View>
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
        width:"49%",
        // backgroundColor:"red",
        // height:180,
        marginTop:10
    },
    title:{
        paddingStart:15
    }
})

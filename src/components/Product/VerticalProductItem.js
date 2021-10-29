import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Paragraph, Caption, Card } from 'react-native-paper'
import { priceWithDiscount } from '../../utils/functions'


export default function VerticalProductItem(props) {

    const {product} = props

    return (
        <Card style={styles.item}>
            <Card.Cover style={styles.img} source={{ uri: product.main_img }} />
            <Card.Content style={styles.content}>
                <Paragraph numberOfLines={2}>{product.title}</Paragraph>
                <Caption>{product.brand}</Caption>
                <View style={{flexDirection:"row"}}>
                {
                    !product.discount ? (
                        <Paragraph style={styles.price}>${product.price}</Paragraph>
                    ):(
                        <>
                            <Paragraph style={styles.oldPrice}>${product.price}</Paragraph>
                            <Paragraph style={styles.price}>${priceWithDiscount(product.price, product.discount)}</Paragraph>
                        </>
                    )
                }
                </View>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    item:{
        minHeight:208
    },
    img:{
        width: "100%",
        height:100,
        resizeMode: "contain",
    },
    price:{
        fontWeight:"bold",
        color:"green"
    },
    oldPrice:{
        textDecorationLine:"line-through",
        color:"red",
        marginEnd:5
    },
    content:{
        paddingHorizontal: 10
    }
})

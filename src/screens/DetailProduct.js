import React,{useEffect, useState} from 'react'
import { View, Text, ScrollView, StyleSheet, ToastAndroid } from 'react-native'
import { Button, Caption, Paragraph, Title, TextInput} from 'react-native-paper'
import {Picker} from "@react-native-community/picker"
import {useNavigation} from '@react-navigation/native'

import Interest from '../components/Product/Interest'
import Slider from '../components/Product/Slider'
import { formsStyles } from '../styles'
import { getProduct } from '../api/product'
import {addToCart} from '../api/cart'
import TransparentScreenLoading from '../components/TransparentScreenLoading'
import { priceWithDiscount } from '../utils/functions'

export default function DetailProduct(props) {

    const{route:{params:{idProduct}}} = props

    const [product, setProduct] = useState(null)
    const [cantidad, setCantidad] = useState(1)

    console.log(props.route)

    const navigation = useNavigation()

    useEffect(()=>{
        (async()=>{
            let {data} = await getProduct(idProduct)
            let imagenes = [{url: data.result.main_img}]
            imagenes.push(...data.result.detail_img)
            setProduct({...data.result, imagenes})
        })()
    }, [])

    if(!product){
        return (<TransparentScreenLoading text="Cargando producto..." />)
    }

    const addProduct = async(datos) =>{
        let status = await addToCart(datos)
        if(status){
            navigation.navigate('cart')
            // ToastAndroid.showWithGravity("Producto añadido al carrito", ToastAndroid.LONG, ToastAndroid.CENTER)
        }else{
            ToastAndroid.showWithGravity("Opps! Algo salio mal", ToastAndroid.LONG, ToastAndroid.CENTER)
        }
    }   

    return (
        <ScrollView>
            <Slider imagenes={product.imagenes}/>
            <View style={style.container}>
                <View style={style.containerInfo}>
                    <Title>{product.title}</Title>
                    <Caption style={style.caption}>{product.brand}</Caption>
                    <View style={style.priceContainer}>
                    {
                        !product.discount ? (
                            <Title style={style.price}>${product.price}</Title>
                        ):(
                            <>
                                <Title style={style.oldPrice}>${product.price}</Title>
                                <Title style={style.price}>${priceWithDiscount(product.price, product.discount)}</Title>
                            </>
                        )
                    }
                    </View>
                </View>
                <View style={style.controlsContainer}>
                    <View style={style.containerInput}>
                        <View style={formsStyles.inputPickerWrap}>
                            <Picker style={formsStyles.textInput}
                                selectedValue={cantidad}
                                onValueChange={value => setCantidad(value)}
                            >
                                <Picker.Item label="1" value={1} />
                                <Picker.Item label="2" value={2} />
                                <Picker.Item label="3" value={3} />
                                <Picker.Item label="4" value={4} />
                                <Picker.Item label="5" value={5} />
                                <Picker.Item label="6" value={6} />
                            </Picker>
                        </View>
                    </View>
                    <View style={style.containerInput}>
                        <Button
                            mode="contained"
                            style={style.addButton}
                            labelStyle={style.labelStyle}
                            onPress={()=> addProduct({
                                id: product.id,
                                quantity: cantidad,
                                price: priceWithDiscount(product.price, product.discount)
                            })}
                        >
                            Agregar a la cesta
                        </Button>
                    </View>      
                </View>
            
                <Title>Descripcion</Title>
                <Paragraph style={style.description}>
                    {
                        product.description ? 
                            product.description 
                        : (
                            <Caption style={style.descriptionCaption}>No hay descripcion</Caption>
                        )
                    }
                    {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. */}
                </Paragraph>
                <Interest category={product.category}/>
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container:{
        padding:15
    },
    addButton:{
        height:55,
        justifyContent:"center",
    },
    containerInfo:{
        marginBottom:10
    },
    caption:{
        fontSize:17
    },
    controlsContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginBottom:10
    },
    containerInput:{
        width:"49%",
    },
    labelStyle:{
        fontSize:12,
    },
    price:{
        color:"green",
        marginEnd:10
    },
    oldPrice:{
        color:"red",
        textDecorationLine:"line-through",
        marginEnd:10
    },
    priceContainer:{
        flexDirection:"row",
    },
    description:{
        marginBottom:20
    },
    descriptionCaption:{
        fontSize:16
    }
})

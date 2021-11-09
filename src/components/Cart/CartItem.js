import React from 'react'
import { View, Text, Image, StyleSheet, Button, TextInput, TouchableNativeFeedback, Alert} from 'react-native'
import { Title, IconButton, Caption} from 'react-native-paper'
import { colors } from '../../styles/colors'
import useQuantity from '../../hooks/useQuantity'
import {removeFromCart, updateProductQuantity} from '../../api/cart'
import { priceWithDiscount } from '../../utils/functions'

export default function CartItem({producto , reloadCart}) {

    const {quantity, increase, decrease} = useQuantity(producto.quantity)

    const eliminar = (id) =>{
        Alert.alert(
            "Eliminar producto",
            "¿Desea eliminar este producto de su carrito?",
            [
                {
                    text:"Si",
                    onPress:async()=>{
                        await removeFromCart(id)
                        reloadCart()
                    }
                },
                {
                    text:"No"
                }
            ],
            {cancelable: false}
        )
    }

    const disminuirCantidad = async(id) =>{
        if(quantity === 1){
            eliminar(id)
        }else{
            decrease()
            await updateProductQuantity({id, quantity: quantity-1})
            console.log(producto.quantity)
        }
    }

    const aumentarCantidad = async(id) =>{
        increase()
        await updateProductQuantity({id, quantity: quantity+1})
        console.log(producto.quantity)
    }

    return (
        <View key={producto.id}>
            <View style={styles.container}>
                <View style={styles.conatinerImg}>
                    <Image style={styles.imagen} source={{ uri: producto.main_img }} />
                </View>
                <View style={styles.containerInfo}>
                    <Title style={styles.title} numberOfLines={2}>
                        {producto.title}
                    </Title>
                    <Caption>
                        {producto.brand}
                    </Caption>
                    <View style={{flexDirection:"row"}}>
                        {
                            !producto.discount ? (
                                <Text style={styles.price}>${producto.price}</Text>
                            ):(
                                <>
                                    <Text style={styles.oldPrice}>${producto.price}</Text>
                                    <Text style={styles.price}>${priceWithDiscount(producto.price, producto.discount)}</Text>
                                </>
                            )
                        }
                    </View>
                    
                    <View style={styles.quantityControls}>
                        <Button title="  -  " onPress={()=>disminuirCantidad(producto.id)} color={colors.primary}/>
                        <TextInput value={quantity.toString()} style={styles.txtCantidad} editable={false} />
                        <Button title="  +  " onPress={()=>aumentarCantidad(producto.id)} color={colors.primary}/>
                    </View>
                </View> 
                <IconButton
                    icon="delete"
                    color="red"
                    size={25}
                    onPress={() => eliminar(producto.id)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        padding:10,
        borderBottomColor:"#C4C4C4",
        borderBottomWidth:1
    },
    containerInfo:{
        width:"60%",
        paddingHorizontal: 5,
        marginBottom:10,
        // backgroundColor:"green"
    },
    conatinerImg:{
        width:"30%"
    },
    imagen:{
        resizeMode:"contain",
        height:130
    },
    txtCantidad:{
        textAlign:"center",
        color:"black",
        width:50,
        borderColor:"#C4C4C4",
        borderWidth:1,
        padding:0
    },
    title:{
        fontSize:15
    },
    price:{
        fontWeight:"bold",
        color:"green",
        margin:5,
        fontSize:16
    },
    oldPrice:{
        color:"red",
        textDecorationLine:"line-through",
        margin:5,
        marginEnd:10,
        fontSize:16
    },
    quantityControls:{
        flexDirection:"row",
        marginVertical:10,
        justifyContent:"center",
        alignItems:"stretch"
    },
    btnEliminar:{
        borderColor:"red"
    }
})

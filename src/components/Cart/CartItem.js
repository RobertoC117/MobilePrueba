import React from 'react'
import { View, Text, Image, StyleSheet, Button, TextInput, TouchableNativeFeedback, Alert} from 'react-native'
import { Title, IconButton, Button as BtnPaper} from 'react-native-paper'
import { colors } from '../../styles/colors'
import useQuantity from '../../hooks/useQuantity'

export default function CartItem() {

    const {quantity, increase, decrease} = useQuantity()

    const eliminar = () =>{
        Alert.alert(
            "Eliminar producto",
            "¿Desea eliminar este producto de su carrito?",
            [
                {
                    text:"Si",
                },
                {
                    text:"No"
                }
            ],
            {cancelable: false}
        )
    }

    const disminuirCantidad = () =>{
        if(quantity === 1){
            eliminar()
        }else{
            decrease()
        }
    }

    return (
        <TouchableNativeFeedback onPress={()=>console.log("Hola")}>
            <View style={styles.container}>
                <View style={styles.conatinerImg}>
                    <Image style={styles.imagen} source={{ uri: 'https://picsum.photos/700' }} />
                </View>
                <View style={styles.containerInfo}>
                    <Title style={styles.title} numberOfLines={2}>
                        Nombre completo del productoNombre completo del producto
                    </Title>
                    <View style={{flexDirection:"row"}}>
                        <Text style={styles.oldPrice}>$20</Text>
                        <Text style={styles.price}>$20</Text>
                    </View>
                    
                    <View style={styles.quantityControls}>
                        <Button title="  -  " onPress={disminuirCantidad} color={colors.primary}/>
                        <TextInput value={quantity.toString()} style={styles.txtCantidad} editable={false} />
                        <Button title="  +  " onPress={increase} color={colors.primary}/>
                    </View>
                </View> 
                <IconButton
                    icon="delete"
                    color="red"
                    size={25}
                    onPress={() => eliminar()}
                />
            </View>
        </TouchableNativeFeedback>
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

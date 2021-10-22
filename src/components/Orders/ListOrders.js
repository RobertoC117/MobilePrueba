import React from 'react'
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { Button, Chip, DefaultTheme } from 'react-native-paper'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'

export default function ListOrders(props) {

    const {orders} = props

    const navigation = useNavigation()

    const theme = {
        ...DefaultTheme,
        roundness: 15,
        colors:{
          ...DefaultTheme.colors,
          primary:"red",
          accent:"#FF6060",
        }
      }

    const returnChip = (name) =>{
        const chips = {
            Entregado: (<Chip 
                            style={[styles.chipStyle,styles.entregado]} 
                            textStyle={styles.chipText}
                        >
                            <AwesomeIcon name="check"  style={{fontSize:18}}/>
                            {`\t Entregado`}
                        </Chip>),
            "En camino": (<Chip 
                                style={[styles.chipStyle, styles.coming]} 
                                textStyle={styles.chipText}
                            >
                            <AwesomeIcon name="truck"  style={{fontSize:18}}/>
                            {`\t En camino`}
                        </Chip>),
            Cancelado: (<Chip 
                            style={[styles.chipStyle, styles.cancelado]} 
                            textStyle={styles.chipText}
                        >
                            <AwesomeIcon name="times"  style={{fontSize:18}}/>
                            {`\t Cancelado`}
                        </Chip>)
        }

        return chips[name]
    }

    const canCancel = (orderDate, status) =>{

        let reg = new RegExp('en camino', 'i')

        if(!reg.test(status)) return false 

        let now = new Date()
        let difference = (now - orderDate)/1000/60

        if(difference < 5) return true

        return false
    }

    return (
        <View>
            {
                orders.map(order =>(
                    <TouchableWithoutFeedback key={order.id} onPress={()=>navigation.push('order-detail',{products: order.products, address: order.address, total: order.total})}>
                        <View style={styles.orderCard}>
                            <View style={{flexDirection:"row", justifyContent:"flex-end"}}>
                            {
                                returnChip(order.status)
                            }
                            </View>
                            <Text style={styles.clavePedido}>Clave de pedido: <Text style={{fontWeight:"bold"}}>{order.id}</Text></Text>
                            <Text style={styles.texto}>Fecha: {`${new Date(order.date).toLocaleDateString()} - ${new Date(order.date).toLocaleTimeString()}`}</Text>
                            {/* <Text style={styles.texto}>N° de articulos: X</Text> */}
                            <Text style={styles.total}>
                                Total: <Text style={{color:"green"}}>${order.total}</Text> 
                            </Text>
                            {
                                canCancel(new Date(order.date), order.status) && (
                                    <Button
                                        mode="outlined"
                                        style={styles.cancelButton}
                                        theme={theme}
                                        onPress={()=>console.log("ok")}
                                    >
                                        Cancelar
                                    </Button>
                                )
                            }
                        </View>
                    </TouchableWithoutFeedback>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    orderCard:{
        borderBottomWidth:1,
        padding:15,
        borderColor:"#E0E0E0",
    },
    texto:{
        fontSize:17,
        marginBottom:10
    },
    chipText:{
        color:"white", 
        fontWeight:"bold"
    },
    chipStyle:{
        marginBottom:5,
        width:"40%"
    },
    entregado:{
        backgroundColor:"green",
    },
    coming:{
        backgroundColor:"blue",
    },
    cancelado:{
        backgroundColor:"red",
    },
    clavePedido:{
        fontSize:15,
        marginBottom:10
    },
    total:{
        fontWeight:"bold",
        fontSize:20
    },
    cancelButton:{
        borderColor:"red",
        marginTop:10
    }
})

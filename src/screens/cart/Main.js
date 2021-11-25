import React,{useState, useEffect, useCallback} from 'react'
import { ScrollView, View, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/core'
import CartList from '../../components/Cart/CartList'
import EmptyList from '../../components/EmptyList'
import Basket from '../../../assets/images/basket.png'
import {getProductsFromServer, getTotal} from '../../api/cart'
import { useFocusEffect } from '@react-navigation/core'
import TransparentScreenLoading from '../../components/TransparentScreenLoading'
import { Button, Title } from 'react-native-paper'
import { formsStyles } from '../../styles'
import useAuth from '../../hooks/useAuth'

export default function Main() {

    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)
    const [total, setTotal] = useState(0)

    const navigation = useNavigation()
    const {auth} = useAuth()

    useFocusEffect(
        useCallback(()=>{
            (async()=>{
                setLoading(true)
                const productos = await getProductsFromServer()
                setProducts(productos)
                const total_result = await getTotal()
                setTotal(total_result)
                setLoading(false)
            })()
        },[reload])
    )

    const comprar = () =>{
        if(auth)
            navigation.push('select-address')
        else
            navigation.navigate('account')
    }

    if(loading && !products){
        return (<TransparentScreenLoading text="Cargando carrito" />)
    }

    const reloadCart = () => setReload(!reload)
    const updateTotal = (precio) => setTotal(total+precio)

    return (
        <>
        {
            products && (
                products.length === 0 ? (
                    <EmptyList
                            title="Tu cesta esta vacia"
                            message="Busca algunos productos y añadelos a la cesta"
                            imagen={Basket}
                    />
                ):(
                    
                    loading ? (
                        <TransparentScreenLoading text="Actualizando carrito"/>
                    ):(
                        <>
                            <ScrollView style={{ backgroundColor:"white"}}>
                                <CartList 
                                    productos={products}
                                    reloadCart={reloadCart}
                                    updateTotal={updateTotal}
                                />
                            </ScrollView>
                            <View style={ styles.btnComprar}>
                                <Title>Total: ${total.toFixed(2)}</Title>
                                <Button
                                    mode="contained"
                                    style={formsStyles.btnDefault}
                                    onPress={comprar}
                                >
                                    comprar
                                </Button>
                            </View>
                        </>
                    )
                )           
            )
        }
        </>
    )
}

const styles = StyleSheet.create({
    btnComprar:{
        padding:10,
        borderTopStartRadius: 15,
        borderTopEndRadius:15,
        borderColor:"#C4C4C4",
        borderWidth:1,
        backgroundColor:"white"
    }
})

import React,{useState, useEffect, useCallback} from 'react'
import { ScrollView, View, StyleSheet} from 'react-native'
import CartList from '../../components/Cart/CartList'
import EmptyList from '../../components/EmptyList'
import Basket from '../../../assets/images/basket.png'
import {getProductsFromServer} from '../../api/cart'
import { useFocusEffect } from '@react-navigation/core'
import TransparentScreenLoading from '../../components/TransparentScreenLoading'
import { Button, Surface } from 'react-native-paper'
import { formsStyles } from '../../styles'


export default function Main() {

    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)

    useFocusEffect(
        useCallback(()=>{
            (async()=>{
                setLoading(true)
                const productos = await getProductsFromServer()
                setProducts(productos)
                setLoading(false)
                console.log("CARGANDO CARRITO")
            })()
        },[reload])
    )

    if(loading && !products){
        return (<TransparentScreenLoading text="Cargando carrito" />)
    }

    const reloadCart = () => setReload(!reload)

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
                                />
                            </ScrollView>
                            <Surface style={ styles.btnComprar}>
                                <Button
                                    mode="contained"
                                    style={formsStyles.btnDefault}
                                >
                                    comprar
                                </Button>
                            </Surface>
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
        elevation: 150,
        borderTopStartRadius: 15,
        borderTopEndRadius:15,
        elevation: 70
    }
})

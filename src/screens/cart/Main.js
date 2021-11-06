import React from 'react'
import { ScrollView } from 'react-native'
import CartList from '../../components/Cart/CartList'
import EmptyList from '../../components/EmptyList'
import Basket from '../../../assets/images/basket.png'


export default function Main() {
    return (
        <>
            <ScrollView>
                <CartList/> 
                
            </ScrollView>
            {/* <EmptyList
                    title="Tu cesta esta vacia"
                    message="Busca algunos productos y añadelos a la cesta"
                    imagen={Basket}
            /> */}
        </>
    )
}

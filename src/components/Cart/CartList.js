import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import { formsStyles } from '../../styles'
import CartItem from './CartItem'

export default function CartList({productos, reloadCart, updateTotal}) {
    return (
        <>
        {
            productos.map((item, index) =>(
                <CartItem key={index} producto={item.data. result} reloadCart={reloadCart} updateTotal={updateTotal}/>
            ))
        }
        {/* <View style={{padding:10}}>
            <Button
                mode="contained"
                style={formsStyles.btnDefault}
            >
                comprar
            </Button>
        </View> */}
        </>
    )
}

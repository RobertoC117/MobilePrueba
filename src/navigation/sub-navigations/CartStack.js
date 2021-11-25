import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AwesomeIcons from 'react-native-vector-icons/FontAwesome'

import Main from '../../screens/cart/Main'
import DetailProduct from '../../screens/DetailProduct'
import SelectAddress from '../../screens/cart/SelectAddress'

const Stack = createStackNavigator()

const options = {
    headerShown: true, 
    headerStyle:{backgroundColor:"#103F6E"}, 
    headerTintColor:"white",
    headerTitleAlign:"center",
    headerBackImage: ()=> <AwesomeIcons name={"chevron-left"} style={{fontSize:20, color:"white"}} />
}

export default function CartStack() {
    return (
        <Stack.Navigator screenOptions={options} initialRouteName="main-cart" >
            <Stack.Screen name="main-cart" component={Main} options={{headerLeft: null, title:"Carrito"}} />
            <Stack.Screen name="detail" component={DetailProduct} options={{title:"Detalles del producto"}} />
            <Stack.Screen name="select-address" component={SelectAddress} options={{title:"Selecciona la direccion"}} />
        </Stack.Navigator>
    )
}

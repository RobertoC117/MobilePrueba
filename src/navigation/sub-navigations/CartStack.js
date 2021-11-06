import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Main from '../../screens/cart/Main'

const Stack = createStackNavigator()

const options = {
    headerShown: true, 
    headerStyle:{backgroundColor:"#103F6E"}, 
    headerTintColor:"white",
    headerTitleAlign:"center",
}

export default function CartStack() {
    return (
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen name="main-cart" component={Main} options={{headerLeft: null, title:"Carrito"}} />
        </Stack.Navigator>
    )
}

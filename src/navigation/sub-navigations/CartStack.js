import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Main from '../../screens/cart/Main'

const Stack = createStackNavigator()

export default function CartStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="main-cart" component={Main} />
        </Stack.Navigator>
    )
}

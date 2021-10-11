import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Main from '../../screens/home/Main'


const Stack = createStackNavigator()

export default function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="main-home" component={Main} />
        </Stack.Navigator>
    )
}

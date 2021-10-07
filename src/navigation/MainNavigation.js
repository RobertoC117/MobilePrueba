import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'
import { useTheme } from 'react-native-paper';
import AuthScreen from '../screens/Auth'
import AppNavigation from './AppNavigation'
import useAuth from '../hooks/useAuth'

const Stack = createNativeStackNavigator()

export default function MainNavigation() {
    const theme = useTheme()
    const {auth} = useAuth()
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator>
                {
                    !auth && <Stack.Screen name="login" component={AuthScreen} options={{headerShown: false}}/>
                }
                <Stack.Screen name="app" component={AppNavigation} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
        
    )
}

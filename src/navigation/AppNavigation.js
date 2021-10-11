import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AwesomeIcons from 'react-native-vector-icons/FontAwesome'

import HomeStack from './sub-navigations/HomeStack';
import AccountStack from './sub-navigations/AccountStack';
import CartStack from './sub-navigations/CartStack';

const Tab = createMaterialBottomTabNavigator()

export default function AppNavigation() {
    return (
        <Tab.Navigator
            screenOptions={({route})=>({
                tabBarIcon:(routeStatus)=>setIcon(route, routeStatus),
            })}
            activeColor="#FF9E00"
        >
            <Tab.Screen 
                name="home" 
                component={HomeStack} 
                options={{title:"Inicio"}}
            />
            <Tab.Screen 
                name="cart" 
                component={CartStack} 
                options={{title:"Carrito"}}
            />
            <Tab.Screen 
                name="account" 
                component={AccountStack} 
                options={{title:"Mi Cuenta"}}
            />
        </Tab.Navigator>
    )
}

const setIcon = (route, routeStatus) =>{

    let icons = {
        home: "home",
        cart: "shopping-cart",
        account: "user"
    }

    let iconName = icons[route.name]
    let color = routeStatus.focused ? "#FF9E00" : "#FFFFFF"

    return <AwesomeIcons name={iconName} style={{fontSize:20, color}} />
}



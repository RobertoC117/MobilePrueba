import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Main from '../screens/home/Main';

const Tab = createMaterialBottomTabNavigator()


export default function AppNavigation() {
    return (
            <Tab.Navigator>
                <Tab.Screen name="home" component={Main} />
            </Tab.Navigator>
    )
}



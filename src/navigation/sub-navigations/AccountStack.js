import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AwesomeIcons from 'react-native-vector-icons/FontAwesome'

import Main from '../../screens/account/Main'
import ManageInfo from '../../screens/account/ManageInfo'
import ManageAddresses from '../../screens/account/ManageAddresses'
import AddressForm from '../../screens/account/AddressForm'

const Stack = createStackNavigator()

export default function AccountStack() {

    const options = {
        headerShown: true, 
        headerStyle:{backgroundColor:"#103F6E"}, 
        headerTintColor:"white",
        headerTitleAlign:"center",
        headerBackImage: ()=> <AwesomeIcons name={"chevron-left"} style={{fontSize:20, color:"white"}} />
    }

    return (
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen name="main-account" component={Main} options={{title:"Cuenta", headerLeft: null}}/>
            <Stack.Screen name="info" component={ManageInfo} options={{title:"Editar perfil"}}/>
            <Stack.Screen name="addresses" component={ManageAddresses} options={{title:"Direcciones"}}/>
            <Stack.Screen name="address-form" component={AddressForm} options={{title:"Agregar direccion"}}/>
        </Stack.Navigator>
    )
}

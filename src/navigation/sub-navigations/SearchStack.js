import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AwesomeIcons from 'react-native-vector-icons/FontAwesome'
import { Searchbar } from 'react-native-paper'
import Main from '../../screens/search/Main'

const Stack = createStackNavigator()

export default function SearchStack() {

    const options = {
        headerStyle:{backgroundColor:"#103F6E"}, 
        headerTintColor:"white",
        headerTitleAlign:"center",
        headerBackImage: ()=> <AwesomeIcons name={"chevron-left"} style={{fontSize:20, color:"white"}} />,
        headerTitle: ()=><Searchbar
            placeholder="Buscar"
            
            style={{width:350}}
        />
    }

    return (
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen component={Main} name="history" />
        </Stack.Navigator>
    )
}

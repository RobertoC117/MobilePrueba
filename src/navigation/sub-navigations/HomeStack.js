import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AwesomeIcons from 'react-native-vector-icons/FontAwesome'
import { Image } from 'react-native'

import Logo from '../../../assets/logoFarmaProntoSmWhite.png'
import Main from '../../screens/home/Main'
import CategoriesList from '../../screens/home/CategoriesList'
import DetailProduct from '../../screens/DetailProduct'
import BrandList from '../../screens/home/BrandList'

const Stack = createStackNavigator()

export default function HomeStack() {

    const options = {
        headerShown: true, 
        headerStyle:{backgroundColor:"#103F6E"}, 
        headerTintColor:"white",
        headerTitleAlign:"center",
        headerBackImage: ()=> <AwesomeIcons name={"chevron-left"} style={{fontSize:20, color:"white"}} />,
        headerTitle: ()=> <Image style={{
            width: 50,
            height:50,
            resizeMode: "contain",
        }}  source={Logo} />,
        
    }

    return (
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen name="main-home" component={Main} options={{headerLeft: null}} />
            <Stack.Screen name="categories" component={CategoriesList} options={{headerTitle:"Categorias"}} />
            <Stack.Screen name="brands" component={BrandList} options={{headerTitle:"Marcas"}} />
            <Stack.Screen name="detail" component={DetailProduct} options={{headerTitle:"Detalles del producto"}} />
        </Stack.Navigator>
    )
}

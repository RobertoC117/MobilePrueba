import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AwesomeIcons from 'react-native-vector-icons/FontAwesome'
import { Searchbar } from 'react-native-paper'
import { Image, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import Logo from '../../../assets/logoFarmaProntoSmWhite.png'
import Main from '../../screens/home/Main'
import MainSearch from '../../screens/search/Main'
import CategoriesList from '../../screens/home/CategoriesList'
import DetailProduct from '../../screens/DetailProduct'
import BrandList from '../../screens/home/BrandList'
import Header from '../../components/Header'
import Results from '../../screens/search/Results'

const Stack = createStackNavigator()

export default function HomeStack() {

    const navigation = useNavigation()

    const MainScreenSearchbar = () =>
        <Searchbar
            placeholder="Buscar"
            onFocus={()=>navigation.push("search")}
            style={{width:350, margin:-15}}
        />

    const FunctionalSearchbar = (props) =>
        <Header {...props}/>
        // <View style={{height:80, backgroundColor:"red", justifyContent:"center", alignItems:"center"}}>
        //     <SearchBar route={props}/>
        // </View>
    

    const options = {
        headerShown: true, 
        headerStyle:{backgroundColor:"#103F6E"}, 
        headerTintColor:"white",
        headerTitleAlign:"center",
        headerBackImage: ()=> <AwesomeIcons name={"chevron-left"} style={{fontSize:20, color:"white"}} />,
        header: ({ navigation, route, back })=> FunctionalSearchbar({ navigation, route, back }),
        // headerTitle: ()=> <Image style={{
        //     width: 50,
        //     height:50,
        //     resizeMode: "contain",
        // }}  source={Logo} />,
    }

    return (
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen name="search" component={Results} />
            <Stack.Screen name="main-home" component={Main} options={{headerLeft: null, headerTitle:()=> MainScreenSearchbar()}} />
            <Stack.Screen name="categories" component={CategoriesList} options={{headerTitle:"Categorias"}} />
            <Stack.Screen name="brands" component={BrandList} options={{headerTitle:"Marcas"}} />
            <Stack.Screen name="detail" component={DetailProduct} options={{headerTitle:"Detalles del producto"}} />
            <Stack.Screen name="history" component={MainSearch} />
        </Stack.Navigator>
    )
}

import React,{useState} from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper';

import Logo from "../../assets/logoFarmaProntoSm.png";
import {Login, Register} from '../components/Auth'
import {layoutStyles, formsStyles} from '../styles'
import TransparentScreenLoading from '../components/TransparentScreenLoading';

export default function Auth(props) {
    const {navigation} = props
    const [showLogin, setShowLogin] = useState(true)
    const [loading, setLoading] = useState(false)
    const changeView = () => setShowLogin(!showLogin)

    return (
        <>
        {
            loading && <TransparentScreenLoading text="Iniciando Sesión..."/>
        }
        <View style={layoutStyles.container}>
            <Image style={styles.logo}  source={Logo} />
            {
                showLogin ? (<Login changeForm={changeView} setLoading={setLoading} />) : (<Register changeForm={changeView} setLoading={setLoading} />)
            }
            <Button 
                mode="text" 
                style={formsStyles.btnDefault} 
                onPress={()=>navigation.push("app")}
            >
                Omitir
            </Button>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    logo:{
        width: "100%",
        height:130,
        resizeMode: "contain",
        marginBottom: 20,
    },
    containerBtn:{
        alignItems:"flex-end",
        backgroundColor:"red",

    },
    btnOmitir:{
        width:120,
        padding:2,
        fontSize:5
    }
})
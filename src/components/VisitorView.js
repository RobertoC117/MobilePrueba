import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Title, Subheading, Button } from 'react-native-paper'
import { layoutStyles } from '../styles'
import Icon from '../../assets/images/IdCard.png'

export default function VisitorView(props) {

    const {title, message, imagen, navigation} = props

    const goToLogin = () =>{
        navigation.push('login')
    }

    return (
        <View style={[layoutStyles.container, styles.container]}>
            <Image source={Icon} style={styles.img}/>
            <Title style={styles.title}>Opps! Aún no cuentas con un perfil de usuario</Title>
            <Subheading style={styles.text}>Inicia sesión o registrate para acceder a esta sección</Subheading>
            <Button
                mode="contained"
                style={styles.button}
                onPress={goToLogin}
            >
                Iniciar sesión
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center"
    },
    img:{
        width: "100%",
        height:180,
        resizeMode: "contain",
        marginBottom: 20,
    },
    title:{
        fontWeight:"bold",
        fontSize:22,
        textAlign:"center"
    },
    text:{
        textAlign:"center"
    },
    button:{
        padding:12,
        textAlign:"center",
        width:"60%",
        marginTop:20,
    }
})

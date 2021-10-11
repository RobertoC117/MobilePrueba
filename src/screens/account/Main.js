import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import { layoutStyles } from '../../styles'
import useAuth from '../../hooks/useAuth'

export default function Main(props) {

    const {auth, logout} = useAuth()
    const {navigation} = props

    return (
        <View style={layoutStyles.container}>
            <Text>ACCOUNT</Text>
            {
                !auth ? (
                    <Button
                        mode="contained"
                        onPress={()=> navigation.push("login")}
                    >
                        Iniciar sesión
                    </Button>
                ):(
                    <Button
                        mode="contained"
                        onPress={async()=>{
                            await logout()
                            navigation.push("login")
                        }}
                    >
                        Cerrar sesión
                    </Button>
                )
            }
            
            
        </View>
    )
}

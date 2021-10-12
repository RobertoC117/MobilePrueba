import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Avatar, Button, Title, Caption, List} from 'react-native-paper'
import { layoutStyles } from '../../styles'
import useAuth from '../../hooks/useAuth'
import VisitorView from '../../components/VisitorView'

export default function Main(props) {

    const {auth, logout} = useAuth()
    const {navigation} = props

    const singOut = () =>{

    }

    if(!auth){
        return (
            <VisitorView navigation={navigation}/>
        )
    }

    return (
        <ScrollView style={{backgroundColor:"white"}}>
            <View style={styles.container}>
                <Avatar.Icon size={100} icon="account-circle" style={{backgroundColor:"white", padding:0}}/>
                <View style={styles.containerInfo}>
                    <Title style={styles.title}>Roberto Carlos Sánchez Hernández</Title>
                    <Caption style={styles.caption}>20181133@uthh.edu.mx</Caption>
                    <Caption style={styles.caption}>+52 7711401696</Caption>
                </View>
            </View>
            <List.Section>
                <List.Subheader>Mi cuenta</List.Subheader>
                <List.Item
                    title="Mi informacion"
                    description="Ver y editar mi informacion"
                    left={(props)=> <List.Icon {...props}  icon="face" />}
                    onPress={()=>console.log("hola")}
                />
                <List.Item
                    title="Mis pedidos"
                    description="Se muestran los pedidos realizados"
                    left={(props)=> <List.Icon {...props}  icon="package-variant-closed" />}
                    onPress={()=>console.log("hola")}
                />
                <List.Item
                    title="Administrar direcciones"
                    description="Se muestran las direcciones de envio"
                    left={(props)=> <List.Icon {...props}  icon="map-marker-outline" />}
                    onPress={()=>console.log("hola")}
                />
                <List.Item
                    title="Metodos de pago"
                    description="Administra tus metodos de pago"
                    left={(props)=> <List.Icon {...props}  icon="wallet-outline" />}
                    onPress={()=>console.log("hola")}
                />                
                <List.Item
                    title="Cambio de contraseña"
                    description="Solicita cambio de contraseña"
                    left={(props)=> <List.Icon {...props}  icon="lock-outline" />}
                    onPress={()=>console.log("hola")}
                />
                <List.Item
                    title="Favoritos"
                    description="Ver mis productos favoritos"
                    left={(props)=> <List.Icon {...props}  icon="star-outline" />}
                    onPress={()=>console.log("hola")}
                />
                <List.Accordion
                    title="Ayuda"
                    description="Terminos, preguntas y mas"
                    style={{backgroundColor:"white"}}
                    left={(props)=> <List.Icon {...props}  icon="information-outline" />}
                >
                    <List.Item title="Preguntas frecuentes" left={(props)=> <List.Icon {...props}  icon="help-circle-outline" />}/>
                    <List.Item title="Terminos y condiciones" left={(props)=> <List.Icon {...props}  icon="file-document-outline" />}/>
                </List.Accordion>
                <List.Item
                    title="Cerrar sesion"
                    description="Finaliza la sesión actual"
                    left={(props)=> <List.Icon {...props}  icon="logout" />}
                    onPress={()=>console.log("hola")}
                />
            </List.Section>
            {/* {
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
            } */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        padding:20,
        width:"100%",
        // backgroundColor:"red"
    },
    containerInfo:{
        padding:5,
        maxWidth:"75%",
    },
    title:{
        fontSize:20,
    },
    caption:{
        fontSize:14,
        margin:0,
        padding:0
    }
})

import React,{useState ,useCallback} from 'react'
import { View, StyleSheet, ScrollView, Alert, ToastAndroid} from 'react-native'
import { Avatar, Title, Caption, List} from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'

import useAuth from '../../hooks/useAuth'
import VisitorView from '../../components/VisitorView'
import TransparentScreenLoading from '../../components/TransparentScreenLoading'
import { getUserData } from '../../api/user'

export default function Main(props) {

    const {auth, logout} = useAuth()
    const {navigation} = props

    const [user, setUser] = useState(null)

    useFocusEffect(
        useCallback(()=>{
            (async()=>{
                try {
                    if(auth){
                        const {status, data} = await getUserData(auth.token)
                        if(status === 401){
                            logout()
                            throw new Error("La sesion expiró")
                        }
                        setUser(data)
                        console.log("Account/Main.js",data)
                    }
                } catch (error) {
                    ToastAndroid.showWithGravity(error.message, ToastAndroid.LONG, ToastAndroid.CENTER)
                }
                
            })()
        }, [])
    )

    const singOut = () =>{
        Alert.alert(
            "Cerrar sesión",
            "¿Esta seguro que desea cerrar la sesión?",
            [
                {
                    text:"Si",
                    onPress:async()=>{
                        await logout()
                        navigation.push("login")
                    }
                },
                {
                    text:"No"
                }
            ],
            {cancelable: false}
        )
    }

    if(!auth){
        return (
            <VisitorView navigation={navigation}/>
        )
    }

    return (
        <>
        <ScrollView style={{backgroundColor:"white"}}>
            {
                user && (
                    <View style={styles.container}>
                        <Avatar.Icon size={80} icon="account-circle" style={{backgroundColor:"white", padding:0}}/>
                        <View style={styles.containerInfo}>
                            <Title style={styles.title}>{`${user.name} ${user.last_name}`}</Title>
                            <Caption style={styles.caption}>{`${user.email}`}</Caption>
                            {
                                user.phone && <Caption style={styles.caption}>{`${user.phone}`}</Caption>
                            }
                        </View>
                    </View>
                ) 
            }
            <List.Section>
                <List.Subheader>Mi cuenta</List.Subheader>
                <List.Item
                    title="Mi informacion"
                    description="Ver y editar mi informacion"
                    left={(props)=> <List.Icon {...props}  icon="face" />}
                    onPress={()=>navigation.push('info',{userInfo: user})}
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
                    onPress={()=>navigation.push('addresses')}
                />
                <List.Item
                    title="Metodos de pago"
                    description="Administra tus metodos de pago"
                    left={(props)=> <List.Icon {...props}  icon="wallet-outline" />}
                    onPress={()=>console.log("hola")}
                />   
                <List.Item
                    title="Favoritos"
                    description="Ver mis productos favoritos"
                    left={(props)=> <List.Icon {...props}  icon="star-outline" />}
                    onPress={()=>console.log("hola")}
                />  
                <List.AccordionGroup>
                    
                    <List.Accordion
                        id="1"
                        title="Seguridad"
                        style={{backgroundColor:"white"}}
                        left={(props)=> <List.Icon {...props}  icon="lock-outline" />}
                    >
                        <List.Item title="Cambiar contraseña" left={(props)=> <List.Icon {...props}  icon="key" />}/>
                        <List.Item title="Configurar pregunta secreta" left={(props)=> <List.Icon {...props}  icon="head-question-outline" />}/>
                    </List.Accordion>  

                    <List.Accordion
                        id="2"
                        title="Ayuda"
                        style={{backgroundColor:"white"}}
                        left={(props)=> <List.Icon {...props}  icon="information-outline" />}
                    >
                        <List.Item title="Preguntas frecuentes" left={(props)=> <List.Icon {...props}  icon="help-circle-outline" />}/>
                        <List.Item title="Terminos y condiciones" left={(props)=> <List.Icon {...props}  icon="file-document-outline" />}/>
                    </List.Accordion>

                </List.AccordionGroup>           
                <List.Item
                    title="Cerrar sesion"
                    description="Finaliza la sesión actual"
                    left={(props)=> <List.Icon {...props}  icon="logout" />}
                    onPress={singOut}
                />
            </List.Section>
        </ScrollView>
        {
            !user && <TransparentScreenLoading text="Cargando datos del usuario ..."/>
        }
        </>
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

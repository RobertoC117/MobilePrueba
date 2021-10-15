import React,{useState} from 'react'
import { View, ToastAndroid, Keyboard } from 'react-native'
import { useFormik } from 'formik'
import {TextInput, Button, HelperText} from 'react-native-paper'
import * as Yup from 'yup'
import * as Google from 'expo-google-app-auth';
import { useNavigation } from '@react-navigation/native'

import { hasErrorOn } from '../../utils/functions'
import { formsStyles } from '../../styles'
import {farmaLogin, googleLogin} from '../../api/auth'
import { androidClientId, } from '../../utils/constants'
import TransparentScreenLoading from '../TransparentScreenLoading'
import useAuth from '../../hooks/useAuth'

export default function Login(props) {

    const {changeForm, setLoading} = props
    const navigation = useNavigation()

    const {login} = useAuth()

    const handleGoogleSignIn = async() =>{
        try {
            setLoading(true)
            const config = {
                androidClientId,
                scopes: ['profile', 'email']
            }
            const { type, accessToken, user, idToken} = await Google.logInAsync(config)

            if(type === "success"){

                const {status, data} = await googleLogin(idToken)

                if(status === 401){
                    ToastAndroid.showWithGravity(data.errors[0].msg, ToastAndroid.LONG, ToastAndroid.CENTER)
                    await Google.logOutAsync({accessToken, androidClientId})
                    setLoading(false)
                    return
                }

                if(status !== 200) throw new Error(data.errors[0].msg)
                login({...data, accessToken})
                navigation.push("app")

            }else{
                setLoading(false)
                ToastAndroid.showWithGravity("Se canceló el inicio de sesión", ToastAndroid.LONG, ToastAndroid.CENTER)
            }
            
        } catch (error) {
            ToastAndroid.showWithGravity("Oops! Algo salió mal...", ToastAndroid.LONG, ToastAndroid.CENTER)
            setLoading(false)
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(schemaValidation()),
        onSubmit: async(formData)=>{
            setLoading(true)
            try {
                Keyboard.dismiss()
                const {status, data} = await farmaLogin(formData)
                if(status !== 200) throw new Error(data.errors[0].msg)
                login(data)
                navigation.push("app")
            } catch (error) {
                ToastAndroid.showWithGravity(error.message, ToastAndroid.SHORT, ToastAndroid.CENTER)
                setLoading(false)
            }
            
        }
    })

    return (
        <View>
            <View>
                <TextInput
                    mode="outlined"
                    label="Email"
                    placeholder="Ingresa tu email"
                    style={formsStyles.textInput}
                    onChangeText={(value) => formik.setFieldValue('email', value)}
                    value={formik.values.email}
                    error={hasErrorOn(formik, 'email')}
                />
                <HelperText type="error" visible={hasErrorOn(formik, 'email')}>
                    {formik.errors.email}
                </HelperText>
            </View>
            
            <View>
                <TextInput
                    mode="outlined"
                    label="Contraseña"
                    placeholder="Ingresa tu contraseña"
                    style={formsStyles.textInput}
                    onChangeText={(value) => formik.setFieldValue('password', value)}
                    value={formik.values.password}
                    error={hasErrorOn(formik, 'password')}
                />
                <HelperText type="error" visible={hasErrorOn(formik, 'password')}>
                    {formik.errors.password}
                </HelperText>
            </View>
            
            <Button
                mode="contained"
                style={formsStyles.btnDefault}
                onPress={formik.handleSubmit}
            >
                Iniciar Sesion
            </Button>

            <Button
                mode="outlined"
                style={[formsStyles.btnDefault, formsStyles.btnOutlined]}
                icon="google"
                onPress={handleGoogleSignIn}
            >
                Continuar con Google
            </Button>
            

            <Button
                mode="outlined"
                style={[formsStyles.btnDefault, formsStyles.btnOutlined]}
                icon="emoticon-cry-outline"
                onPress={changeForm}
            >
                Aun no tengo cuenta
            </Button>
        </View>
    )
}

const initialValues = () =>{
    return {
        email: "",
        password: ""
    }
}

const schemaValidation = () =>{
    return {
        email: Yup.string().required("El email es requerido"),
        password: Yup.string().required("La contraseña es requerida"),
    }
}

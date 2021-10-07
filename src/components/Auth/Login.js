import React from 'react'
import { View } from 'react-native'
import { useFormik } from 'formik'
import {TextInput, Button, HelperText} from 'react-native-paper'
import * as Yup from 'yup'

import { hasErrorOn } from '../../utils/functions'
import { formsStyles } from '../../styles'

export default function Login(props) {

    const {changeForm, navigation} = props

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(schemaValidation()),
        onSubmit: async(formData)=>{
            console.log(formData)
            navigation.push("app")
        }
    })

    // console.log("Errores", formik.errors)
    // console.log("Tocados",formik.touched)

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

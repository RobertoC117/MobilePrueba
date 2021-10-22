import React,{useState} from 'react'
import { View, Text, ToastAndroid } from 'react-native'
import { Button, HelperText, TextInput } from 'react-native-paper'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { formsStyles, layoutStyles } from '../../styles'
import {hasErrorOn} from '../../utils/functions'
import { updatePassword } from '../../api/user'
import useAuth from '../../hooks/useAuth'

export default function ChangePassword(props) {

    const {navigation} = props
    const {auth} = useAuth()
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues,
        validationSchema:Yup.object(validationSchema()),
        onSubmit: async(formData) => {
            setLoading(true)
            try {
                const {status, data} = await updatePassword(formData, auth.token)
                if(status !== 200) throw new Error(data.errors[0].msg)
                ToastAndroid.showWithGravity("Contraseña actualizada", ToastAndroid.LONG, ToastAndroid.CENTER)
                navigation.goBack()
            } catch (error) {
                setLoading(false)
                ToastAndroid.showWithGravity(error.message, ToastAndroid.LONG, ToastAndroid.CENTER)
            }
        }
    })

    return (
        <View style={[layoutStyles.container, {justifyContent:"flex-start"}]}>
            <View>
                <TextInput
                    mode="outlined"
                    label="Contraseña actual"
                    style={formsStyles.textInput}
                    value={formik.values.password}
                    onChangeText={(value) => formik.setFieldValue('password', value)}
                    error={hasErrorOn(formik, 'password')}
                    disabled={loading}
                    secureTextEntry
                />  
                <HelperText type="error" visible={hasErrorOn(formik, 'password')}>
                    {formik.errors.password}
                </HelperText>
            </View>
            <View>
                <TextInput
                    mode="outlined"
                    label="Nueva contraseña"
                    style={formsStyles.textInput}
                    value={formik.values.new_password}
                    onChangeText={(value) => formik.setFieldValue('new_password', value)}
                    error={hasErrorOn(formik, 'new_password')}
                    disabled={loading}
                    secureTextEntry
                />
                <HelperText type="error" visible={hasErrorOn(formik, 'new_password')}>
                    {formik.errors.new_password}
                </HelperText>
            </View>
            <View>
                <TextInput
                    mode="outlined"
                    label="Confirmar nueva contraseña"
                    style={formsStyles.textInput}
                    value={formik.values.new_password2}
                    onChangeText={(value) => formik.setFieldValue('new_password2', value)}
                    error={hasErrorOn(formik, 'new_password2')}
                    disabled={loading}
                    secureTextEntry
                />
                <HelperText type="error" visible={hasErrorOn(formik, 'new_password2')}>
                    {formik.errors.new_password2}
                </HelperText>
            </View>
            <Button
                mode="contained"
                style={formsStyles.btnDefault}
                onPress={formik.handleSubmit}
                disabled={loading}
            >
                Guardar cambios
            </Button>
        </View>
    )
}

const initialValues = () =>{
    return {
        password: "",
        new_password: "",
        new_password2: ""
    }
}
const validationSchema = () =>{
    const regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,20}$/)
    return {
        password: Yup.string().matches(regexPassword, "Contraseña incorrecta").required("La contraseña actual es requerida"),
        new_password: Yup.string().matches(regexPassword, "Debe tener una longitud 8-20 tener caracteres especiales, A-Z, a-z y 0-9").required("La nueva contraseña es requerida"),
        new_password2: Yup.string().oneOf([Yup.ref("new_password")], "Las contraseñas no coinciden").required("La confirmacion de la nueva contraseña es requerida")
    }
}

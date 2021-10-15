import React from 'react'
import { View, ToastAndroid, Keyboard } from 'react-native'
import {TextInput, Button, HelperText} from 'react-native-paper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'

import { formsStyles } from '../../styles'
import { hasErrorOn } from '../../utils/functions'
import { register } from '../../api/auth'
import useAuth from '../../hooks/useAuth'

export default function Register(props) {

    const {changeForm, setLoading} = props
    const navigation = useNavigation()
    const {login} = useAuth()

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(schemaValidation()),
        onSubmit: async(formData)=>{
            setLoading(true)
            try {
                Keyboard.dismiss()
                const {status, data} = await register(formData)
                if(status !== 200) throw new Error(data.errors[0].msg)
                login(data)
                navigation.push("app")
            } catch (error) {
                ToastAndroid.showWithGravity(error.message, ToastAndroid.LONG, ToastAndroid.CENTER)
                setLoading(false)
            }
        }
    })

    return (
        <View>
            <View style={formsStyles.pairContainer}>
                <View style={formsStyles.smallinput}>
                    <TextInput
                        mode="outlined"
                        label="Nombre"
                        placeholder="Nombre"
                        style={formsStyles.textInput}
                        onChangeText={(value) => formik.setFieldValue('nombre', value)}
                        value={formik.values.nombre}
                        error={hasErrorOn(formik, 'nombre')}
                    />
                    <HelperText type="error" visible={hasErrorOn(formik, 'nombre')}>
                        {formik.errors.nombre}
                    </HelperText>
                </View>

                <View style={formsStyles.smallinput}>
                    <TextInput
                        mode="outlined"
                        label="Apellidos"
                        placeholder="Apellidos"
                        style={formsStyles.textInput}
                        onChangeText={(value) => formik.setFieldValue('last_name', value)}
                        value={formik.values.last_name}
                        error={hasErrorOn(formik, 'last_name')}
                    />
                    <HelperText type="error" visible={hasErrorOn(formik, 'last_name')}>
                        {formik.errors.last_name}
                    </HelperText>
                </View>
            </View>

            <View>
                <TextInput
                    mode="outlined"
                    label="Email"
                    placeholder="Email"
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
                    label="Telefono"
                    placeholder="Telefono"
                    style={formsStyles.textInput}
                    onChangeText={(value) => formik.setFieldValue('phone', value)}
                    value={formik.values.phone}
                    error={hasErrorOn(formik, 'phone')}
                />
                <HelperText type="error" visible={hasErrorOn(formik, 'phone')}>
                        {formik.errors.phone}
                    </HelperText>
            </View>

            <View>
                <TextInput
                    mode="outlined"
                    label="Contraseña"
                    placeholder="Contraseña"
                    style={formsStyles.textInput}
                    onChangeText={(value) => formik.setFieldValue('password', value)}
                    value={formik.values.password}
                    error={hasErrorOn(formik, 'password')}
                    secureTextEntry
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
                Registrarme
            </Button>

            <Button
                mode="outlined"
                icon="emoticon-excited-outline"
                style={[formsStyles.btnDefault, formsStyles.btnOutlined]}
                onPress={changeForm}
            >
                Ya tengo una cuenta
            </Button>
        </View>
    )
}

const initialValues = () =>{
    return {
        nombre: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        gender: "male"
    }
}

const schemaValidation = () =>{
    const regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,20}$/)
    const regexPhone = new RegExp(/^[+]*[(]?[0-9\s\.]{1,4}[)]?[0-9-\s\.]{10}$/)
    return {
        nombre: Yup.string().min(3, "Nombre muy corto").max(30, "Nombre demasiado largo").required("El nombre es requerido"),
        last_name: Yup.string().min(3, "Apellido muy corto").max(30, "Apellido demasiado largo").required("El apellido es requerido"),
        email: Yup.string().email("No es un email valido").required("El email es requerido"),
        password: Yup.string().matches(regexPassword, "La contraseña debe contener al menos un caracter especial, un numero y una mayuscula"),
        phone: Yup.string().matches(regexPhone ,"Este no es un numero de telefono valido"),
    }
}

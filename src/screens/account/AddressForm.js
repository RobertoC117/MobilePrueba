import React, { useState, useEffect } from 'react'
import { View, ToastAndroid, Keyboard } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, TextInput, HelperText } from 'react-native-paper'
import { layoutStyles, formsStyles } from '../../styles'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function AddressForm(props) {

    const {navigation, route:{params}} = props

    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        (async()=>{
            if(params?.idAddress){
                navigation.setOptions({title: "Datos de la direccion"})
                setEditMode(true)
            }
        })()
    }, [])

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async(formData)=>{
            try {
                Keyboard.dismiss()
                console.log(formData)
            } catch (error) {
                ToastAndroid.showWithGravity(error.message, ToastAndroid.LONG, ToastAndroid.CENTER)
            }
        }
    })

    return (
        <KeyboardAwareScrollView extraHeight={20} style={{backgroundColor:layoutStyles.container.backgroundColor}}>
        <View style={layoutStyles.container}>
            <View>
                <TextInput
                    mode="outlined"
                    label="Titulo*"
                    style={formsStyles.textInput}
                    value={formik.values.title}
                    onChangeText={(value)=>formik.setFieldValue('title', value)}
                />
                <HelperText type="error">
                    Ayuda
                </HelperText>
            </View>
            <View>
                <TextInput
                    mode="outlined"
                    label="Colonia*"
                    style={formsStyles.textInput}
                    value={formik.values.colony}
                    onChangeText={(value)=>formik.setFieldValue('colony', value)}
                />
                <HelperText type="error">
                    Ayuda
                </HelperText>
            </View>
            <View>
                <TextInput
                    mode="outlined"
                    label="Calle*"
                    style={formsStyles.textInput}
                    value={formik.values.street}
                    onChangeText={(value)=>formik.setFieldValue('street', value)}
                />
                <HelperText type="error">
                    Ayuda
                </HelperText>
            </View>
            <View style={formsStyles.pairContainer}>
                <View style={formsStyles.smallinput}>
                    <TextInput
                        mode="outlined"
                        label="Numero interior"
                        style={formsStyles.textInput}
                        value={formik.values.num_int}
                        onChangeText={(value)=>formik.setFieldValue('num_int', value)}
                    />
                    <HelperText type="error">
                        Ayuda
                    </HelperText>
                </View>
                <View style={formsStyles.smallinput}>
                    <TextInput
                        mode="outlined"
                        label="Numero exterior"
                        style={formsStyles.textInput}
                        value={formik.values.num_ext}
                        onChangeText={(value)=>formik.setFieldValue('num_ext', value)}
                    />
                    <HelperText type="error">
                        Ayuda
                    </HelperText>
                </View>
            </View>
            <View>
                <TextInput
                    mode="outlined"
                    label="Referencia"
                    // style={formsStyles.textInput}
                    multiline={true}
                    numberOfLines={3}
                    value={formik.values.reference}
                    onChangeText={(value)=>formik.setFieldValue('reference', value)}
                />
                <HelperText type="error">
                    Ayuda
                </HelperText>
            </View>
            <Button
                mode="contained"
                style={formsStyles.btnDefault}
                onPress={formik.handleSubmit}
            >
                {editMode ? "Guardar cambios" : "Agregar"}
            </Button>
        </View>
        </KeyboardAwareScrollView>
    )
}

const initialValues = () =>{
    return  {
        title:"",
        colony:"",
        street:"",
        int_num:"",
        ext_num:"",
        reference:""
    }
}

const validationSchema = () =>{
    return  {
        title: Yup.string().min(3, "El titulo es muy corto").max(50, "El titulo es muy largo").required("El titulo de la direccion es requerido"),
        colony: Yup.string().min(3, "El nombre de la colonia es muy corto").max(50, "El nombre de la colonia es muy largo").required("El nombre de la colonia es requerido"),
        street: Yup.string().min(3, "El nombre de la calle es muy corto").max(50, "El nombre de la calle es muy largo").required("El nombre de la calle es requerido"),
        int_num: Yup.number().integer().min(1),
        ext_num: Yup.number().integer().min(1),
    }
}
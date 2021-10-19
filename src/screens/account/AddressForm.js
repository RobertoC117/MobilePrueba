import React, { useState, useEffect } from 'react'
import { View, ToastAndroid, Keyboard } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, TextInput, HelperText } from 'react-native-paper'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { layoutStyles, formsStyles } from '../../styles'
import { hasErrorOn } from '../../utils/functions'
import { addNewAddress, editAddress, getAddress } from '../../api/address'
import useAuth from '../../hooks/useAuth'
import TransparentScreenLoading from '../../components/TransparentScreenLoading'

export default function AddressForm(props) {

    const {navigation, route:{params}} = props

    const [editMode, setEditMode] = useState(false)
    const [loading, setLoading] = useState(false)

    const {auth} = useAuth()

    useEffect(() => {
        (async()=>{
            console.log("Hola useeffect")
            if(params?.address){
                setEditMode(true)
                setLoading(true)
                navigation.setOptions({title: "Datos de la direccion"})
                const {data} = await getAddress(params.address.id, auth.token)
                await formik.setFieldValue('id', data.result.id)
                await formik.setFieldValue('title', data.result.title)
                await formik.setFieldValue('colony', data.result.colony)
                await formik.setFieldValue('street', data.result.street)
                await formik.setFieldValue('int_num', data.result.int_num)
                await formik.setFieldValue('out_num', data.result.out_num)
                await formik.setFieldValue('reference', data.result.reference)
                setLoading(false)
            }
        })()
    }, [])

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async(formData)=>{
            setLoading(true)
            try {
                Keyboard.dismiss()
                if(editMode){
                    console.log(formData)
                    const {status, data} = await editAddress(formData, auth.token)
                    if(status !== 200) throw new Error(data.errors[0].message)
                }else{
                    const {status, data} = await addNewAddress(formData, auth.token)
                    if(status !== 200) throw new Error(data.errors[0].message)
                }
                navigation.goBack()
            } catch (error) {
                ToastAndroid.showWithGravity(error.message, ToastAndroid.LONG, ToastAndroid.CENTER)
                setLoading(false)
            }
        }
    })

    return (
        <>
        <KeyboardAwareScrollView extraHeight={20} style={{backgroundColor:layoutStyles.container.backgroundColor}}>
            <View style={layoutStyles.container}>
                <View>
                    <TextInput
                        mode="outlined"
                        label="Titulo*"
                        style={formsStyles.textInput}
                        value={formik.values.title}
                        onChangeText={(value)=>formik.setFieldValue('title', value)}
                        error={hasErrorOn(formik, 'title')}
                    />
                    <HelperText type="error" visible={hasErrorOn(formik, 'title')}>
                        {formik.errors.title}
                    </HelperText>
                </View>
                <View>
                    <TextInput
                        mode="outlined"
                        label="Colonia*"
                        style={formsStyles.textInput}
                        value={formik.values.colony}
                        onChangeText={(value)=>formik.setFieldValue('colony', value)}
                        error={hasErrorOn(formik, 'colony')}
                    />
                    <HelperText type="error" visible={hasErrorOn(formik, 'colony')}>
                        {formik.errors.colony}
                    </HelperText>
                </View>
                <View>
                    <TextInput
                        mode="outlined"
                        label="Calle*"
                        style={formsStyles.textInput}
                        value={formik.values.street}
                        onChangeText={(value)=>formik.setFieldValue('street', value)}
                        error={hasErrorOn(formik, 'street')}
                    />
                    <HelperText type="error" visible={hasErrorOn(formik, 'street')}>
                        {formik.errors.street}
                    </HelperText>
                </View>
                <View style={formsStyles.pairContainer}>
                    <View style={formsStyles.smallinput}>
                        <TextInput
                            mode="outlined"
                            label="Numero interior"
                            style={formsStyles.textInput}
                            value={formik.values.num_int}
                            onChangeText={(value)=>formik.setFieldValue('int_num', value)}
                            error={hasErrorOn(formik, 'int_num')}
                        />
                        <HelperText type="error" visible={hasErrorOn(formik, 'int_num')}>
                            Numero no valido
                        </HelperText>
                    </View>
                    <View style={formsStyles.smallinput}>
                        <TextInput
                            mode="outlined"
                            label="Numero exterior"
                            style={formsStyles.textInput}
                            value={formik.values.num_ext}
                            onChangeText={(value)=>formik.setFieldValue('out_num', value)}
                            error={hasErrorOn(formik, 'out_num')}
                        />
                        <HelperText type="error" visible={hasErrorOn(formik, 'out_num')}>
                            Numero no valido
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
        {
            loading && <TransparentScreenLoading text="Cargando datos..." />
        }
        </>
    )
}

const initialValues = () =>{
    return  {
        title:"",
        colony:"",
        street:"",
        int_num:"",
        out_num:"",
        reference:""
    }
}

const validationSchema = () =>{
    return  {
        title: Yup.string().min(3, "El titulo es muy corto").max(50, "El titulo es muy largo").required("El titulo de la direccion es requerido"),
        colony: Yup.string().min(3, "El nombre de la colonia es muy corto").max(50, "El nombre de la colonia es muy largo").required("El nombre de la colonia es requerido"),
        street: Yup.string().min(3, "El nombre de la calle es muy corto").max(50, "El nombre de la calle es muy largo").required("El nombre de la calle es requerido"),
        int_num: Yup.number().positive().integer().nullable(),
        out_num: Yup.number().positive().integer().nullable(),
    }
}
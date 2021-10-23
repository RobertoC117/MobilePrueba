import React,{useState} from 'react'
import { View, Text, ToastAndroid } from 'react-native'
import {Picker} from "@react-native-community/picker"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, HelperText, TextInput } from 'react-native-paper'

import useAuth from '../../hooks/useAuth'
import { formsStyles, layoutStyles } from '../../styles'
import { hasErrorOn } from '../../utils/functions'
import { updateInfo } from '../../api/user'

export default function ManageQuestion(props) {

    const {navigation, route:{params:{pregunta}}} = props

    const [loading, setLoading] = useState(false)

    const {auth} = useAuth()
    
    const formik = useFormik({
        initialValues:{
            question: pregunta || null,
            answer: "",
        },
        validationSchema: Yup.object({
            question: Yup.string().nullable().required("La pregunta es requerida"),
            answer: Yup.string().min(3, "La respuesta es muy corta").max(15,"La respuesta es muy larga").required("La respuesta es requerida"),
        }),
        onSubmit: async(formData)=>{
            setLoading(true)
            try {
                const {data, status} = await updateInfo(formData, auth.token)
                if(status !== 200) throw new Error(data.errors[0].msg)
                console.log(formData)
                navigation.goBack()
            } catch (error) {
                ToastAndroid.showWithGravity(error.message, ToastAndroid.LONG, ToastAndroid.CENTER)
                setLoading(false)
            }
        }
    })

    return (
        <View style={layoutStyles.container}>
            <View>
                <View style={formsStyles.inputPickerWrap}>
                    <Picker
                        selectedValue={formik.values.question}
                        style={formsStyles.textInput}
                        onValueChange={value => formik.setFieldValue("question", value)}
                        enabled={!loading}
                    >
                        <Picker.Item label="Selecciona una pregunta" value={null}/>
                        <Picker.Item label="¿Como se llama tu mascota?" value="¿Como se llama tu mascota?"/>
                        <Picker.Item label="¿Como se llama tu mamá?" value="¿Como se llama tu mamá?"/>
                        <Picker.Item label="¿Cual es tu color favorito?" value="¿Cual es tu color favorito?"/>
                    </Picker>
                </View>
                <HelperText type="error" visible={hasErrorOn(formik, 'question')}>
                    {formik.errors.question}       
                </HelperText>
            </View>
            <View>
                <TextInput
                    mode="outlined"
                    style={formsStyles.textInput}
                    label="Nueva respuesta"
                    error={hasErrorOn(formik, 'answer')}
                    onChangeText={value => formik.setFieldValue('answer', value)}
                    value={formik.values.answer}
                    disabled={loading}
                />
                <HelperText type="error" visible={hasErrorOn(formik, 'answer')}>
                    {formik.errors.answer}       
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

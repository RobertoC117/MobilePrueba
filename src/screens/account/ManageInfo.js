import React,{useState} from 'react'
import { View, Keyboard, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import { TextInput, Button, HelperText } from 'react-native-paper'
import {Picker} from "@react-native-community/picker"
import { useFormik } from 'formik'
import  * as Yup from 'yup'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from '@react-native-community/datetimepicker'

import { formsStyles, layoutStyles } from '../../styles'
import { updateInfo } from '../../api/user'
import { hasErrorOn } from '../../utils/functions'
import useAuth from '../../hooks/useAuth'

export default function ManageInfo(props) {

    const {navigation, route:{params}} = props
    const {userInfo} = params

    const [showCalendar, setShowCalendar] = useState(false)
    const [date, setDate] = useState(userInfo.birthday ? new Date(userInfo.birthday) : null)
    const [loadig, setLoadig] = useState(false)
    const {auth} = useAuth()

    const formik = useFormik({
        initialValues: initialValues(userInfo),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async(formData) =>{
            console.log(formData)
            Keyboard.dismiss()
            setLoadig(true)
            try {
                const {status, data} = await updateInfo(formData, auth.token)
                if(status !== 200) throw new Error(data.errors[0].msg)
                navigation.goBack()                
            } catch (error) {
                ToastAndroid.showWithGravity(error.message, ToastAndroid.LONG, ToastAndroid.CENTER)
                setLoadig(false)
            }
        }
    })

    const onChange = async(event, selectedDate) =>{
        setShowCalendar(false)
        if(selectedDate){
            console.log(selectedDate)
            let day = selectedDate.getDate() > 9 ? selectedDate.getDate() : '0'+selectedDate.getDate()
            let dateFormated = `${selectedDate.getFullYear()}/${selectedDate.getMonth()+1}/${day}`
            formik.setFieldValue("birthday", dateFormated)
            setDate(selectedDate)
        }
    }

    return (
        // <KeyboardAwareScrollView extraHeight={5} style={{backgroundColor: layoutStyles.container.backgroundColor}}>
            <View style={layoutStyles.container}>
                <KeyboardAvoidingView behavior="height">
                
                <View>
                    <TextInput
                        mode="outlined"
                        style={formsStyles.textInput}
                        label="Nombre"
                        value={formik.values.nombre}
                        onChangeText={(value)=>formik.setFieldValue("nombre", value)}
                        disabled={loadig}
                    />
                    <HelperText type="error" visible={false}>
                        
                    </HelperText>
                </View>
                <View>
                    <TextInput
                        mode="outlined"
                        style={formsStyles.textInput}
                        label="Apellidos"
                        value={formik.values.last_name}
                        onChangeText={(value)=>formik.setFieldValue("last_name", value)}
                        disabled={loadig}
                    />
                    <HelperText type="error" visible={false}>
                        
                    </HelperText>
                </View>
                <View>
                    <TextInput
                        mode="outlined"
                        style={formsStyles.textInput}
                        label="Telefono"
                        value={formik.values.phone}
                        onChangeText={(value)=>formik.setFieldValue("phone", value)}
                        disabled={loadig}
                        error={hasErrorOn(formik, 'phone')}
                    />
                    <HelperText type="error" visible={hasErrorOn(formik, 'phone')}>
                        {formik.errors.phone}
                    </HelperText>
                </View>
                <View>
                    <View style={formsStyles.inputPickerWrap}>
                        <Picker style={formsStyles.textInput}
                            selectedValue={formik.values.gender}
                            onValueChange={(value)=>formik.setFieldValue("gender", value)}
                            enabled={userInfo.gender || loadig ? false : true}
                        >
                            <Picker.Item label="Especificar género" value={null} color="#7F7F7F" enabled={false}/>
                            <Picker.Item label="Hombre" value="male"/>
                            <Picker.Item label="Mujer" value="female"/>
                        </Picker>
                    </View>
                    <HelperText type="error" visible={false}>
                        
                    </HelperText>
                </View>
                <View style={formsStyles.pairContainer}>
                    <View style={formsStyles.smallinput}>
                        <TextInput
                        mode="outlined"
                        style={formsStyles.textInput}
                        label="Fecha de Nacimiento"
                        value={date ? date.toLocaleDateString() : ""}
                        disabled={true}
                        />
                        <HelperText type="error" visible={false}>
                            
                        </HelperText>
                    </View>
                    <View style={formsStyles.smallinput}>
                        <Button
                            mode="contained"
                            style={formsStyles.btnDefault}
                            onPress={() => setShowCalendar(true)}
                            disabled={userInfo.birthday || loadig ? true : false}
                        >
                            Establecer
                        </Button>
                    </View>
                </View>
                
                {
                    showCalendar && (
                        <DateTimePicker
                            mode="date"
                            value={new Date()}
                            onChange={onChange}
                            maximumDate={new Date(2006, 11 ,31)}
                            minimumDate ={new Date(1950, 0 , 1)}
                        />
                    )
                }
                <Button
                    mode="contained"
                    style={formsStyles.btnDefault}
                    onPress={formik.handleSubmit}
                    disabled={loadig}
                    loading={loadig}
                >
                    Guardar cambios
                </Button>
                </KeyboardAvoidingView>
            </View>
        // </KeyboardAwareScrollView>
        
    )
}

const initialValues = (values) =>{
    return {
        nombre: values.name,
        last_name: values.last_name,
        phone: values.phone || "",
        gender: values.gender || null,
        birthday: values.birthday && null
    }
}

const validationSchema = () =>{

    const regexPhone = new RegExp(/^[+]*[(]?[0-9\s\.]{1,4}[)]?[0-9-\s\.]{10}$/)

    return {
        nombre: Yup.string().min(3, "Nombre muy corto").max(30, "Nombre demasiado largo").required("El nombre es requerido"),
        last_name: Yup.string().min(3, "Apellido muy corto").max(30, "Apellido demasiado largo").required("El apellido es requerido"),
        phone: Yup.string().nullable().matches(regexPhone, "Este no es un numero de telefono valido"),
    }
}

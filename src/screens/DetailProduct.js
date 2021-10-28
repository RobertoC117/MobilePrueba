import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Button, Caption, Paragraph, Title, TextInput} from 'react-native-paper'
import {Picker} from "@react-native-community/picker"

import Interest from '../components/Product/Interest'
import Slider from '../components/Product/Slider'
import { formsStyles } from '../styles'

export default function DetailProduct() {
    return (
        <ScrollView>
            <Slider/>
            <View style={style.containerInfo}>
                <Title>Nombre del producto bla bhahab bka ff f fffffff ffffffff</Title>
                <Caption style={style.caption}>Marca</Caption>
                <View style={style.controlsContainer}>
                    <View style={style.containerInput}>
                        <View style={formsStyles.inputPickerWrap}>
                            <Picker style={formsStyles.textInput}>
                                <Picker.Item label="1" value={1} />
                                <Picker.Item label="2" value={2} />
                                <Picker.Item label="3" value={3} />
                                <Picker.Item label="4" value={4} />
                                <Picker.Item label="5" value={5} />
                                <Picker.Item label="6" value={6} />
                            </Picker>
                        </View>
                    </View>
                    <View style={style.containerInput}>
                        <Button
                            mode="contained"
                            style={formsStyles.btnDefault}
                            labelStyle={style.labelStyle}
                            >
                            Agregar al carrito
                        </Button>
                    </View>
                    
                    
                </View>
                
                <Title>Descripcion</Title>
                <Paragraph>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Paragraph>
                <Interest/>
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    containerInfo:{
        padding:10
    },
    caption:{
        fontSize:17
    },
    controlsContainer:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    containerInput:{
        width:"49%",
    },
    labelStyle:{
        fontSize:11
    }
})

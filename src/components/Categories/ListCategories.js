import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Title } from 'react-native-paper'
import CategoryItem from './CategoryItem'

export default function ListCategories(props) {

    const {categories} = props

    return (
        <>
            <Title style={{paddingStart:15}}>Categorias</Title>
            <View style={styles.container}>
                {
                    categories.map(item => (
                        <CategoryItem key={item.id} text={item.name} icon="baby"/>
                    ))
                }
                {/* <CategoryItem text="Suplementos alimenticios" icon="prescription-bottle"/>
                <CategoryItem text="Bebes" icon="baby"/>
                <CategoryItem text="Diabetes" icon="syringe"/>
                <CategoryItem text="Material de curación" icon="medkit"/> */}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"row",
        flexWrap:"wrap",
        // padding:5,
        // backgroundColor:"red",
        justifyContent:"space-between",
        padding:7
    }
})
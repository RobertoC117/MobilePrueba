import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { layoutStyles } from '../../styles'
import ListCategories from '../../components/Categories/ListCategories'
import { Button, Title } from 'react-native-paper'
import Slider from '../../components/Home/Slider'
import ListHorizontalBrands from '../../components/Home/ListHorizontalBrands'
import MainProductos from '../../components/Home/MainProductos'

export default function Main(props) {
    const {navigation} = props
    return (
        <ScrollView>
            <Slider/>
            <View style={styles.container}>
                <ListCategories/>
                <View style={{flexDirection:"row",justifyContent:"flex-end", paddingHorizontal:5}}>
                    <Button
                        style={styles.viewMoreButton}
                        labelStyle={styles.viewMoreLabelButton}
                        onPress={()=>navigation.push("categories")}
                    >
                        Ver mas
                    </Button>
                </View>
            </View>
            <ListHorizontalBrands/>
            <MainProductos/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        padding:5,
        backgroundColor:"white",
        marginBottom:10
    },
    viewMoreButton:{
        // backgroundColor:"red",
        width:120
    },
    viewMoreLabelButton:{
        fontSize:12
    }
})

import React,{useCallback, useState} from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { layoutStyles } from '../../styles'
import ListCategories from '../../components/Categories/ListCategories'
import { Button, Title } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/core'

import Slider from '../../components/Home/Slider'
import ListHorizontalBrands from '../../components/Home/ListHorizontalBrands'
import MainProductos from '../../components/Home/MainProductos'
import { getCategories } from '../../api/category'

export default function Main(props) {
    const {navigation} = props

    const [categories, setCategories] = useState(null)
    const [fullCategories, setFullCategories] = useState(null)
    const [loading, setLoading] = useState(false)

    useFocusEffect(
        useCallback(()=>{
            (async()=>{
                let data = await getCategories()
                setCategories(data.data.result.slice(0,4))
                setFullCategories(data.data.result)
            })()
        }, [])
    )

    return (
        <ScrollView>
            <Slider/>
            <View style={styles.container}>
                {
                    categories && (
                        <>
                            <ListCategories categories={categories}/>
                            <View style={{flexDirection:"row",justifyContent:"flex-end", paddingHorizontal:5}}>
                                <Button
                                    style={styles.viewMoreButton}
                                    labelStyle={styles.viewMoreLabelButton}
                                    onPress={()=>navigation.push("categories", {categories: fullCategories})}
                                >
                                    Ver mas
                                </Button>
                            </View>
                        </>
                    )
                }
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

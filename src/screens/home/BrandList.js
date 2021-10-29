import React,{useCallback, useState} from 'react'
import { useFocusEffect } from '@react-navigation/core'
import { View, Text, ScrollView } from 'react-native'
import { getBrands } from '../../api/brands'
import ListBrand from '../../components/Brand/ListBrand'
import TransparentScreenLoading from '../../components/TransparentScreenLoading'

export default function BrandList(props) {

    const [brands, setBrands] = useState(null)

    useFocusEffect(
        useCallback(()=>{
            (async()=>{
                let {data} = await getBrands()
                setBrands(data.result)
            })()
        }, [])
    )

    return (
        <ScrollView style={{backgroundColor:"white"}}>
            {
                brands ? (
                    <ListBrand brands={brands}/>
                ):(
                    <TransparentScreenLoading text="Cargando marcas..."/>
                )
            }
        </ScrollView>
    )
}

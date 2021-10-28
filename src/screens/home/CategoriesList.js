import React from 'react'
import { View, Text } from 'react-native'
import ListCategories from '../../components/Categories/ListCategories'

export default function CategoriesList(props) {
    const {categorias} = props
    return (
        <ListCategories categorias={categorias} />
    )
}

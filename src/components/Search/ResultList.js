import React from 'react'
import ProductListItem from './ProductListItem';
import EmptyList from '../EmptyList'
import NotFound from '../../../assets/images/NoResults.png'

export default function ResultList({results}) {

    if(results.length === 0){
        return(
            <EmptyList
                imagen={NotFound}
                title={"Vaya! No encontramos coincidencias de busqueda"}
                message="Prueba buscando otra cosa"
            />
        )
    }

    return (
        <>
        {
            results.map((item, index)=>(
                <ProductListItem key={index} product={item}/>
            ))
        }
        </>
    )
}

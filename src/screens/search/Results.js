import { useFocusEffect } from '@react-navigation/core';
import React,{useState, useCallback} from 'react'
import {ScrollView, Text} from 'react-native'
import {Title, Divider} from 'react-native-paper'
import { searchProduct } from '../../api/product';
import FiltersControl from '../../components/Search/FiltersControl';
import Pagination from '../../components/Search/Pagination';
import ResultList from '../../components/Search/ResultList';
import TransparentScreenLoading from '../../components/TransparentScreenLoading';
import { API_URL } from '../../utils/constants';

export default function Results(props) {

    const {route:{params}} = props
    const {busqueda, filtro} = params

    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)
    
    const [filter, setFilter] = useState({value:"az", label:"A-Z"})
    const [url, setUrl] = useState(`${API_URL}/product/list/published?filter=${filtro}&sort=${filter.value}&value=${busqueda}`)
    const [next, setNext] = useState(null)
    const [previous, setPrevious] = useState(null)
    const [total, setTotal] = useState(null)

    const updateUrl = (newURL) =>{
        if(newURL)
            setUrl(newURL)
    }

    const updateUrlFilter = (before, after) =>{
        let newURL = url.toString()
        setUrl(newURL.replace(`sort=${before}`, `sort=${after}`))
    }

    useFocusEffect(
        useCallback(()=>{
            (async()=>{
                setLoading(true)
                const {data, status} = await searchProduct(url)
                // console.log(data)
                setResult(data.result)
                setTotal(data.total)
                setPrevious(data.previous)
                setNext(data.next)
                setLoading(false)
            })()
        }, [url])
    )

    return (
        <>
        <ScrollView style={{backgroundColor:"white"}}>
            {/* <Title>Total de resultados: {total}</Title>
            <Divider/> */}
            {
                result &&(
                    <>
                    {result.length > 0 && (
                        <FiltersControl filter={filter} setFilter={setFilter} updateUrlFilter={updateUrlFilter}/>
                    )}
                    <ResultList results={result}/>
                    </>
                )
            }
            <Pagination next={next} previous={previous} updateUrl={updateUrl} />
        </ScrollView>
        {
            loading && (
                <TransparentScreenLoading text="Realizando busqueda..." />
            )
        }
        </>
    )
}
import React,{useState} from 'react'
import {ScrollView} from 'react-native'
import {Title, Divider} from 'react-native-paper'
import FiltersControl from '../../components/Search/FiltersControl';
import Pagination from '../../components/Search/Pagination';
import ResultList from '../../components/Search/ResultList';

export default function Results() {

    const [filter, setFilter] = useState({value:"az", label:"A-Z"})

    return (
        <ScrollView>
            <FiltersControl filter={filter} setFilter={setFilter}/>
            <Title>Total de resultados: 45</Title>
            <Divider/>
            <ResultList/>
            <Pagination/>
        </ScrollView>
    )
}
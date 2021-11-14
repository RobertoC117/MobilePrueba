import React,{useState} from 'react'
import {ScrollView} from 'react-native'
import {Title, Divider} from 'react-native-paper'
import FiltersControl from '../../components/Search/FiltersControl';
import Pagination from './Pagination';
import ResultList from './ResultList';

export default function Results() {

    const [filter, setFilter] = useState({value:"az", label:"A-Z"})

    console.log(filter)

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
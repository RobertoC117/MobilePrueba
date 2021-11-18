import React,{useCallback, useState} from 'react'
import { useFocusEffect } from '@react-navigation/core'
import { ScrollView, Text } from 'react-native'
import HistoryItem from '../../components/Search/HistoryItem'
import EmptyList from '../../components/EmptyList'
import HistoryEmpty from '../../../assets/images/HistoryEmpty.png'
import { getHistory } from '../../api/history'

export default function Main() {

    const [refresh, setRefresh] = useState(false)
    const [history, setHistory] = useState(null)

    useFocusEffect(
        useCallback(()=>{
            (async()=>{
                const history = await getHistory()
                setHistory(history)
            })()
        }, [refresh])
    )

    const update = () => setRefresh(!refresh)

    return (
        <ScrollView style={{backgroundColor:"white"}}>
            {
                history && history.length > 0  ? (
                    history.map((item, index) =>(
                        <HistoryItem key={index} text={item} index={index} update={update}/>
                    ))
                ):(
                    <EmptyList
                        imagen={HistoryEmpty}
                        title="Aun no tienes busquedas"
                        message="Aqui apareceran tus busquedas mas recientes"
                    />
                )
            }
            {/* <HistoryItem/>
            <HistoryItem/> */}
        </ScrollView>
    )
}

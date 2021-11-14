import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { TextInput } from 'react-native-paper'
import HistoryItem from '../../components/Search/HistoryItem'

export default function Main() {
    return (
        <ScrollView>
            <HistoryItem/>
            <HistoryItem/>
            <HistoryItem/>
        </ScrollView>
    )
}

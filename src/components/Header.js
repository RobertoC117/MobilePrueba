import React,{useState} from 'react'
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native'
import { Searchbar } from 'react-native-paper'
import AwesomeIcons from 'react-native-vector-icons/FontAwesome'
import { addItem } from '../api/history'

export default function Header(props) {

    const { navigation, route, back } = props
    const params = route.params
    const name = route.name !== "main-home" ? true : false

    const [query, setQuery] = useState(params?.busqueda || "")

    const setNewValue = (value) => setQuery(value)

    const goToSearch = () => {
        navigation.push("history")
    }

    const search = async() =>{
        if(query === "") return
        await addItem(query)
        navigation.push("search",{busqueda: query, filtro:"nombre"})
    }

    return (
        <View style={styles.container}>
            {
                back && name && (
                    <TouchableNativeFeedback onPress={()=>navigation.goBack()}>
                        <View style={styles.backButtonContainer}>
                            <AwesomeIcons name={"chevron-left"} style={{fontSize:20, color:"white"}} size={30} />
                        </View>
                    </TouchableNativeFeedback>
                )
            }
            <View style={[ back && name ? styles.containerTxt : styles.largeTxtConatiner ]}>
                <Searchbar
                    value={query}
                    onChangeText={setNewValue}
                    style={styles.searchbar}
                    onFocus={back && name ? null : goToSearch}
                    onSubmitEditing={!back && name ? null : search}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height:70,
        width:"100%",
        backgroundColor:"#103F6E",
        flexDirection:"row",
        // justifyContent: "space-around",
        padding: 0
    },
    backButtonContainer:{
        width: "14%", 
        height:"100%",
        // backgroundColor:"red", 
        justifyContent:"center", 
        alignItems:"center"
    },
    containerTxt:{
        width:"85%",
        height:"100%",
        // backgroundColor:"yellow",
        alignItems:"center",
        justifyContent:"center",
        paddingHorizontal:10
    },
    largeTxtConatiner:{
        width:"100%",
        height:"100%",
        // backgroundColor:"yellow",
        alignItems:"center",
        justifyContent:"center",
        paddingHorizontal:25
    },
    searchbar:{
        width:"100%", 
        height:50,
    }
})

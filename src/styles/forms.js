import { StyleSheet } from "react-native";

const formsStyles = StyleSheet.create({
    textInput:{
        height:55
    },
    btnDefault:{
        padding:6,
        marginTop:10
    },
    btnOutlined:{
        //borderColor:"red",
        borderWidth: 1.5
    },
    pairContainer:{
        flexDirection:"row", 
        width:"100%", 
        justifyContent:"space-between" 
    },
    smallinput:{
        width:"49%"
    }
})

export default formsStyles
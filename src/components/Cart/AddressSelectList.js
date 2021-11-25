import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native'
import { Paragraph, Title, Caption, Button} from 'react-native-paper'
import { colors } from '../../styles/colors'
import EmptyList from '../EmptyList'
import NoAddresses from '../../../assets/images/map.png'
import { useNavigation } from '@react-navigation/core'

export default function AddressSelectList({addresses, selectedAddress, setSelectedAddress}) {

    const navigation = useNavigation()

    useEffect(()=>{
        addresses && setSelectedAddress(addresses[0])
    }, [addresses])

    const selectAddress = (id) =>{
        setSelectedAddress(id)
    }

    // if(addresses && addresses.length === 0)
    //     return(
    //         <View>
    //             <EmptyList
    //                 title="¡Vaya!"
    //                 message="Aun no tienes direcciones de entrega registradas"
    //                 imagen={NoAddresses}
    //             />
    //             <Button
    //                 mode="contained"
    //                 style={styles.addButton}
    //                 onPress={()=>navigation.navigate('account')}
    //             >
    //                 Agregar direccion
    //             </Button>
    //         </View>
    //     )

    return (
        <View style={styles.container}>
            {
                addresses && (
                addresses.map(item => (
                    <TouchableNativeFeedback key={item.id} onPress={()=>selectAddress(item)}>
                        <View style={[
                            styles.item,
                            item.id === selectedAddress?.id && styles.selectedItem
                        ]}>
                            <Title>{item.title}</Title>
                            <Paragraph>
                                {`${item.street}, ${item.colony} `} 
                                {item.int_num && `, numero interior ${item.int_num} `}
                                {item.out_num && `, numero exterior ${item.out_num} `}
                            </Paragraph>
                            <Caption>{`${item.reference}`}</Caption>
                        </View>
                    </TouchableNativeFeedback>
                )))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        // backgroundColor:"red",
        padding:15
    },
    item:{
        // backgroundColor:"green",
        width:"100%",
        borderRadius:10,
        padding:10,
        borderColor:"#848484",
        borderWidth:1,
        marginBottom:10
    },
    selectedItem:{
        borderColor: colors.primary,
        backgroundColor: "#AAD4FF"
    },
    addButton:{
        marginHorizontal:50,
        padding:5
    }
})

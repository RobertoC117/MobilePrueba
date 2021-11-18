import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { colors } from '../../styles/colors'

export default function Pagination({next, previous, updateUrl}) {

    const goTo = (url) =>{
        updateUrl(url)
    }

    return (
        <View style={[styles.containerControls, next ? styles.onlyNext : styles.onlyBack]}>
            {
                previous && (
                    <View style={styles.containerButton}>
                        <Button
                            mode="outlined"
                            style={[styles.btnDesing, styles.btnBack]}
                            onPress={()=>goTo(previous)}
                        >
                            Anterior
                        </Button>
                    </View>
                )
            }

            {
                next && (
                    <View style={styles.containerButton}>
                        <Button
                            mode="contained"
                            style={[styles.btnDesing]}
                            onPress={()=>goTo(next)}
                        >
                            Siguiente
                        </Button>
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    containerControls:{
        flexDirection:"row",
    },
    onlyBack:{
        justifyContent:"flex-start"
    },
    onlyNext:{
        justifyContent:"flex-end"
    },
    containerButton:{
        width:"50%",
        padding:15
    },
    btnDesing:{
        padding:8
    },
    btnBack:{
        borderColor:colors.primary,
        borderWidth:1.5
    }
})

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { colors } from '../../styles/colors'

export default function Pagination() {
    return (
        <View style={[styles.containerControls, styles.onlyNext]}>

            <View style={styles.containerButton}>
                <Button
                    mode="outlined"
                    style={[styles.btnDesing, styles.btnBack]}
                >
                    Anterior
                </Button>
            </View>

            <View style={styles.containerButton}>
                <Button
                    mode="contained"
                    style={[styles.btnDesing]}
                >
                    Siguiente
                </Button>
            </View>

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

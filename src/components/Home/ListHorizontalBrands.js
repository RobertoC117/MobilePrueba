import React from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import { Avatar, Surface, Subheading, Title } from 'react-native-paper'
import Imagen from '../../../assets/images/clipboard.png'

export default function ListHorizontalBrands() {
    return (
        <View>
            <Title style={styles.titulo}>Marcas</Title>
            <ScrollView horizontal={true} style={styles.containerScroll} showsHorizontalScrollIndicator={false}>

                <TouchableNativeFeedback onPress={()=>console.log("Hola")}>
                    <Surface style={styles.card}>
                        <Avatar.Image
                            source={Imagen}
                            size={50}
                        />
                        <Subheading numberOfLines={2} style={{textAlign:"center"}} >
                            Nombre de la marca jajajjajaa
                        </Subheading>
                    </Surface>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={()=>console.log("Hola")}>
                    <Surface style={styles.card}>
                        <Avatar.Image
                            source={Imagen}
                            size={50}
                        />
                        <Subheading numberOfLines={2} style={{textAlign:"center"}} >
                            Nombre de la marca jajajjajaa
                        </Subheading>
                    </Surface>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={()=>console.log("Hola")}>
                    <Surface style={styles.card}>
                        <Avatar.Image
                            source={Imagen}
                            size={50}
                        />
                        <Subheading numberOfLines={2} style={{textAlign:"center"}} >
                            Nombre de la marca jajajjajaa
                        </Subheading>
                    </Surface>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={()=>console.log("Hola")}>
                    <Surface style={styles.card}>
                        <Avatar.Image
                            source={Imagen}
                            size={50}
                        />
                        <Subheading numberOfLines={2} style={{textAlign:"center"}} >
                            Nombre de la marca jajajjajaa
                        </Subheading>
                    </Surface>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={()=>console.log("Hola")}>
                    <Surface style={styles.card}>
                        <Avatar.Image
                            source={Imagen}
                            size={50}
                        />
                        <Subheading numberOfLines={2} style={{textAlign:"center"}} >
                            Nombre de la marca jajajjajaa
                        </Subheading>
                    </Surface>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={()=>console.log("Hola")}>
                    <Surface style={styles.card}>
                        <Subheading numberOfLines={2} style={{textAlign:"center"}} >
                            VER MAS
                        </Subheading>
                    </Surface>
                </TouchableNativeFeedback>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginBottom:10,
        paddingEnd:10
    },
    containerScroll:{
        padding:10,
    },
    titulo:{
        marginVertical:0,
        paddingStart:15
    },
    card:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        height:130,
        width:100,
        backgroundColor:"white",
        borderRadius:5,
        padding:5,
        marginRight:10,
        marginBottom:10,
        elevation:4
    }
})

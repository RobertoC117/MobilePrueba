import React from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native'
import { Card, Title, Paragraph, Caption} from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'


export default function MainProductos() {
    const navigation = useNavigation()
    return (
        <View>
            <Title style={styles.title}>Recomendaciones</Title>
            <View style={styles.container}>
                <TouchableNativeFeedback onPress={()=>navigation.push('detail')}>
                    <Card style={styles.items}>
                        <Card.Cover style={{
                            width: "100%",
                            height:100,
                            resizeMode: "contain",
                        }} source={{ uri: 'https://picsum.photos/700' }} />
                        <Card.Content>
                            <Paragraph numberOfLines={2}>Card title Card title Card title Card title Card title</Paragraph>
                            <Caption>Marca</Caption>
                            <Paragraph style={styles.price}>$20</Paragraph>
                        </Card.Content>
                    </Card>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={()=>navigation.push('detail')}>
                    <Card style={styles.items}>
                        <Card.Cover style={{
                            width: "100%",
                            height:100,
                            resizeMode: "contain",
                        }} source={{ uri: 'https://picsum.photos/700' }} />
                        <Card.Content>
                            <Paragraph numberOfLines={2}>Card title Card title Card title Card title Card title</Paragraph>
                            <Caption>Marca</Caption>
                            <Paragraph style={styles.price}>$20</Paragraph>
                        </Card.Content>
                    </Card>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={()=>navigation.push('detail')}>
                    <Card style={styles.items}>
                        <Card.Cover style={{
                            width: "100%",
                            height:100,
                            resizeMode: "contain",
                        }} source={{ uri: 'https://picsum.photos/700' }} />
                        <Card.Content>
                            <Paragraph numberOfLines={2}>Card title Card title Card title Card title Card title</Paragraph>
                            <Caption>Marca</Caption>
                            <Paragraph style={styles.price}>$20</Paragraph>
                        </Card.Content>
                    </Card>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={()=>navigation.push('detail')}>
                    <Card style={styles.items}>
                        <Card.Cover style={{
                            width: "100%",
                            height:100,
                            resizeMode: "contain",
                        }} source={{ uri: 'https://picsum.photos/700' }} />
                        <Card.Content>
                            <Paragraph numberOfLines={2}>Card title Card title Card title Card title Card title</Paragraph>
                            <Caption>Marca</Caption>
                            <Paragraph style={styles.price}>$20</Paragraph>
                        </Card.Content>
                    </Card>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={()=>navigation.push('detail')}>
                    <Card style={styles.items}>
                        <Card.Cover style={{
                            width: "100%",
                            height:100,
                            resizeMode: "contain",
                        }} source={{ uri: 'https://picsum.photos/700' }} />
                        <Card.Content>
                            <Paragraph numberOfLines={2}>Card title Card title Card title Card title Card title</Paragraph>
                            <Caption>Marca</Caption>
                            <Paragraph style={styles.price}>$20</Paragraph>
                        </Card.Content>
                    </Card>
                </TouchableNativeFeedback>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        flexWrap:"wrap",
        width:"100%",
        // backgroundColor:"green",
        padding:15,
        justifyContent:"space-between"
    },
    items:{
        width:"49%",
        // backgroundColor:"red",
        // height:180,
        marginTop:10
    },
    price:{
        fontWeight:"bold",
        color:"green"
    },
    title:{
        paddingStart:15
    }
})

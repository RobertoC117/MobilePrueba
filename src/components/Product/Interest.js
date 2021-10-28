import React from 'react'
import { View, StyleSheet, ScrollView, TouchableNativeFeedback } from 'react-native'
import { Title, Card, Caption, Paragraph } from 'react-native-paper'

export default function Interest() {
    return (
        <View>
            <Title style={styles.title}>Tambien te podria interesar:</Title>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
            </ScrollView>
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
        width:150,
        // backgroundColor:"red",
        // height:180,
        margin:5
    },
    price:{
        fontWeight:"bold",
        color:"green"
    },
    title:{
        paddingStart:15
    }
})

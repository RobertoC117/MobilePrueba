import React,{useState, useEffect} from 'react'
import { View, StyleSheet, Dimensions, Image } from 'react-native'
import Carousel,{Pagination} from 'react-native-snap-carousel'
import Imagen from '../../../assets/images/clipboard.png'
import { getCarouselImgs } from '../../api/slider'

const width = Dimensions.get("window").width
const height = 190;

export default function Slider() {

    const [indexActive, setIndexActive] = useState(0)
    const [slider, setSlider] = useState(null)

    useEffect(()=>{
        (async()=>{
            const {data} = await getCarouselImgs()
            setSlider(data.result)
        })()
    }, [])

    const renderSlider = ({item}) =>{
        return(
            <Image style={styles.carousel} source={{uri: item.img_url}} />
        )
    }

    if(!slider) return null

    return (
        <View style={styles.container}>
            <Carousel
                autoplay={true}
                autoplayInterval={2300}
                lockScrollWhileSnapping={true}
                loop={true}
                enableSnap={true}
                sliderWidth={width}
                itemWidth={width}
                layout="default"
                data={slider}
                renderItem={renderSlider}
                onSnapToItem={(index)=>setIndexActive(index)}
            />
            <Pagination
                dotsLength={slider.length} 
                activeDotIndex={indexActive}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                containerStyle={styles.dotsContainer}
                // dotStyle={styles.dot}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        position:"relative",
        marginBottom:10
    },
    carousel:{
        width,
        height,
        resizeMode: "contain",
        justifyContent:"center"
    },
    dotsContainer:{
        position:"absolute",
        bottom: -20,
        width:"100%"
    },
    dot:{
        backgroundColor:"#ffff"
    }
})

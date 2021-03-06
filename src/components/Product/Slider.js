import React,{useState} from 'react'
import { View, StyleSheet, Dimensions, Image } from 'react-native'
import Carousel,{Pagination} from 'react-native-snap-carousel'
import Imagen from '../../../assets/images/clipboard.png'

const width = Dimensions.get("window").width
const height = 300;

export default function Slider(props) {

    const {imagenes} = props

    const [sliderItems, setSliderItems] = useState([1,2,3])
    const [indexActive, setIndexActive] = useState(0)

    const renderSlider = ({item}) =>{
        return(
            <Image style={styles.carousel} source={{uri:item.url}} />
        )
    }

    return (
        <>
            <Carousel
                lockScrollWhileSnapping={true}
                enableSnap={true}
                sliderWidth={width}
                itemWidth={width}
                layout="default"
                data={imagenes}
                renderItem={renderSlider}
                onSnapToItem={(index)=>setIndexActive(index)}
            />
            <Pagination
                dotsLength={imagenes.length} 
                activeDotIndex={indexActive}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </>
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

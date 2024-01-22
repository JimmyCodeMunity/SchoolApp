import { View, Text, Dimensions, TouchableWithoutFeedback, Image, StyleSheet } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function Slider({ data, navigation, name }) {
    const carouselData = [
        {
            id: 1,
            image: require('../assets/logo.png'),
            bgcolor: '#000',
            color:'#fff',
            context:'Admission Ongoing'

        },
        {
            id: 2,
            image: require('../assets/family.png'),
            bgcolor: '#fff',
            color:'#000',
            context:'Just The right place for your Kids.'

        },
        {
            id: 4,
            image: require('../assets/tangara.jpg'),
            bgcolor: '#5fcf80',
            color:'#fff',
            context:name,

        },
    ];
    return (
        <View className="mt-8" style={{ height: 200 }}>
            <Carousel
                data={carouselData}
                renderItem={({ item }) => <Events item={item} />}

                inactiveSlideOpacity={0.8}
                sliderWidth={windowWidth}
                itemWidth={windowWidth * 0.92}
                itemHeight={windowHeight * 0.3}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
                layout={'tinder'} layoutCardOffset={`18`}
                
                scrollEventThrottle={16}
        decelerationRate={-1}
        bounces={true}
            />


        </View>
    )
}


const Events = ({ item }) => {
    return (
        <TouchableWithoutFeedback>
            <View style={[styles.card, { backgroundColor: item.bgcolor }]} className="rounded-3xl flex-row shadow-lg justify-between p-8">
                <View className="items-center flex-start" style={{ width:'50%' }}>
                    <Text numberOfLines={2} className="font-semibold text-xl" style={[styles.text,{color:item.color}]}>{item.context}</Text>
                </View>

                <View className="items-center" style={{ width:'50%' }}>
                    <Image className="object-contain" source={item.image} style={styles.cardimage}/>
                </View>

            </View>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: 'green',
        height: 150,
        width: '100%'
    },
    cardimage:{
        width:100,
        height:100,
        
    }
})
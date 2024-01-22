import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import MapView,{Marker} from 'react-native-maps'
import * as Icon from 'react-native-feather'
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const RouteScreen = ({navigation,route}) => {
    const {name} = route.params;
    const lat = -1.1596681258962285;
    const long = 36.978413366406116;
    const [map,setMap] = useState('hybrid');
    

    const maptypes = [
        {
            id:1,
            name:'hybrid'
        },
        {
            id:2,
            name:'standard'
        },
        {
            id:3,
            name:'satellite'
        },
    ]
  return (
    <View className="flex-1 bg-white">
        {/* Map View here */}
        <MapView
        initialRegion={{ 
            latitude:lat,
            longitude:long,
            latitudeDelta:0.01,
            longitudeDelta:0.01,
         }}
        className="flex-1"
        mapType={map}
        >
            <Marker
            coordinate={{ 
                latitude:lat,
                longitude:long,
             }}
             title={name}
             pinColor={'lightgreen'}
            />

        </MapView>
        <View className="" style={Platform.OS ==='ios' ? {position: 'absolute', top: '2%', left: 10, borderRadius: 50, zIndex: 3 }:{position: 'absolute', top: '7%', left: 10, borderRadius: 50, zIndex: 3 }}>
                <TouchableOpacity
                onPress={()=>navigation.goBack()}
                className="absolute rounded-full h-10 w-10 bg-white items-center justify-center" style={{ top:20,left:20 }}>
                    <Icon.XCircle size={30} color="black" />
                </TouchableOpacity>
            </View>
        <View className="rounded-t-3xl -mt-12 bg-white">
            <View className="flex-row justify-between px-5 pt-10">
                <View>
                    <Text className="text-slate-500 font-semibold">
                        Select Map Type
                    </Text>
                    <Text className="text-green-500">Current:{map}</Text>
                    <View className="flex-row justify-between py-3">
                        {maptypes.map((item)=>(
                            <TouchableOpacity key={item.id} onPress={()=>setMap(item.name)} className="rounded-3xl border border-gray-300 p-3 px-2">
                            <Text className="text-green-400">{item.name}</Text>

                        </TouchableOpacity>

                        ))}
                        
                        
                    </View>
                </View>
            </View>
        </View>
    </View>
  )
}

export default RouteScreen

const styles = StyleSheet.create({})
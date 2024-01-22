import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import * as Icon from 'react-native-feather'

const KidsCorner = ({navigation}) => {
  return (
    <View className="flex-1 bg-black">
            <View className="items-center mt-5">
              <TouchableOpacity 
              onPress={()=>navigation.goBack()}
              className="absolute rounded-full bg-white h-10 w-10 justify-center items-center" style={{ top:0,right:20 }}>
              <Icon.XCircle size={30} color="black" />
              </TouchableOpacity>
                
                <Text className="text-white text-3xl font-bold">Kids Corner</Text>
            </View>
        </View>
  )
}

export default KidsCorner

const styles = StyleSheet.create({})
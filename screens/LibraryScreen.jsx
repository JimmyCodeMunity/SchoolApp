import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import * as Icon from 'react-native-feather'

const LibraryScreen = ({navigation}) => {
  return (
    <View className="flex-1 bg-black">
      <View className="items-center mt-5">
        
        <Text className="text-white text-3xl font-bold">Library</Text>
      </View>
    </View>
  )
}

export default LibraryScreen

const styles = StyleSheet.create({})
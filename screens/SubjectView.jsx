import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity,Image } from 'react-native'
import React from 'react'

const SubjectView = ({navigation,route}) => {
    const {subName} = route.params;
  return (
    <SafeAreaView className="flex-1 relative">
      <Text className="text-slate-500 text-2xl font-semibold">{subName}</Text>
    </SafeAreaView>
  )
}

export default SubjectView

const styles = StyleSheet.create({})
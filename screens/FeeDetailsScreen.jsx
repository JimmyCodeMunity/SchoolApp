import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Platform, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import * as Icon from 'react-native-feather'

const FeeDetailsScreen = ({ navigation, route }) => {
    const { profileimage, name } = route.params;
    return (
        <View className="flex-1 bg-black">

            <View className="flex flex-row px-5 justify-between items-center mt-8">
                <View>
                    <Image
                        source={{ uri: `https://tangaraschools.org/images/${profileimage}` }}
                        className="h-12 w-12 rounded-full"
                    />
                </View>
                <View className="flex-column items-center">
                    <Text className="text-white">Welcome</Text>
                    <Text className="text-white font-bold text-3xl mt-3">{name}</Text>
                </View>
                <TouchableOpacity className="bg-white rounded-full" onPress={() => navigation.goBack()}>
                    <Icon.XCircle size={30} color="black" />
                </TouchableOpacity>

            </View>

            <View className="justify-center items-center mt-5 flex">
                <View className="flex-row items-center bg-slate-300 h-10 rounded-3xl">
                    <View className="bg-white rounded-3xl h-10 items-center justify-center">
                        <Text className="text-slate-900 px-3">Balance</Text>
                    </View>
                    <View className="bg-transparent rounded-3xl h-10 items-center justify-center">
                        <Text className="text-slate-900 px-3">Wallet</Text>
                    </View>

                </View>
            </View>




            <View className="mt-8 px-5 flex-1">
                <View className="bg-green-400 h-24 w-full rounded-3xl justify-center items-center">
                    <View>
                        <Text className="text-slate-800">Total Paid</Text>
                    </View>
                    <View>
                        <Text className="text-slate-900 font-bold text-3xl">
                            $4,000.00
                        </Text>
                    </View>
                </View>

                <View className="mt-1 flex-1 flex">
                    <View className="flex-row justify-center items-center">
                        <View className="justify-center items-center">
                            <View className="bg-white rounded-full mx-5 w-12 h-12 justify-center items-center">
                                <View className="justify-center items-center h-8 w-8">
                                    <Image source={require('../assets/pay.png')} className="w-full h-full" />
                                </View>
                            </View>
                            <Text className="text-slate-300">Pay</Text>
                        </View>

                        <View className="justify-center items-center">
                            <View className="bg-white rounded-full mx-5 w-12 h-12 justify-center items-center">
                                <View className="justify-center items-center h-8 w-8">
                                    <Image source={require('../assets/printer.png')} className="w-full h-full" />
                                </View>
                            </View>
                            <Text className="text-slate-300">Invoice</Text>
                        </View>


                        <View className="justify-center items-center">
                            <View className="bg-white rounded-full mx-5 w-12 h-12 justify-center items-center">
                                <View className="justify-center items-center h-8 w-8">
                                    <Image source={require('../assets/dashboard.png')} className="w-full h-full" />
                                </View>
                            </View>
                            <Text className="text-slate-300">More</Text>
                        </View>
                    </View>
                </View>
            </View>




            <View className="absolute flex-1 bg-white w-full rounded-t-3xl" style={{ height: '50%', bottom: 0 }}>
                <View className="px-4 mt-3">
                    <View className="">
                        <Text className="text-slate- font-semibold text-xl">Recent Payments</Text>
                    </View>

                    <ScrollView vertical={true} className="h-full">
                        <View className="bg-slate-100 mb-3 h-16 w-full rounded-2xl flex-row items-center justify-between">
                            <View className="flex-row px-4 items-center justify-between">
                                <View className="justify-center items-center h-8 w-8 mx-2">
                                    <Image source={require('../assets/money-2.png')} className="w-full h-full" />
                                </View>
                                <View>
                                    <Text className="text-slate-700 font-semibold text-xl">ParentName</Text>
                                </View>
                            </View>
                            <View>
                                <Text className="text-slate-900 font-semi-bold text-lg px-4">$40</Text>
                            </View>
                        </View>
                        <View className="bg-slate-100 mb-3 h-16 w-full rounded-2xl flex-row items-center justify-between">
                            <View className="flex-row px-4 items-center justify-between">
                                <View className="justify-center items-center h-8 w-8 mx-2">
                                    <Image source={require('../assets/money-2.png')} className="w-full h-full" />
                                </View>
                                <View>
                                    <Text className="text-slate-700 font-semibold text-xl">ParentName</Text>
                                </View>
                            </View>
                            <View>
                                <Text className="text-slate-900 font-semi-bold text-lg px-4">$40</Text>
                            </View>
                        </View>

                        

                        
                    </ScrollView>
                </View>

            </View>
        </View>
    )
}

export default FeeDetailsScreen

const styles = StyleSheet.create({})
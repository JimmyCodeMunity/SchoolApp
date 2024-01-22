import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image,Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as Icon from "react-native-feather"



const TeacherScreen = ({ navigation, route }) => {
    const { teacherID, teacherPic } = route.params;
    const [teacherData, setTeacherData] = useState([]);

    useEffect(() => {
        fetchTeacherDataById();
    }, []);


    //fetch data
    const fetchTeacherDataById = async () => {
        try {
            const response = await axios.get(`https://tangaraschools.org/tangaraapi/fetchteacherbyemail.php?id=${teacherID}`);
            setTeacherData(response.data);


        } catch (error) {
            console.log(error)

        }
    }
    return (
        <SafeAreaView className="flex-1 relative bg-white">

            <Image source={{ uri: `https://tangaraschools.org/images/${teacherPic}` }} style={{ height: '50%' }} className="absolute w-full rounded-b-3xl" />
            <View className="items-center justify-center bg-white p-2" style={Platform.OS === 'ios' ? {position: 'absolute', top: 10, left: 10, borderRadius: 50 }:{position: 'absolute', top: 40, left: 10, borderRadius: 50 }}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Icon.ArrowLeft size={30} color="black" />
                </TouchableOpacity>
            </View>
            <View className="px-4 mt-8 items-center w-100 border-rounded-3xl shadow-2xl shadow-gray-800 bg-black rounded-t-3xl " style={{ height: '60%', position: 'absolute', bottom: 0, width: '100%' }}>

                {teacherData.map((teacher) => (
                    <View className="justify-center item-center w-100">
                        <View className="justify-center items-center mt-5">
                            <View className="justify-center items-center">
                                <Text className="text-xl text-slate-500">FullName</Text>
                                <Text className="text-black font-semibold text-lg">{teacher.fullname}</Text>
                            </View>


                            <View className="justify-between items-center mt-8" style={{ flexDirection: 'row' }}>
                                <View className="px-4 justify-center items-center">
                                    <Text className="text-slate-500">Email</Text>
                                    <Text className="text-sm">{teacher.email}</Text>
                                </View>
                                <View className="px-4 justify-center items-center">
                                    <Text className="text-slate-500">Class</Text>
                                    <Text className="text-sm">{teacher.class}</Text>
                                </View>
                                <View className="px-4 justify-center items-center">
                                    <Text className="text-slate-500">Phone</Text>

                                    <Text className="text-sm">{teacher.phone}</Text>
                                </View>

                            </View>
                        </View>
                    </View>
                ))}

            </View>

        </SafeAreaView>
    )
}

export default TeacherScreen

const styles = StyleSheet.create({})
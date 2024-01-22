import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, ActivityIndicator,Platform,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import * as Icon from 'react-native-feather';
import axios from 'axios';

const ProfileScreen = ({ route, navigation }) => {
  const [userdata, setUserdata] = useState([]);

  const { admission } = route.params;
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);



  //fetch all teh teachers
  //fetch teachers
  useEffect(() => {
    fetchTeachers();
  }, [])


  const fetchTeachers = async () => {
    try {
      const response = await axios.get("https://tangaraschools.org/tangaraapi/fetchteachers.php");
      setTeachers(response.data);

    } catch (error) {
      console.log(error);

    }
  };


  useEffect(() => {
    fetchUserDetails();

  }, []);



  //fetch user data
  const fetchUserDetails = () => {
    fetch("https://tangaraschools.org/tangaraapi/studentdetails.php")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        const student = data.find((item) => item.adm_number === admission);
        if (student) {
          setUserdata(student);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }
  return (
    <SafeAreaView className="bg-white flex-1 relative">
      <StatusBar style='light' />
      <Image source={{ uri: `https://tangaraschools.org/images/${userdata.studpic}` }} blurRadius={10} style={{ height: '40%' }} className="absolute w-full rounded-b-3xl" />
      <View className="items-center justify-center bg-white p-3" style={{ position: 'absolute', top: '5%', left: 10, borderRadius: 50,zIndex:3 }}>
                <TouchableOpacity className="" onPress={()=>navigation.goBack()}>
                    <Icon.ArrowLeft size={30} color="black" />
                </TouchableOpacity>
            </View>
      <ScrollView className="px-5" vertical={true}>

        <View className={Platform.OS === 'ios' ? "justify-center items-center my-5 bg-white px-5 mt-20 rounded-t-3xl":"justify-center items-center my-5 bg-white px-5 mt-24 rounded-t-3xl"}>
          <View className="justify-center my-10">
            {loading ? (
              <View className="rounded-full border border-spacing-2 justify-center items-center border-cyan-600 h-32 w-32">
                <ActivityIndicator size="large" color="black" />
              </View>
            ) : (
              <Image className="h-32 w-32 rounded-full  border border-spacing-3 border-cyan-600" source={{ uri: `https://tangaraschools.org/images/${userdata.studpic}` }} />
            )}

          </View>
          <View className="my-8 items-center">
            <Text className="text-slate-500">Full Name</Text>
            <Text className="text-2xl font-semi-bold">{userdata.firstname} {userdata.lastname}</Text>
          </View>



          <View className="justify-between items-center" style={{ flexDirection: 'row' }}>
            <View className="px-4 justify-center items-center">
              <Text className="text-slate-500">Class</Text>
              <Text className="semi-bold text-xl">{userdata.class}</Text>
            </View>
            <View className="px-4 justify-center items-center">
              <Text className="text-slate-500">Admission</Text>
              <Text className="semi-bold text-xl">{userdata.adm_number}</Text>
            </View>
            <View className="px-4 justify-center items-center">
              <Text className="text-slate-500">Status</Text>
              {userdata.status === '1' ? (
                <Text className="semi-bold text-xl">Active</Text>

              ) : (
                <Text className="semi-bold text-xl">Inactive</Text>
              )}
            </View>

          </View>
          <View className="justify-center items-center mt-5">
            <View className="bg-gray-100 h-32 w-80 rounded-2xl px-4 p-4 shadow-md justify-center items-center">
              <Text className="text-slate-500">ParentName</Text>
              <Text className="font-semibold text-sm">{userdata.parentname}</Text>
              <Text className="text-slate-500">Phone</Text>
              <Text className="font-semibold text-sm">254{userdata.phone}</Text>
            </View>
          </View>
          <View className="flex items-center px-4" horizontal={true}>
            <View className="flex" style={{ flexDirection: "row" }}>
              {teachers.map((teacher) => (
                <View className="p-2"
                  key={teacher.id}
                >
                  <TouchableOpacity

                    onPress={() => navigation.navigate('teachers', { teacherID: teacher.id, teacherPic: teacher.profilepic })}
                    className="justify-center items-center rounded-full border border-green-500 h-12 w-12">
                    <Image className="w-full h-full rounded-full items-center justify-center" source={{ uri: `https://tangaraschools.org/images/${teacher.profilepic}` }} />
                  </TouchableOpacity>
                  

                </View>
              ))}
            </View>
          </View>

          

          <View className="w-100 justify-center items-center">
            <TouchableOpacity className="bg-green-400 h-10 rounded-xl w-40 mt-3 justify-center items-center">
              <Text className="font-bold text-white">Change Password</Text>
            </TouchableOpacity>
          </View>



        </View>

      </ScrollView>

    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})
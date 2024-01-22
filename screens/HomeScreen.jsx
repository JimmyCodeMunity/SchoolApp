import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Icon from 'react-native-feather';
import Slider from '../components/Slider';
import axios from 'axios';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { actions } from '../data/actions';



const HomeScreen = ({ navigation, route }) => {
  const colors = {
    primary: '#5fcf80',
    secondary: '',
  }
  const [events, setEvents] = useState([1, 2, 3]);
  const { admission } = route.params;
  //assign name of student
  const [userdata, setUserdata] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teacher, setTeacher] = useState('');
  const [loading, setLoading] = useState(true);


  //start fetching user data
  useEffect(() => {
    fetchUserData();
  }, []);



  //function to fetch user data
  const fetchUserData = () => {
    fetch("https://tangaraschools.org/tangaraapi/studentdetails.php")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        const student = data.find((item) => item.adm_number === admission);
        if (student) {
          setUserdata(student);
          setTeacher(student.teacher);

          // console.log('TeacherName:', student.teacher)

        }
      })
      .catch((error) => {
        console.log(error);
      });
  }



  //create classteacher



  const fetchSubjects = async () => {
    try {
      // console.log('collected:', teacher);
      const response = await axios.get("https://tangaraschools.org/tangaraapi/fetchSubjects.php");
      const mysubjects = response.data;
      setSubjects(mysubjects);


    } catch (error) {
      console.log(error);

    }
  };


  useEffect(() => {
    fetchSubjects();
  }, [teacher])


  //filter teacher and subject
  const filteredSubject = subjects.filter(item => item.teacher === teacher);


  // console.log('Userdata:', userdata);
  // console.log('Subjects:', subjects);



















  return (
    <ScrollView className="flex-1 bg-white text-white" vertical={true}>

      <SafeAreaView className=" bg-green-400 flex-1 w-full absolute rounded-b-3xl" style={{ height: '30%' }}>
      </SafeAreaView>
      {/**header section */}
      <View className="my-5">
        <View className="flex-row justify-between items-center mt-5 relative px-5">
          <View className="">
            <TouchableOpacity className="" onPress={() => navigation.navigate('Menu', { name: userdata.firstname, profileimage: userdata.studpic })}>
              <Icon.Menu size={30} color="white" />
            </TouchableOpacity>


          </View>
          <View>
            {loading ? (
              <View className="rounded-full border border-spacing-2 justify-center items-center border-cyan-600 h-10 w-10">
                <ActivityIndicator size="small" color="black" />
              </View>

            ) : (
              <TouchableOpacity onPress={() => navigation.navigate('Profile', { admission: userdata.adm_number })}>
                <Image className="h-10 w-10 rounded-full" source={{ uri: `https://tangaraschools.org/images/${userdata.studpic}` }} />
              </TouchableOpacity>

            )}

          </View>
        </View>



        {/**welcoming text here */}
        <View className="mt-1 px-5">
          <Text className="text-white font-bold text-xl">
            <Text className="font-bold text-slate-500" style={styles.text}>H</Text>ello {userdata.firstname}
          </Text>

          <Text className="text-slate-800 font-semibold text-lg">Welcome to Tangara School App</Text>
        </View>

        <View className="h-full">




          {/**header ends here */}
          <Slider data={events} name={userdata.firstname} />

          <ScrollView vertical className="">
            <View className="mx-4">


              <View className="flex-row justify-between flex-wrap px-1">
                {actions.map((action) => {
                  return (
                    <TouchableOpacity key={action.id} onPress={() => navigation.navigate(action.navigateto, { profileimage: userdata.studpic, name: userdata.firstname, })}>
                      <View className="bg-slate-200 h-12 w-12 border border-green-500 rounded-full px-4 justify-center items-center">
                        <Image source={action.image} className="w-8 h-8" />

                      </View>
                      <Text className="text-slate-500 text-center">{action.actionName}</Text>
                    </TouchableOpacity>


                  )
                })}


              </View>
            </View>



            <View className="mx-4 mt-1">
              <View className="flex-row items-center justify-between">
                <Text className="font-bold text-lg">Events</Text>

              </View>
            </View>


            <View className={Platform.OS === 'ios' ? "mt-2 px-4" : "mt-4 px-5"}>
              <View className={Platform.OS === 'ios' ? "bg-slate-900 h-28 w-full rounded-xl" : "bg-slate-900 h-32 w-full rounded-xl"}>
                <Image source={require('../assets/students.png')} className="w-full h-full justify-center items-center" />
              </View>
            </View>


            <View className="mx-4 mt-3">
              <Text className="font-bold text-lg mb-3">Collected Subjects</Text>
              {/* subjects gol here */}
              {filteredSubject.map((subject) => (
                <TouchableOpacity key={subject.id} 
                onPress={()=>navigation.navigate('Viewsubject',
                {subName:subject.subname}
                )}
                className="bg-slate-300 mb-4 rounded-xl h-14 p-3 w-full justify-center px-5">
                  <Text className="text-slate-500 font-bold text-xl">{subject.subname}</Text>
                  <Text className="text-slate-400">{subject.subwel}</Text>
                </TouchableOpacity>
              ))}

            </View>






          </ScrollView>
        </View>
      </View>

    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
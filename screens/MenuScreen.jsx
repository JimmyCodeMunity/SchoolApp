import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Platform, Linking, Share, ActivityIndicator, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Icon from 'react-native-feather';


const MenuScreen = ({ navigation, route }) => {
    const [userdata, setUserdata] = useState([]);
    const { name, profileimage } = route.params;
    const [loading, setLoading] = useState(true);


    //actions
    //handle share
    const handleShare = () => {
        const message = "Share this awesome school details";
        const url = "https://www.tangaraschools.org";

        Share.share({
            message: message,
            url: url,
        })
            .then((result) => console.log(result))
            .catch((error) => console.log(error));
    };


    //visit website
    const handleLinkPress = () => {
        Linking.openURL("https://www.tangaraschools.org");
    };

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

                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <SafeAreaView className="flex-1 relative py-7">
            <View className="items-center justify-center bg-green-400 p-3" style={Platform.OS === 'ios' ? { position: 'absolute', top: '2%', left: 10, borderRadius: 50, zIndex: 3 } : { position: 'absolute', top: '7%', left: 10, borderRadius: 50, zIndex: 3 }}>
                <TouchableOpacity className="" onPress={() => navigation.goBack()}>
                    <Icon.XCircle size={30} color="black" />
                </TouchableOpacity>
            </View>
            <View className="justify-center items-center mt-5">
                <Text className="font-bold text-slate-700 text-3xl">Settings</Text>
            </View>


            <View className="px-5 mt-8">
                <View className="bg-slate-200 h-24 rounded-full justify-between flex-row items-center">
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Profile', { admission: userdata.adm_number })}>
                            <Image className="h-24 w-24 rounded-full" source={{ uri: `https://tangaraschools.org/images/${profileimage}` }} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text className="text-slate-500 px-8 font-bold text-2xl">{name}</Text>
                    </View>

                </View>
            </View>

            <View className="px-5 mt-8">
                <View className="bg-slate-200 h-72 rounded-xl border border-green-300">
                    <View className="border border-t-0 border-r-0 border-l-0 h-12 rounded-xl justify-center px-5">

                        <Text className="font-semibold text-lg">Account</Text>

                    </View>
                    <View className="h-12 rounded-xl justify-center px-5">
                        <TouchableOpacity>
                            <Text className="font-semibold text-slate-600 text-sm">Reset password</Text>
                        </TouchableOpacity>

                    </View>
                    <View className="h-12 rounded-xl justify-center px-5">
                        <TouchableOpacity onPress={handleLinkPress}>
                            <Text className="font-semibold text-slate-600 text-sm">Visit Website</Text>
                        </TouchableOpacity>

                    </View>
                    <View className=" h-12 rounded-xl justify-center px-5">
                        <TouchableOpacity onPress={handleShare}>
                            <Text className="font-semibold text-slate-600 text-sm">Tell A Friend</Text>
                        </TouchableOpacity>

                    </View>


                    <View className=" h-12 rounded-xl justify-center px-5">
                        <TouchableOpacity onPress={() => navigation.navigate('SLocation')}>
                            <View className="flex-row">
                                <Icon.MapPin size={30} color={"black"} />
                                <Text className="font-semibold text-slate-600 text-sm">Find School</Text>
                            </View>
                        </TouchableOpacity>

                    </View>


                </View>
            </View>



            <View className="h-16 px-5 mt-8">
                <View className="bg-slate-200 h-14 rounded-lg border border-slate-400 justify-center px-5">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Map', { name })}
                        className="flex-row">
                        <Icon.MapPin size={30} color="black" />
                        <Text className="text-lg">Transport Rotes</Text>
                    </TouchableOpacity>
                </View>
            </View>


            <View className="justify-center items-center absolute w-full px-5 mb-3" style={{ bottom: 0 }}>
                <View className="items-center justify-center relative bg-slate-900 h-12 rounded-2xl w-full">
                    <Text className="text-center font-semibold text-white text-2xl">Logout</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default MenuScreen

const styles = StyleSheet.create({})
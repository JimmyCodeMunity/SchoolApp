import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import LottieView from "lottie-react-native";



//firebase setup

import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Image,
  KeyboardAvoidingView,
  ImageBackground,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";



const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const [admission, setAdmission] = useState("TSR003");
  const [password, setPassword] = useState("123456");
  const [role, setRole] = useState("");
  const navigation = useNavigation();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  



  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unSubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    checkSavedCredentials();

    return () => {
      unSubscribe();
    };
  }, []);

  const checkSavedCredentials = async () => {
    try {
      const savedAdmission = await AsyncStorage.getItem("adm_number");
      const savedPassword = await AsyncStorage.getItem("password");

      if (savedAdmission && savedPassword) {
        setAdmission(savedAdmission);
        setPassword(savedPassword);
      }
    } catch (error) {
      console.log(error);
    }
  };




  const handleLogin = async () => {
    if (!isConnected) {
      Alert.alert("Please connect to the internet");
      return;
    }

    setLoading(true);
    try {

      const response = await fetch(
        "https://tangaraschools.org/tangaraapi/loginauth.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({

            adm_number: admission,
            password: password,
          }),
        }
      );
      setLoading(true);

      const data = await response.text();
      if (data === "authenticated") {
        await AsyncStorage.setItem("adm_number", admission);
        await AsyncStorage.setItem("password", password);
        console.log('login successfull');

        navigation.navigate("BottomTab", {
          admission,
        });
        setMessage("");
      } else {
        alert(message);
        console.log(message);
        setMessage("Invalid username or password");
      }
    } catch (error) {
      setMessage(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light"/>

      <View style={styles.logocontainer}>
        <View style={styles.logo}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.profileImage}
          />
          <Text style={styles.logotext}>Tangara School</Text>
        </View>

        <View className="shadow-md" style={styles.form}>
          <Text style={{ color: "#fff", fontSize: 23, marginBottom: 12 }}>
            Login
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Admission"
            value={admission}
            onChangeText={(text) => setAdmission(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />

          <View style={styles.btncontainer}>
            <TouchableOpacity style={styles.btn} onPress={handleLogin}>
              {loading ?(
                <ActivityIndicator size="small" color={'black'}/>
              ):(
                <Text style={styles.btntext}>Login</Text>
              )}

              

            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={{ color: "#fff", fontSize: 15, marginTop: 12 }}>
                Forgot Password
              </Text>
            </TouchableOpacity>


          </View>
        </View>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5fcf80",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  logocontainer: {
    height: "70%",
    backgroundColor: "#fff",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: -50,

    alignItems: "center",
    justifyContent: "center",
    marginTop: "-10%",
  },
  logotext: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 27,
    paddingVertical: 12,
  },
  form: {
    backgroundColor: "#5fcf80",
    width: "80%",
    height: "60%",
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
  },
  input: {
    backgroundColor: "white",
    width: "80%",
    borderBottomColor: "#ccc",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    paddingVertical: 12,
  },
  logo: {
    marginTop: "50%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    width: 200,
    alignItems: "center",
    padding: 12,
    paddingVertical: 15,
    marginTop: 20,
  },
  btncontainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btntext: {
    color: "#5fcf80",
    fontWeight: "bold",
    fontSize: 20,
  },
  snackbar: {
    backgroundColor: "orange",
    marginBottom: 20,
  },
});

export default LoginScreen;

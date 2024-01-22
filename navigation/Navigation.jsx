import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import WebView from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';
import LottieView from 'lottie-react-native';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//navigation stacks
import LoginScreen from '../screens/LoginScreen';
import BottomNavigation from './BottomNavigation';
import TeacherScreen from '../screens/TeacherScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MenuScreen from '../screens/MenuScreen';
import FeeDetailsScreen from '../screens/FeeDetailsScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ResulltScreen from '../screens/ResulltScreen';
import KidsCorner from '../screens/KidsCorner';
import LibraryScreen from '../screens/LibraryScreen';
import SubjectView from '../screens/SubjectView';
import RouteScreen from '../screens/RouteScreen';
import SchoolMap from '../screens/SchoolMap';


//stack screens

const Stack = createNativeStackNavigator();


const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    checkInternetConnection();

    // Show loader for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const checkInternetConnection = () => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="onboard" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BottomTab" component={BottomNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="teachers" component={TeacherScreen} options={{ headerShown:false,presentation: 'modal', }}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false,presentation:'modal' }} />
        <Stack.Screen name="Fee" component={FeeDetailsScreen} options={{ headerShown: false,presentation:'modal' }} />
        <Stack.Screen name="Calender" component={CalendarScreen} options={{ headerShown: false,presentation:'modal' }} />
        <Stack.Screen name="Results" component={ResulltScreen} options={{ headerShown: false,presentation:'modal' }} />
        <Stack.Screen name="Library" component={LibraryScreen} options={{ headerShown: false,presentation:'modal' }} />
        <Stack.Screen name="Kids" component={KidsCorner} options={{ headerShown: false,presentation:'modal' }} />
        <Stack.Screen name="Viewsubject" component={SubjectView} options={{ headerShown: true,presentation:'modal',title:"View Subject" }} />
        <Stack.Screen name="Map" component={RouteScreen} options={{ headerShown: false,presentation:'fullScreenModal',title:"Home Map" }} />
        <Stack.Screen name="SLocation" component={SchoolMap} options={{ headerShown: false,presentation:'fullScreenModal',title:"Home Map" }} />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerLeft: null, // Hide the back icon
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 200,
    height: 200,
  },
  connectionErrorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectionErrorText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Navigation;

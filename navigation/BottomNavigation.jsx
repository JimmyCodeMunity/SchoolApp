import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import LibraryScreen from '../screens/LibraryScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import NoticeScreen from '../screens/NoticeScreen';





const Tab = createBottomTabNavigator();


const BottomNavigation = ({route}) => {
  const {admission} = route.params;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'speedometer';
          } else if (route.name === 'Settings') {
            iconName = 'cog-outline';
          }

          else if (route.name === 'Library') {
            iconName = 'book-outline';
          }
          else if (route.name === 'Notices') {
            iconName = 'chat-outline';
          }
          else if (route.name === 'Profile') {
            iconName = 'account-outline';
          }

          return <Icon name={iconName} size={30} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#5fcf80', // Change the active tab color to your desired color
        inactiveTintColor: 'gray',
        showLabel:false,
        tabBarStyle:{
            position:'absolute',
            bottom:25,
            backgroundColor:'white'
        } // Change the inactive tab color to your desired color
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} initialParams={{ admission }} options={{ headerShown: false }} />
      <Tab.Screen name="Library" component={LibraryScreen} options={{ headerShown: true }} />
      <Tab.Screen name="Notices" component={NoticeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{ admission }} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

export default BottomNavigation

const style = StyleSheet.create({})
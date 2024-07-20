import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../Screens/HomeScreen';
import BasketScreen from '../Screens/BasketScreen';
import ProfileScreen from '../Screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Discover"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'home':  //icons
              iconName = 'home';
              break;
            case 'bag':
              iconName = 'shopping-bag'; // Changed icon to reflect courses/education
              break;
            case 'Community':
              iconName = 'group';
              break;
            case 'Profile':
              iconName = 'account-circle';
              break;
          }
          return <MaterialIcons name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: 'white',
          paddingTop: 5,
          height: 85,
        },
      })}
    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="bag" component={BasketScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

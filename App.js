import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import ContactScreen from './Screens/ContactScreen/ContactScreen';
import BasketScreen from './Screens/BasketScreen/BasketScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} options={{headerShown:false, presentation:'containedModal'}}/>
      <Stack.Screen name='Contact' component={ContactScreen} options={{headerShown:false, presentation:'containedModal', animation:'none'}}/>
      <Stack.Screen name='Basket' component={BasketScreen} options={{headerShown:false, presentation:'containedModal', animation:'none'}}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
});

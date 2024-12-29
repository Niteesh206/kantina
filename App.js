import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import SlotsScreen from './src/screens/SlotsScreen'; // Common Slots Page
import SlotCategoryScreen from './src/screens/SlotCategoryScreen'; // User Slot Details
import SlotOrdersScreen from './src/screens/SlotOrdersScreen'; // Admin Slot Management
import AdminScreen from './src/screens/AdminScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Slots" component={SlotsScreen} />
        <Stack.Screen name="SlotCategoryScreen" component={SlotCategoryScreen} />
        <Stack.Screen name="SlotOrders" component={SlotOrdersScreen} /> 
        <Stack.Screen name="Admin" component={AdminScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

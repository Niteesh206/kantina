// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CartProvider } from './src/context/CartContext'; // Import CartProvider

// Import screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import SlotsScreen from './src/screens/SlotsScreen';
import SlotCategoryScreen from './src/screens/SlotCategoryScreen';
import SlotOrdersScreen from './src/screens/SlotOrdersScreen';
import AdminScreen from './src/screens/AdminScreen';
import CartScreen from './src/screens/CartScreen';
import PaymentScreen from './src/screens/Payment'; // Import Payment screen
import SplashScreen from './src/screens/SplashScreen'; // Import Splash Screen
import OrderPlacedScreen from './src/screens/OrderPlacedScreen'; // Import OrderPlaced screen
import AdminLoginScreen from './src/screens/AdminLoginScreen'; // Import AdminLogin screen

// Create a stack navigator
const Stack = createStackNavigator();

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerStyle: { backgroundColor: '#6200ee' }, // Customize header
            headerTintColor: '#fff', // Header text color
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Login' }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: 'Register' }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Home' }}
          />
          <Stack.Screen
            name="Slots"
            component={SlotsScreen}
            options={{ title: 'Available Slots' }}
          />
          <Stack.Screen
            name="SlotCategoryScreen"
            component={SlotCategoryScreen}
            options={{ title: 'Slot Categories' }}
          />
          <Stack.Screen
            name="SlotOrders"
            component={SlotOrdersScreen}
            options={{ title: 'Slot Orders' }}
          />
          <Stack.Screen
            name="Admin"
            component={AdminScreen}
            options={{ title: 'Admin Dashboard' }}
          />
          <Stack.Screen
            name="CartScreen"
            component={CartScreen}
            options={{ title: 'Cart' }}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{ title: 'Payment' }}
          />
          <Stack.Screen
            name="OrderPlacedScreen"
            component={OrderPlacedScreen}
            options={{ title: 'Order Confirmation' }}
          />
          <Stack.Screen
            name="AdminLogin"
            component={AdminLoginScreen}
            options={{ title: 'Admin Login' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;

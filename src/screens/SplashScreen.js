// src/screens/SplashScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
import * as Splash from 'expo-splash-screen'; // Import expo-splash-screen package
import { useNavigation } from '@react-navigation/native'; // For navigation
import * as Animatable from 'react-native-animatable'; // For animation effects

// Prevent auto-hiding the splash screen until we're ready
Splash.preventAutoHideAsync();

const SplashScreen = () => {
  const [isReady, setIsReady] = useState(false);
  const navigation = useNavigation();

  // Set up the effect of the splash screen and handle navigation after some time
  useEffect(() => {
    const prepare = async () => {
      // Simulate loading resources (like fonts) or assets
      setTimeout(() => {
        setIsReady(true); // Once ready, show the Login buttons
        Splash.hideAsync(); // Hide the splash screen after resources are loaded
      }, 3000); // Show splash screen for 3 seconds
    };

    prepare();
  }, []);

  // Render the splash screen with app name
  if (!isReady) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Animatable.Text
          style={styles.appName}
          animation="fadeIn"
          duration={2000} // Fade-in effect for the app name
        >
          KANTINA
        </Animatable.Text>
      </View>
    );
  }

  // Once ready, show the login buttons
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>KANTINA</Text>
      <Button
        title="Customer Login"
        onPress={() => navigation.navigate('Login')} // Navigate to Login screen for customers
      />
      <Button
        title="Stall Owner Login"
        onPress={() => navigation.navigate('AdminLogin')} // Navigate to Stall Owner Login screen
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4CAF50', // You can change the color
    textAlign: 'center',
    marginBottom: 40, // Increased space between the app name and buttons
  },
});

export default SplashScreen;

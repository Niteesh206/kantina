// src/screens/AdminLoginScreen.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // For navigation

// Admin credentials
const adminCredentials = {
  meals: { email: 'lelloulsimon@gmail.com', password: 'admin1' },
  juices: { email: 'onlyssmb@gmail.com', password: 'admin2' },
  chatbahndar: { email: 'kancharlaniteeshreddy@gmail.com', password: 'admin3' },
};

const AdminLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // Handle login
  const handleLogin = () => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    console.log('Entered Email:', normalizedEmail);
    console.log('Entered Password:', normalizedPassword);

    const stall = Object.keys(adminCredentials).find((stall) => {
      console.log(
        'Checking against:',
        adminCredentials[stall].email,
        adminCredentials[stall].password
      );
      return (
        adminCredentials[stall].email.toLowerCase() === normalizedEmail &&
        adminCredentials[stall].password === normalizedPassword
      );
    });

    if (stall) {
      console.log(`Login successful for ${stall}`);
      navigation.navigate('Admin', { stall }); // Pass stall info if needed
    } else {
      console.log('Invalid credentials');
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none" // Disable auto-capitalization
        keyboardType="email-address" // Use email keyboard
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry // Hide password input
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
});

export default AdminLoginScreen;

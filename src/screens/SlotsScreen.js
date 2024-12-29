import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';

const SlotsScreen = ({ navigation }) => {
  const [slots, setSlots] = useState([]);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await api.get('/slots'); // Assuming you have a backend route to fetch slots
        console.log(response.data); // Check if data is received properly
        setSlots(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Unable to fetch slots');
      }
    };

    const fetchRole = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const { role } = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload to get the role
        setRole(role);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Unable to fetch role');
      }
    };

    fetchSlots();
    fetchRole();
  }, []);

  const handleSlotPress = (slot) => {
    if (role === 'admin') {
      navigation.navigate('SlotOrders', { slotId: slot._id }); // Admin page for managing orders
    } else {
      navigation.navigate('SlotCategoryScreen', { slotId: slot._id }); // User page for slot categories
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Available Slots</Text> */}
      {slots.map((slot) => (
        <TouchableOpacity
          key={slot._id}
          style={styles.slotButton}
          onPress={() => handleSlotPress(slot)}
        >
          <Text style={styles.title}>{slot.title}</Text>
          <Text style={styles.slotText}>{slot.time}</Text>
        </TouchableOpacity>
      ))}
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
    // paddingBottom: 20,
  },
  slotButton: {
    padding: 16,backgroundColor: '#FF7043', // A nice, vibrant orange

    borderRadius: 8,
    marginVertical: 8,
    // height: 80,  // Temporarily set a fixed height to ensure text fits
    width: '80%',
    alignItems: 'center',
    // justifyContent: 'center', // Ensure text is centered
    // flexDirection: 'row', // Optional, if you want to control alignment more
    elevation: 5, // Adding shadow for better visibility on Android
  },
  slotText: {
    color: '#fff', // Ensure text is white
    fontSize: 18,
    // textAlign: 'center', // Ensures the text is aligned properly within the button
  },
});


export default SlotsScreen;

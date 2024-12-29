import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import api from '../api/api';

const AdminScreen = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const navigation = useNavigation(); // Initialize the navigation object

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await api.get('/food');
        setFoodItems(response.data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoodItems();
  }, []);

  const addFoodItem = async () => {
    try {
      const response = await api.post('/food', { name, price });
      setFoodItems([...foodItems, response.data]);
      setName('');
      setPrice('');

      Alert.alert('Success', 'Food item added successfully!');
    } catch (error) {
      console.error('Error adding food item:', error);
      Alert.alert('Error', `Failed to add food item. Error: ${error.response?.data?.message || error.message}`);
    }
  };

  const navigateToSlotOrders = () => {
    navigation.navigate('Slots'); // Navigate to SlotsScreen
  };

  const renderFoodItem = ({ item }) => (
    <View style={styles.foodItem}>
      <Text>{item.name}</Text>
      <Text>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Food Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
      />
      <Button title="Add Food Item" onPress={addFoodItem} />
      
      {/* Navigation Button */}
      <Button title="Go to Slot Orders" onPress={navigateToSlotOrders} />

      {/* <FlatList
        data={foodItems}
        keyExtractor={(item) => item._id}
        renderItem={renderFoodItem}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  foodItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default AdminScreen;

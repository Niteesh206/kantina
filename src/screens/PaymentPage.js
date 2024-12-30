// src/screens/Payment.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useCart } from '../context/CartContext'; // Import the cart context
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Payment = ({ route }) => {
  const { cart, saveOrder, generateOrderId } = useCart(); // Use context to manage cart
  const [orderId, setOrderId] = useState('');
  const navigation = useNavigation(); // Navigation hook

  // Extract slotId safely from route.params
  const { slotId } = route.params || {}; // Default to an empty object if params are undefined

  if (!slotId) {
    Alert.alert('Error', 'Slot ID is missing!');
    return null;
  }

  // Function to handle payment
  const handlePayment = () => {
    if (cart.length === 0) {
      Alert.alert('Error', 'Your cart is empty!');
      return;
    }

    const newOrderId = generateOrderId(); // Generate unique order ID

    // Save the order to the context
    saveOrder(newOrderId, slotId, cart);

    // Navigate to "Order Placed" screen with order ID and details
    navigation.navigate('OrderPlacedScreen', {  // Corrected name to 'OrderPlacedScreen'
      orderId: newOrderId,
      items: cart,
      slotId,
    });

    // Simulate sending notification to the respective stalls
    sendNotificationToStalls(cart); // Call the function to send notifications
  };

  // Function to simulate sending notifications to the respective stalls
  const sendNotificationToStalls = (cart) => {
    cart.forEach((item) => {
      const stallId = item.stallId;
      // Simulate sending notification
      console.log(`Notification: Order for ${item.name} placed at ${stallId}`);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Screen</Text>
      <Text>Total items in cart: {cart.length}</Text>
      <Button title="Pay for" onPress={handlePayment} />
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
  },
});

export default Payment;

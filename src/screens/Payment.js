import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import { useCart } from '../context/CartContext';

const PaymentScreen = ({ navigation }) => {
  const { cart, saveOrder } = useCart();

  // Calculate total price from the cart
  const calculateTotalPrice = () => {
    let total = 0;
    Object.keys(cart).forEach((stallId) => {
      cart[stallId].forEach((item) => {
        total += item.price * item.quantity;
      });
    });
    return total;
  };

  // Generate UPI Payment URL
  const generateUPIURL = () => {
    const upiId = 'merchant@upi'; // Replace with your merchant UPI ID
    const name = 'Your Merchant Name';
    const totalAmount = calculateTotalPrice().toFixed(2); // Convert total to 2 decimal places
    const transactionRefId = `TXN${Date.now()}`;
    const url = `upi://pay?pa=${upiId}&pn=${name}&mc=&tid=${transactionRefId}&tr=${transactionRefId}&tn=Order%20Payment&am=${totalAmount}&cu=INR`;

    return url;
  };

  // Handle UPI Payment
  const handleUPIPayment = async () => {
    const url = generateUPIURL();

    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url)
        .then(() => {
          Alert.alert('UPI Payment', 'Please complete the payment in your UPI app.');
        })
        .catch((err) => {
          console.error('Error opening UPI app:', err);
          Alert.alert('Error', 'Failed to open UPI app. Proceeding with the order.');
        });
    } else {
      Alert.alert('Error', 'UPI payment apps are not available on your device. Proceeding with the order.');
    }
  };

  // Save order and navigate to OrderPlacedScreen
  const handleOrderPlacement = () => {
    const order = saveOrder(); // Save the order (returns an order object with orderId)
    navigation.navigate('OrderPlacedScreen', { orderId: order.orderId, cart });
  };

  // Handle Payment Flow
  const handlePaymentFlow = async () => {
    await handleUPIPayment(); // Attempt to open the UPI payment app
    handleOrderPlacement(); // Navigate to OrderPlacedScreen regardless of payment outcome
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment</Text>

      <Text style={styles.cartSummary}>
        Items in Cart: {Object.keys(cart).length}
      </Text>

      {/* Render cart items */}
      {Object.keys(cart).map((stallId) => (
        <View key={stallId}>
          <Text style={styles.stallTitle}>{stallId.toUpperCase()}</Text>
          {cart[stallId].map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Text>{item.title} - ₹{item.price} x {item.quantity}</Text>
            </View>
          ))}
        </View>
      ))}

      {/* Total Price */}
      <Text style={styles.totalPrice}>Total: ₹{calculateTotalPrice()}</Text>

      {/* Pay Button */}
      <TouchableOpacity style={styles.payButton} onPress={handlePaymentFlow}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>

      <Text style={styles.confirmation}>Your order is ready to be placed!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartSummary: {
    fontSize: 18,
    marginBottom: 10,
  },
  stallTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  cartItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  confirmation: {
    fontSize: 18,
    color: 'green',
    marginTop: 20,
  },
  payButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default PaymentScreen;

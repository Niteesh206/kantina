import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const OrderPlacedScreen = () => {
  const route = useRoute(); // Access route params
  const { orderId, cart } = route.params || {}; // Destructure cart and orderId

  // Check if parameters are missing and handle the case gracefully
  if (!orderId || !cart) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorMessage}>Error: Order details not found.</Text>
      </View>
    );
  }

  // Calculate total price
  const calculateTotal = () => {
    let total = 0;
    Object.keys(cart).forEach((key) => {
      cart[key].forEach((item) => {
        total += item.price * item.quantity;
      });
    });
    return total;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Placed Successfully!</Text>
      <View style={styles.orderIdContainer}>
        <Text style={styles.orderIdLabel}>Order ID:</Text>
        <Text style={styles.orderId}>{orderId}</Text>
      </View>

      <View style={styles.orderSummary}>
        {Object.keys(cart).map((key) => (
          <View key={key} style={styles.stallSection}>
            <Text style={styles.stallTitle}>{key.charAt(0).toUpperCase() + key.slice(1)}:</Text>
            {cart[key].map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDetails}>₹{item.price} x {item.quantity}</Text>
                <Text style={styles.slotId}>Slot ID: {item.stallId}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      <Text style={styles.total}>Total: ₹{calculateTotal()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  orderIdContainer: {
    marginBottom: 20,
    padding: 16,
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  orderIdLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#4CAF50',
  },
  orderId: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  orderSummary: {
    marginBottom: 20,
  },
  stallSection: {
    marginBottom: 10,
  },
  stallTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  itemTitle: {
    fontSize: 16,
  },
  itemDetails: {
    fontSize: 16,
    color: '#888',
  },
  slotId: {
    fontSize: 14,
    color: '#555',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default OrderPlacedScreen;

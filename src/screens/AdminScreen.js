// src/screens/AdminScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AdminScreen = ({ route }) => {
  const { orderId, slotId, items } = route.params || {}; // Get the order details from route params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Order Received</Text>
      <Text style={styles.text}>Order ID: {orderId}</Text>
      <Text style={styles.text}>Slot ID: {slotId}</Text>

      <Text style={styles.itemsTitle}>Items in the order:</Text>
      <ScrollView>
        {items && items.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.title} x{item.quantity}</Text>
            <Text style={styles.priceText}>Price: ${item.price}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
  itemsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    backgroundColor: '#f9f9f9',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 16,
    color: 'green',
  },
});

export default AdminScreen;

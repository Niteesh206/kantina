import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet } from 'react-native';
import api from '../api/api';

const SlotOrdersScreen = ({ route }) => {
  const { slotId } = route.params;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get(`/slot?slotId=${slotId}`); // Fetch orders for the selected slot
      setOrders(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch orders');
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}`, { status });
      fetchOrders(); // Refresh orders after updating status
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update order status');
    }
  };

  const renderOrder = ({ item }) => (
    <View style={styles.orderItem}>
      <Text>Order ID: {item._id}</Text>
      <Text>Status: {item.status}</Text>
      <Button title="Accept" onPress={() => updateOrderStatus(item._id, 'Accepted')} />
      <Button title="In Process" onPress={() => updateOrderStatus(item._id, 'In Process')} />
      <Button title="Ready" onPress={() => updateOrderStatus(item._id, 'Ready')} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Orders for Slot {slotId}</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={renderOrder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default SlotOrdersScreen;

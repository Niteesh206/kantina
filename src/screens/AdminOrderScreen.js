import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useCart } from '../context/CartContext';

const AdminOrdersScreen = () => {
  const { adminOrders } = useCart(); // Access shared admin orders

  const renderOrder = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderText}>Order ID: {item.orderId}</Text>
      <Text style={styles.orderText}>Slot: {getSlotDetails(item.slotId)}</Text>
      <Text style={styles.itemsTitle}>Items:</Text>
      {item.items.map((item, index) => (
        <Text key={index} style={styles.itemText}>
          {item.title} x{item.quantity} - ₹{item.price}
        </Text>
      ))}
      <Text style={styles.statusText}>Status: {item.status}</Text>
    </View>
  );

  const getSlotDetails = (slotId) => {
    switch (slotId) {
      case 1: return 'Morning Slot';
      case 2: return 'Afternoon Slot';
      case 3: return 'Evening Slot';
      default: return 'Unknown Slot';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Orders</Text>
      {adminOrders.length === 0 ? (
        <Text>No orders received yet.</Text>
      ) : (
        <FlatList
          data={adminOrders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.orderId}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  orderContainer: { padding: 10, borderBottomWidth: 1 },
  orderText: { fontSize: 18 },
  itemsTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  itemText: { fontSize: 16, marginVertical: 2 },
  statusText: { fontSize: 16, color: 'blue', marginTop: 10 },
});

export default AdminOrdersScreen;

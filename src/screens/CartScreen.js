// CartScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';

const CartScreen = () => {
  const { cart, decreaseQuantity, addToCart } = useCart();

  // Get the total number of items in the cart
  const cartCount = Object.keys(cart).reduce((acc, stallId) => {
    if (Array.isArray(cart[stallId])) {
      return acc + cart[stallId].reduce((sum, item) => sum + item.quantity, 0);
    }
    return acc;
  }, 0);

  // Render the item in the cart
  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardPrice}>₹{item.price}</Text>
        <Text style={styles.cardQuantity}>Quantity: {item.quantity}</Text>

        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => decreaseQuantity(item.id, item.stallId)}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => addToCart(item)}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>

      {/* Display items grouped by stall */}
      {Object.keys(cart).map((stallId) => (
        <View key={stallId} style={styles.stallContainer}>
          <Text style={styles.stallTitle}>{stallId.toUpperCase()}</Text>
          <FlatList
            data={cart[stallId]}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      ))}

      <View style={styles.cartSummary}>
        <Text style={styles.cartCount}>Items in Cart: {cartCount}</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => alert('Proceeding to payment')}
        >
          <Text style={styles.cartButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
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
  },
  stallContainer: {
    marginBottom: 20,
  },
  stallTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  cardPrice: {
    fontSize: 16,
    color: '#4CAF50',
  },
  cardQuantity: {
    fontSize: 14,
    color: '#555',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  cartSummary: {
    marginTop: 20,
    alignItems: 'center',
  },
  cartCount: {
    fontSize: 16,
    marginBottom: 10,
  },
  cartButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
  },
  cartButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default CartScreen;

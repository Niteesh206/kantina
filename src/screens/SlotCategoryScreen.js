import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const SlotCategoryScreen = () => {
  const { addToCart, decreaseQuantity, cart } = useCart();
  const navigation = useNavigation();
  const route = useRoute();
  const { slotId } = route.params; // Slot ID passed from previous screen

  const [selectedStall, setSelectedStall] = useState(null);

  const stalls = {
    meals: [
      { id: '1', title: 'Paneer Rice', price: 120, description: 'A delicious meal of spiced rice and paneer.', image: 'https://greenbowl2soul.com/wp-content/uploads/2022/09/Paneer-fried-rice.jpg', stallId: 'meals' },
      { id: '2', title: 'Curry', price: 50, description: 'Rich and flavorful vegetable curry.', image: 'https://via.placeholder.com/150', stallId: 'meals' },
    ],
    juices: [
      { id: '3', title: 'Mango Juice', price: 50, description: 'Refreshing mango juice.', image: 'https://via.placeholder.com/150', stallId: 'juices' },
      { id: '4', title: 'Orange Juice', price: 60, description: 'Freshly squeezed orange juice.', image: 'https://via.placeholder.com/150', stallId: 'juices' },
    ],
    chatBhandar: [
      { id: '5', title: 'French Fries', price: 80, description: 'Crispy and golden fries.', image: 'https://via.placeholder.com/150', stallId: 'chatBhandar' },
      { id: '6', title: 'Spring Rolls', price: 90, description: 'Crispy rolls filled with vegetables.', image: 'https://via.placeholder.com/150', stallId: 'chatBhandar' },
    ],
  };

  const renderItem = ({ item }) => {
    // Ensure that cart[item.stallId] is an array and find the correct item in the cart
    const cartItemsForStall = Array.isArray(cart[item.stallId]) ? cart[item.stallId] : [];
    const cartItem = cartItemsForStall.find((cartItem) => cartItem.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
          <Text style={styles.cardPrice}>₹{item.price}</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => decreaseQuantity(item.id, item.stallId)} // Pass the stallId
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => addToCart(item)} // Item already has stallId
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const handleStallSelect = (stall) => {
    setSelectedStall(stall === selectedStall ? null : stall);
  };

  const proceedToPayment = () => {
    const itemsByStall = Object.keys(cart).reduce((acc, stallId) => {
      acc[stallId] = cart[stallId]; // Get items grouped by stallId
      return acc;
    }, {});

    navigation.navigate('Payment', { slotId, items: itemsByStall });
  };

  // Calculate cart count
  let cartCount = 0;
  Object.keys(cart).forEach(stallId => {
    if (Array.isArray(cart[stallId])) {
      cart[stallId].forEach(item => {
        cartCount += item.quantity;
      });
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Slot: {slotId}</Text>

      {selectedStall === null && (
        <View style={styles.stallSelector}>
          {Object.keys(stalls).map((stall) => (
            <TouchableOpacity
              key={stall}
              style={[styles.stallButton, selectedStall === stall && styles.selectedStall]}
              onPress={() => handleStallSelect(stall)}
            >
              <Text style={styles.stallButtonText}>{stall.charAt(0).toUpperCase() + stall.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {selectedStall && (
        <FlatList
          data={stalls[selectedStall]}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {selectedStall && (
        <TouchableOpacity
          style={styles.switchStallButton}
          onPress={() => setSelectedStall(null)}
        >
          <Text style={styles.switchStallButtonText}>Switch Stall</Text>
        </TouchableOpacity>
      )}

      <View style={styles.cartSummary}>
        <Text style={styles.cartCount}>Items in Cart: {cartCount}</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={proceedToPayment}
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
  stallSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  stallButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
  },
  selectedStall: {
    backgroundColor: '#4CAF50',
  },
  stallButtonText: {
    fontSize: 16,
    color: '#000',
  },
  card: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  quantityContainer: {
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
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchStallButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  switchStallButtonText: {
    fontSize: 16,
    color: '#fff',
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

export default SlotCategoryScreen;

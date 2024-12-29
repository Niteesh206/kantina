import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

const SlotCategoryScreen = () => {
  const meals = [
    { id: '1', title: 'Paneer Rice', price: '₹120', image: 'https://greenbowl2soul.com/wp-content/uploads/2022/09/Paneer-fried-rice.jpg' },
    { id: '2', title: 'Curry', price: '₹50', image: 'https://www.acouplecooks.com/wp-content/uploads/2020/02/Vegetable-Curry-001.jpg' },
    { id: '3', title: 'Dal', price: '₹60', image: 'https://via.placeholder.com/150' },
    { id: '4', title: 'Veg Biryani', price: '₹150', image: 'https://via.placeholder.com/150' },
    { id: '5', title: 'Rice Dal Curry', price: '₹140', image: 'https://via.placeholder.com/150' },
    { id: '6', title: 'Vegetable Stew', price: '₹110', image: 'https://via.placeholder.com/150' },
  ];

  const fastFood = [
    { id: '1', title: 'Veg Burger', price: '₹80', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKTe2tepSNc7wRWNe6tzHSObX-gTW_n8bSRg&s' },
    { id: '2', title: 'Veg Pizza', price: '₹200', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlsp6Lb7ezlJQi8h79toD70SH2VlpoBud7ow&s' },
    { id: '3', title: 'Fries', price: '₹70', image: 'https://via.placeholder.com/150' },
    { id: '4', title: 'Veg Hotdog', price: '₹90', image: 'https://via.placeholder.com/150' },
    { id: '5', title: 'Taco', price: '₹100', image: 'https://via.placeholder.com/150' },
    { id: '6', title: 'Sandwich', price: '₹120', image: 'https://via.placeholder.com/150' },
  ];

  const juices = [
    { id: '1', title: 'Orange Juice', price: '₹50', image: 'https://as2.ftcdn.net/v2/jpg/05/83/02/45/1000_F_583024506_sM7z7MbwZm4p7hXgZet3rxFRbtmdNb2d.jpg' },
    { id: '2', title: 'Apple Juice', price: '₹60', image: 'https://r2.starryai.com/results/985911252/e22699c3-952a-4537-a82d-dc90002b0e4d.webp' },
    { id: '3', title: 'Mango Juice', price: '₹70', image: 'https://via.placeholder.com/150' },
    { id: '4', title: 'Pineapple Juice', price: '₹80', image: 'https://via.placeholder.com/150' },
    { id: '5', title: 'Grape Juice', price: '₹60', image: 'https://via.placeholder.com/150' },
    { id: '6', title: 'Watermelon Juice', price: '₹40', image: 'https://via.placeholder.com/150' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meals</Text>
      <FlatList
        data={meals}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        key="meals" // Unique key for this FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      <Text style={styles.header}>Fast Food</Text>
      <FlatList
        data={fastFood}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        key="fastfood" // Unique key for this FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      <Text style={styles.header}>Juices</Text>
      <FlatList
        data={juices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        key="juices" // Unique key for this FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
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
    marginBottom: 8,
    marginTop: 16,
  },
  listContainer: {
    paddingHorizontal: 8,
  },
  card: {
    width: 120,
    marginHorizontal: 8,
    padding: 16,
    backgroundColor: '#FFD700',
    borderRadius: 8,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardPrice: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
});

export default SlotCategoryScreen;

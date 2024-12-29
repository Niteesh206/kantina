import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../api/api'; // Assuming this points to your API configuration

const HomeScreen = ({ navigation }) => {
  const [featuredItem, setFeaturedItem] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured item (replace with your API endpoint)
        const featuredResponse = await api.get('/featured-item');
        setFeaturedItem(featuredResponse.data);

        // Fetch categories (replace with your API endpoint)
        const categoriesResponse = await api.get('/categories');
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error(error);
        // Handle errors appropriately, e.g., display an error message
      }
    };

    fetchData();
  }, []);

  const handleCategoryPress = (category) => {
    // Handle navigation to category details page (replace with your logic)
    navigation.navigate('CategoryDetails', { categoryId: category._id });
  };

  return (
    <View style={styles.container}>
      {featuredItem && (
        <View style={styles.featuredItem}>
          <Image source={{ uri: featuredItem.imageUrl }} style={styles.featuredImage} />
          <Text style={styles.featuredTitle}>{featuredItem.title}</Text>
          <Text style={styles.featuredDescription}>{featuredItem.description}</Text>
          <TouchableOpacity style={styles.featuredButton} onPress={() => navigation.navigate('Details', { itemId: featuredItem._id })}>
            <Text style={styles.featuredButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.categoryTitle}>Categories</Text>
      <View style={styles.categories}>
        {categories.map((category) => (
          <TouchableOpacity key={category._id} style={styles.categoryButton} onPress={() => handleCategoryPress(category)}>
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  featuredItem: {
    marginBottom: 24,
  },
  featuredImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featuredDescription: {
    fontSize: 16,
    marginBottom: 16,
  },
  featuredButton: {
    backgroundColor: '#FF7043', // Adjust background color as needed
    padding: 8,
    borderRadius: 8,
  },
  featuredButtonText: {
    color: '#fff', // Adjust text color as needed
    fontSize: 16,
    textAlign: 'center',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 8,
    width: '48%', // Adjust width based on desired layout
  },
  categoryText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
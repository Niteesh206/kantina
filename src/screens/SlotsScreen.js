// src/screens/SlotsScreen.js
import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SlotsScreen = () => {
  const navigation = useNavigation();

  // Example: List of slots (this could come from your API or state)
  const [slots, setSlots] = useState([
    { id: 'slot1', name: 'Slot 1' },
    { id: 'slot2', name: 'Slot 2' },
    { id: 'slot3', name: 'Slot 3' },
  ]);

  // Function to navigate to the SlotCategoryScreen with the selected slotId
  const handleSlotSelection = (slotId) => {
    navigation.navigate('SlotCategoryScreen', { slotId }); // Pass slotId to SlotCategoryScreen
  };

  const renderSlotItem = ({ item }) => (
    <View style={styles.slotItem}>
      <Text>{item.name}</Text>
      <Button
        title={`Select ${item.name}`}
        onPress={() => handleSlotSelection(item.id)} // Passing the slotId
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Slots</Text>
      <FlatList
        data={slots}
        keyExtractor={(item) => item.id}
        renderItem={renderSlotItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  slotItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
});

export default SlotsScreen;

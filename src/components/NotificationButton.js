// src/components/NotificationButton.js
import React from 'react';
import { Button, Text, View } from 'react-native'; // Import necessary components from react-native

// NotificationButton Component
const NotificationButton = ({ stallId, message }) => {

  // Handle button press event to trigger a notification
  const handlePress = () => {
    alert(`Notification: ${stallId} - ${message}`);
  };

  return (
    <View style={{ margin: 10 }}>
      {/* Use Button component with Text properly rendered */}
      <Button
        title="Send Notification"
        onPress={handlePress}
      />
    </View>
  );
};

export default NotificationButton;

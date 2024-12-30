// src/utils/notifications.js
import notificationMapping from '../config/notificationConfig';

// Function to send a notification
export const sendNotification = async (stallId, message) => {
  const credentials = notificationMapping[stallId];

  if (!credentials) {
    console.error('Invalid stall ID');
    alert('Invalid stall ID');
    return;
  }

  const { email, password } = credentials;

  try {
    // Simulate notification sending logic
    console.log(`Sending notification from ${email}`);
    console.log(`Message: ${message}`);
    alert(`Notification sent successfully from ${email}`);
  } catch (error) {
    console.error('Failed to send notification', error);
    alert('Failed to send notification');
  }
};

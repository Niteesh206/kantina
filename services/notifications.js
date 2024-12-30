import { Alert } from 'react-native';

export const sendNotification = async (email, password, stallId) => {
  try {
    const response = await fetch('http://localhost:5000/api/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, stallId }),
    });

    if (!response.ok) {
      throw new Error('Failed to send notification');
    }

    Alert.alert('Notification Sent', `Credentials sent to ${email}`);
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};

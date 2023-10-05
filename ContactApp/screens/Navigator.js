// Navigator.js

import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import ContactListScreen from './ContactListScreen';
import AddContactScreen from './AddContactScreen';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{
          headerShown: false,  // Oculta el header en todas las pantallas
        }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ContactList" component={ContactListScreen} />
      <Stack.Screen name="AddContactScreen" component={AddContactScreen} />

    </Stack.Navigator>
  );
};

export default Navigator;

// Importa las bibliotecas necesarias
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleRegister = async () => {
    // Validaciones básicas
    if (!username || !email || !password || !repeatPassword || !acceptTerms) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    if (password !== repeatPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    // Verificar si el usuario ya existe
    const existingUser = await AsyncStorage.getItem(username);
    if (existingUser) {
      Alert.alert('Error', 'El nombre de usuario ya está en uso. Por favor, elige otro.');
      return;
    }

    const newUser = {
        username,
        email,
        password,
        contacts: [], // Inicialmente, el usuario no tiene contactos
      };
    
      try {
        // Obtén la lista actual de usuarios desde AsyncStorage
        const existingUsers = await AsyncStorage.getItem('users');
        const users = existingUsers ? JSON.parse(existingUsers) : [];
    
        // Agrega el nuevo usuario a la lista
        users.push(newUser);
    
        // Almacena la lista actualizada de usuarios en AsyncStorage
        await AsyncStorage.setItem('users', JSON.stringify(users));
    
        // Navegar a la lista de contactos
        navigation.navigate('ContactList', { user: newUser });
      } catch (error) {
        console.error('Error al registrar usuario:', error);
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese nombre de usuario"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese email"
        keyboardType="email-address"  // Agregar esta línea
        onChangeText={(text) => setEmail(text)}
        />
      <TextInput
        style={styles.input}
        placeholder="Ingrese password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Repita el password"
        secureTextEntry
        onChangeText={(text) => setRepeatPassword(text)}
      />
      <TouchableOpacity style={styles.checkboxContainer} onPress={() => setAcceptTerms(!acceptTerms)}>
        <View style={styles.checkbox}>
          {acceptTerms && <Text style={styles.checkmark}>&#10003;</Text>}
        </View>
        <Text style={styles.checkboxText}>Acepto los términos y condiciones</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#3498db',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#3498db',
    fontSize: 14,
  },
  checkboxText: {
    fontSize: 14,
  },
});

export default RegisterScreen;
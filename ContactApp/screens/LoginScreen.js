import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Obtener los datos del usuario desde AsyncStorage usando el nombre de usuario o correo electrónico
      const userData = await AsyncStorage.getItem(usernameOrEmail);

      if (userData) {
        const user = JSON.parse(userData);

        // Verificar la contraseña
        if (user.password === password) {
          // Contraseña válida, navegar a la lista de contactos
          navigation.navigate('ContactList');
        } else {
          Alert.alert('Error', 'Contraseña incorrecta');
        }
      } else {
        Alert.alert('Error', 'Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const goToRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese email o nombre de usuario"
        onChangeText={text => setUsernameOrEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese contraseña"
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        <Text style={styles.registerLink}>¿No tienes cuenta? Regístrate</Text>
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
  registerText: {
    marginTop: 20,
    color: '#3498db',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
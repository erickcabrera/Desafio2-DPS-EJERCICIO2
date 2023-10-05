// AddContactScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddContactScreen = ({ navigation, route }) => {
  const { onContactAdded, user } = route.params;
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleAddContact = async () => {
    try {
      // Validaciones de entrada (puedes agregar más según tus requisitos)
      if (!name || !phoneNumber) {
        console.warn('Por favor, ingresa un nombre y número de teléfono');
        return;
      }

      const newContact = { name, lastName, phoneNumber };

      // Ejecuta la función proporcionada para manejar la adición de contacto
      if (onContactAdded) {
        // Llama a la función proporcionada en los parámetros
        onContactAdded(newContact);
      }

      // Regresa a la pantalla de lista de contactos
      navigation.navigate('ContactList');
    } catch (error) {
      console.error('Error al agregar contacto:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Contacto</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese nombre"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese apellido"
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese número de teléfono"
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddContact}>
        <Text style={styles.buttonText}>Agregar contacto</Text>
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
});

export default AddContactScreen;
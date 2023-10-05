// src/components/AddContactForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const AddContactForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <View>
      <Text>Ingrese nombre:</Text>
      <TextInput value={name} onChangeText={setName} />

      <Text>Ingrese apellido:</Text>
      <TextInput value={lastName} onChangeText={setLastName} />

      <Text>Ingrese número de teléfono:</Text>
      <TextInput value={phone} onChangeText={setPhone} />

      <TouchableOpacity onPress={() => onAddContact(name, lastName, phone)}>
        <Text>Agregar contacto</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddContactForm;
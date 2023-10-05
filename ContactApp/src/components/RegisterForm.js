// src/components/RegisterForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const RegisterForm = ({ onRegisterPress }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <View>
      <Text>Ingrese nombre de usuario:</Text>
      <TextInput value={username} onChangeText={setUsername} />

      <Text>Ingrese email:</Text>
      <TextInput value={email} onChangeText={setEmail} />

      <Text>Ingrese contraseña:</Text>
      <TextInput secureTextEntry value={password} onChangeText={setPassword} />

      <Text>Repita la contraseña:</Text>
      <TextInput secureTextEntry value={repeatPassword} onChangeText={setRepeatPassword} />

      <TouchableOpacity onPress={() => onRegisterPress(username, email, password, repeatPassword, acceptTerms)}>
        <Text>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setAcceptTerms(!acceptTerms)}>
        <Text>Acepto los términos y condiciones</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterForm;
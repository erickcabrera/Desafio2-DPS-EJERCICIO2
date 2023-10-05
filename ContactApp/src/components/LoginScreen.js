// src/components/LoginForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const LoginForm = ({ onLoginPress, onRegisterPress }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <Text>Ingrese email o nombre de usuario:</Text>
      <TextInput value={email} onChangeText={setEmail} />

      <Text>Ingrese contraseña:</Text>
      <TextInput secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity onPress={() => onLoginPress(email, password)}>
        <Text>Login</Text>
      </TouchableOpacity>

      <Text>¿No tienes cuenta?</Text>
      <TouchableOpacity onPress={onRegisterPress}>
        <Text>Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;
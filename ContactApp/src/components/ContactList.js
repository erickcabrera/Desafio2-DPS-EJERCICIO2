// src/components/ContactList.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <View>
      <Text>Contactos</Text>
      {contacts.length === 0 ? (
        <Text>No hay contactos registrados</Text>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.phone}</Text>
              <TouchableOpacity onPress={() => onDeleteContact(item.id)}>
                <Text>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ContactList;
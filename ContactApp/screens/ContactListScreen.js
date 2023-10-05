import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactListScreen = ({ navigation, route }) => {
  // Asegúrate de que route.params esté definido
  const { user } = route.params || {};
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Cargar contactos del usuario desde AsyncStorage
    const loadContacts = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem('users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        // Buscar el usuario actual en la lista de usuarios
        const currentUser = users.find((u) => u.username === user?.username);

        // Asegúrate de que currentUser y currentUser.contacts estén definidos
        if (currentUser && currentUser.contacts) {
          setContacts(currentUser.contacts);
        }
      } catch (error) {
        console.error('Error al cargar contactos:', error);
      }
    };

    loadContacts();
  }, [user?.username]); // Solo cargar contactos cuando el usuario cambia

  const handleAddContact = () => {
    // Navegar a la pantalla de agregar contacto
    navigation.navigate('AddContactScreen', { onContactAdded: handleContactAdded, user: user });
  };

  const handleContactAdded = async (newContact) => {
    try {
      // Actualizar contactos en el estado local
      const updatedContacts = [...contacts, newContact];
      setContacts(updatedContacts);
  
      // Actualizar contactos en AsyncStorage
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
  
      // Actualizar el usuario actual en la lista de usuarios
      const updatedUsers = users.map((u) =>
        u.username === user?.username ? { ...u, contacts: updatedContacts } : u
      );
  
      // Almacenar la lista actualizada de usuarios en AsyncStorage
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
    } catch (error) {
      console.error('Error al agregar contacto:', error);
    }
  };

  const handleDeleteContact = async (index) => {
    try {
      Alert.alert(
        'Confirmar eliminación',
        '¿Estás seguro de que quieres eliminar este contacto?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Eliminar',
            onPress: async () => {
              const updatedContacts = [...contacts];
              updatedContacts.splice(index, 1);
              setContacts(updatedContacts);
  
              const storedUsers = await AsyncStorage.getItem('users');
              const users = storedUsers ? JSON.parse(storedUsers) : [];
  
              if (user && user.username) {
                const updatedUsers = users.map((u) =>
                  u.username === user.username ? { ...u, contacts: updatedContacts } : u
                );
  
                await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error al eliminar contacto:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
      <Text style={styles.title}>Contactos</Text>
    </View>
      {contacts.length === 0 ? (
        <Text style={styles.noContactsText}>No hay contactos registrados</Text>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.contactItem}>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{item.name} {item.lastName}</Text>
                <Text style={styles.contactNumber}>{item.phoneNumber}</Text>
              </View>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteContact(index)}>
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20, // Ajusta este valor según sea necesario
  },
  titleContainer: {
    backgroundColor: '#3498db', // Color azul más oscuro
    paddingTop: 30,
    height: 100, // Ajustar la altura según sea necesario
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderBottomLeftRadius: 15, // Bordes inferiores redondeados
    borderBottomRightRadius: 15, // Bordes inferiores redondeados
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  noContactsText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderColor: '#3498db',
    borderBottomWidth: 1,
    padding: 10,
  },
  contactInfo: {
    flex: 1,
    marginRight: 10,
  },
  contactName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  contactNumber: {
    color: 'gray',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#3498db',
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ContactListScreen;
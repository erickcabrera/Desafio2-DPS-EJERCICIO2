// auth.js

import * as firebase from 'firebase';

// Configura tu objeto de configuración de Firebase aquí

// Inicializa Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Tu configuración de Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyBLI3T8ROICcAA7cek7B6S20T1iPaIwf2A",
  authDomain: "vedrunaapp-68586.firebaseapp.com",
  projectId: "vedrunaapp-68586",
  storageBucket: "vedrunaapp-68586.firebasestorage.app",
  messagingSenderId: "1027208489636",
  appId: "1:1027208489636:web:db53b00973f4b88d9d5431",
  measurementId: "G-4254S7Q565"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Configura y exporta el servicio de autenticación
const auth = getAuth(app);

export { app, auth };

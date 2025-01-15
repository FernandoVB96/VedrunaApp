import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../firebase-config';

export function RegisterScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Cuenta creada');
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.log('Error al crear cuenta:', error);
        Alert.alert('Error', 'No se pudo crear la cuenta. Verifica los datos.');
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imagePlaceholder}>
          <Image
            source={require('../img/formulario 1.png')}
            style={styles.image}
          />
        </View>

        <Text style={styles.title}>Completar los siguientes campos:</Text>

        <TextInput
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          placeholder="Introduzca su correo"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          placeholder="Introduzca su contraseña"
          placeholderTextColor="#ccc"
          secureTextEntry={true}
        />
        <TextInput
          onChangeText={(text) => setConfirmPassword(text)}
          style={styles.input}
          placeholder="Repita su contraseña"
          placeholderTextColor="#ccc"
          secureTextEntry={true}
        />
        <TextInput style={styles.input} placeholder="Introduzca su nick" placeholderTextColor="#ccc" />
        <TextInput style={styles.input} placeholder="Introduzca su nombre" placeholderTextColor="#ccc" />
        <TextInput style={styles.input} placeholder="Introduzca su primer apellido" placeholderTextColor="#ccc" />
        <TextInput style={styles.input} placeholder="Introduzca su segundo apellido" placeholderTextColor="#ccc" />

        <TouchableOpacity
          style={styles.button}
          onPress={handleCreateAccount}
        >
          <Text style={styles.buttonText}>FINALIZAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  imagePlaceholder: {
    height: 400,
    width: '100%',
    marginBottom: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  title: {
    color: '#a1e45a',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
    width: '100%',
  },
  input: {
    color: '#fff',
    width: '100%',
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#a1e45a',
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#DFDFDF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

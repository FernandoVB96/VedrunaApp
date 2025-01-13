import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

export default function RegisterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imagePlaceholder}>
          {/* Aquí se coloca la imagen */}
          <Image
            source={require('../img/formulario 1.png')} // Ajusta la ruta según la ubicación de tu imagen
            style={styles.image}
          />
        </View>

        <Text style={styles.title}>Completar los siguientes campos:</Text>

        <TextInput style={styles.input} placeholder="Introduzca su nick" placeholderTextColor="#ccc" />
        <TextInput style={styles.input} placeholder="Introduzca su nombre" placeholderTextColor="#ccc" />
        <TextInput style={styles.input} placeholder="Introduzca su primer apellido" placeholderTextColor="#ccc" />
        <TextInput style={styles.input} placeholder="Introduzca su segundo apellido" placeholderTextColor="#ccc" />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')} // Redirige a la pantalla de Login al finalizar
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
    backgroundColor: '#1a1a1a', // Fondo oscuro
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1, // Permite que el contenido se expanda para llenar la pantalla
    justifyContent: 'flex-start', // Hace que los elementos se alineen desde la parte superior
  },
  imagePlaceholder: {
    height: 400, // Aumenta la altura del contenedor de la imagen
    width: '100%',
    marginBottom: 20,
    justifyContent: 'flex-start', // Asegura que la imagen se pegue a la parte superior
    alignItems: 'center',
  },
  image: {
    width: 350, // Tamaño más grande de la imagen
    height: 350, // Tamaño más grande de la imagen
    resizeMode: 'contain', // Para que la imagen mantenga sus proporciones
  },
  title: {
    color: '#a1e45a', // Verde como en la imagen
    fontSize: 20, // Fuente ligeramente más pequeña
    fontWeight: 'bold', // Hacemos el texto en negrita
    marginBottom: 20,
    textAlign: 'left', // Alineación a la izquierda
    width: '100%', // Ocupa todo el ancho disponible
  },
  input: {
    backgroundColor: '#1a1a1a', // Fondo oscuro
    color: '#fff',
    width: '100%',
    padding: 15,
    marginBottom: 75, // Añadido espacio de 2 cm (aproximadamente 75 píxeles)
    fontSize: 16,
    borderBottomWidth: 1, // Línea en la parte inferior del campo
    borderBottomColor: '#555', // Color de la línea inferior
  },
  button: {
    backgroundColor: 'transparent', // Fondo transparente para que se vea el fondo de la pantalla
    paddingVertical: 8, // Ajusta el tamaño vertical del botón
    paddingHorizontal: 30, // Ajusta el tamaño horizontal del botón, más pequeño
    borderRadius: 10, // Radio de 10
    alignItems: 'center',
    borderWidth: 1, // Borde verde alrededor del botón
    borderColor: '#a1e45a', // Color verde del borde
    marginTop: 20, // Separación entre el formulario y el botón
    width: 'auto', // El botón solo ocupa el espacio necesario
  },
  buttonText: {
    color: '#a1e45a', // Color de texto verde
    fontSize: 16,
    fontWeight: 'bold',
  },
});

import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Text } from 'react-native';

export default function RegisterScreen() {
  const [showMessage, setShowMessage] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showWelcomeText, setShowWelcomeText] = useState(true);

  const handleAddPress = () => {
    setShowMessage(true);
    setShowSettings(false);
    setShowWelcomeText(false);
  };

  const handleSettingsPress = () => {
    setShowSettings(true);
    setShowMessage(false);
    setShowWelcomeText(false);
  };

  const handleHomePress = () => {
    setShowMessage(false);
    setShowSettings(false);
    setShowWelcomeText(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} scrollEnabled={false}>
        <View style={styles.imagePlaceholder}>
          <Image
            source={require('../img/cabecera_logo_home.png')}
            style={styles.image}
          />
        </View>

        {/* Mostrar texto de bienvenida solo si showWelcomeText es true */}
        {showWelcomeText && (
          <Text style={styles.welcomeText}>¡Bienvenido al Home!</Text>
        )}

        {/* Mostrar mensaje cuando se presiona ADD */}
        {showMessage && (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>ADD</Text>
          </View>
        )}

        {/* Mostrar menú de ajustes cuando se presiona AJUSTES */}
        {showSettings && (
          <View style={styles.settingsMenu}>
            <Text style={styles.settingsText}>Ajustes</Text>
          </View>
        )}
      </ScrollView>

      {/* Footer con imágenes */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={handleHomePress}>
          <Image
            source={require('../img/home.png')}
            style={styles.footerImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleAddPress}>
          <Image
            source={require('../img/add.png')}
            style={styles.footerImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleSettingsPress}>
          <Image
            source={require('../img/ajustes.png')}
            style={styles.footerImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 0,
    paddingTop: 0,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: 20,
  },
  imagePlaceholder: {
    height: 350,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: -114,
    paddingTop: 0,
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  welcomeText: {
    color: '#ffffff',
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 60,
    backgroundColor: '#333',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
  },
  footerButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  footerImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  messageContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#333',
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  messageText: {
    color: '#fff',
    fontSize: 18,
  },
  settingsMenu: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#333',
    borderRadius: 10,
    width: '90%',
  },
  settingsText: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
  },
  settingsOption: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 5,
  },
});

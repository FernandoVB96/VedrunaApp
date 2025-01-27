import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth } from '../../firebase-config';

export function HomeScreen() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userNicknames, setUserNicknames] = useState({});
  const userId = auth.currentUser.uid;

  const fetchUserNicknames = async (userIds) => {
    try {
      const response = await fetch('http://172.26.1.201:8080/proyecto01/users/name');
      const usersData = await response.json();

      const userNicknameMap = {};
      usersData.forEach(user => {
        if (userIds.includes(user.user_id)) {
          userNicknameMap[user.user_id] = user.nick;
        }
      });

      setUserNicknames(userNicknameMap);
    } catch (error) {
      console.error('Error al obtener los nicknames de los usuarios:', error);
    }
  };

  const fetchPublicaciones = async () => {
    try {
      const url = 'http://172.26.1.201:8080/proyecto01/publicaciones';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener publicaciones');
      }

      const data = await response.json();

      const publicacionesConLikes = data.map(pub => ({
        ...pub,
        likes: pub.like ? pub.like.length : 0,
      }));

      setPublicaciones(publicacionesConLikes);

      const userIds = [...new Set(data.map((pub) => pub.user_id))];
      fetchUserNicknames(userIds);
    } catch (error) {
      console.error('Error al obtener publicaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id) => {
    try {
      const pubIndex = publicaciones.findIndex(pub => pub.id === id);
      const updatedPublicaciones = [...publicaciones];

      const currentLikes = updatedPublicaciones[pubIndex].like || [];
      if (currentLikes.includes(userId)) {
        updatedPublicaciones[pubIndex].like = currentLikes.filter(user => user !== userId);
      } else {
        updatedPublicaciones[pubIndex].like = [...currentLikes, userId];
      }

      updatedPublicaciones[pubIndex].likes = updatedPublicaciones[pubIndex].like.length;

      setPublicaciones(updatedPublicaciones);

      const url = `http://172.26.1.201:8080/proyecto01/publicaciones/put/${id}/${userId}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          like: updatedPublicaciones[pubIndex].like,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el like');
      }
    } catch (error) {
      console.error('Error al actualizar el like:', error);
    }
  };

  useEffect(() => {
    fetchPublicaciones();

    const intervalId = setInterval(fetchPublicaciones, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <FlatList
          contentContainerStyle={styles.imageContainer}
          data={publicaciones}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const currentLikes = item.like || [];
            return (
              <View style={styles.card}>
                <Text style={styles.userId}>
                  Publicado por{' '}
                  <Text style={styles.nickname}>
                    {userNicknames[item.user_id] || 'Cargando...'}
                  </Text>
                </Text>
                <Text style={styles.title}>{item.titulo}</Text>
                {item.image_url && (
                  <Image
                    source={{ uri: item.image_url }}
                    style={styles.image}
                    onError={(e) => console.log('Error al cargar la imagen:', e.nativeEvent.error)}
                  />
                )}
                <Text style={styles.description}>{item.comentario}</Text>
                <View style={styles.likeContainer}>
                  <TouchableOpacity onPress={() => handleLike(item.id)}>
                    <Icon
                      name={currentLikes.includes(userId) ? 'heart' : 'heart-o'}
                      size={30}
                      color={
                        currentLikes.includes(userId)
                          ? item.user_id === userId
                            ? '#b3ff00'
                            : '#ffffff'
                          : '#ffffff'
                      }
                    />
                  </TouchableOpacity>
                  <Text style={styles.likeCount}>{item.likes || 0} Me gusta</Text>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#23272A',
    paddingTop: 30,
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  card: {
    marginBottom: 15,
    alignItems: 'center',
  },
  userId: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 5,
  },
  nickname: {
    fontWeight: 'bold',
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 400,
    height: 200,
    marginBottom: 10,
  },
  description: {
    color: '#cccccc',
    fontSize: 14,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  likeCount: {
    color: '#ffffff',
    marginLeft: 10,
    fontSize: 14,
  },
});

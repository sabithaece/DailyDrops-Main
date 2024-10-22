import React from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleScreenPress = () => {
    navigation.navigate('Phone Number Verification');
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
      <View style={styles.container}>
        <Image
          source={require('./images/Welcome Page.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Welcome Back to</Text>
        <Text style={styles.Drop}>Daily Drop</Text>
        <Image
          source={require('./images/arrow.jpg')}
          style={styles.im}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    top: -20,
  },
  Drop: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green',
  },
  im: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default WelcomeScreen;

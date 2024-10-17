import React, { useState } from 'react';
import { View, Text, Keyboard, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyBv5qP0vdJ4PR5Qvj9LjYv5SE0GWrhg-50');

const DeliveryAddress = () => {
  const navigation = useNavigation();
  const onSubmit = () => {
    navigation.navigate('Intro');
  };
  const [region, setRegion] = useState({
    latitude: 13.0827,
    longitude: 80.2707,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [marker, setMarker] = useState({
    latitude: 13.0827,
    longitude: 80.2707,
  });
  const [address, setAddress] = useState({
    apartment: '',
    street: '',
    city: '',
    postalCode: '',
    landmark: '',
  });

  const handleMapPress = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    setMarker({
      latitude,
      longitude,
    });

    try {
      const result = await Geocoder.from(latitude, longitude);
      const addressComponents = result.results[0].address_components;

      let street = '';
      let city = '';
      let postalCode = '';

      addressComponents.forEach(component => {
        if (component.types.includes('route')) {
          street = component.long_name;
        }
        if (component.types.includes('locality')) {
          city = component.long_name;
        }
        if (component.types.includes('postal_code')) {
          postalCode = component.long_name;
        }
      });

      setAddress({
        ...address,
        street: street || '',
        city: city || '',
        postalCode: postalCode || '',
        landmark: '',
      });

      setRegion({
        ...region,
        latitude,
        longitude,
      });
    } catch (error) {
      console.error(error);
      alert('Could not fetch address. Please try again.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
          {/* MapView positioned at the top */}
          <MapView
            style={styles.map}
            region={region}
            onPress={handleMapPress}
          >
            <Marker coordinate={marker} />
          </MapView>

          <Text style={styles.title}>Where Should We Deliver?</Text>
          <Text style={styles.title2}>Enter your address</Text>

          <TextInput
            style={styles.input}
            placeholder="Apartment"
            value={address.apartment}
            onChangeText={(text) => setAddress((prev) => ({ ...prev, apartment: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Street"
            value={address.street}
            onChangeText={(text) => setAddress((prev) => ({ ...prev, street: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={address.city}
            onChangeText={(text) => setAddress((prev) => ({ ...prev, city: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Postal Code"
            value={address.postalCode}
            onChangeText={(text) => setAddress((prev) => ({ ...prev, postalCode: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Landmark"
            value={address.landmark}
            onChangeText={(text) => setAddress((prev) => ({ ...prev, landmark: text }))}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={onSubmit}
            >
              <Text style={styles.buttonText}>Find Location</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'flex-start', // Adjust to top-align content
    paddingHorizontal: 20,
    paddingBottom: 60,  // Extra padding for the button visibility
  },
  map: {
    width: '100%',
    height: 300, // Adjust height if needed
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  title2: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
    paddingLeft: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightgreen',
    borderColor: 'darkgreen',
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
    top:-30
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeliveryAddress;

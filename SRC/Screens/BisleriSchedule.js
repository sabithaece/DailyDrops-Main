import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Schedule = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.productContainer}>
        <Image
          style={styles.productImage}
          source={require('./images/bisleriCan.jpg')}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>Bisleri Water Can </Text>
          <Text style={styles.productSize}>25 L</Text>
          <Text style={styles.productPrice}>₹50</Text>
          <Text style={styles.productTax}>(Inclusive of all taxes)</Text>
          <Text style={styles.subscribeNow}>Subscribe now!</Text>
        </View>
      </View>
      <Text style={styles.subscriptionNote}>
        *Price of products on subscription may change as per market changes
      </Text>
      <Text style={styles.planText}>Select your plan type</Text>
      <View style={styles.planContainer}>
        <TouchableOpacity style={styles.planButton} onPress={() => navigation.navigate('Daily')}>
          <Text style={styles.planButtonText}>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.planButton} onPress={() => navigation.navigate('Weekly')}>
          <Text style={styles.planButtonText}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.planButton} onPress={() => navigation.navigate('Monthly')}>
          <Text style={styles.planButtonText}>Monthly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.planButton} onPress={() => navigation.navigate('AlternateDays')}>
          <Text style={styles.planButtonText}>Alternate days</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backArrow: {
    fontSize: 24,
    color: '#000',
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productSize: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  productTax: {
    fontSize: 14,
    color: '#666',
  },
  subscribeNow: {
    fontSize: 16,
    color: '#FF8800',
    marginTop: 5,
  },
  subscriptionNote: {
    fontSize: 12,
    color: '#FF8800',
    marginVertical: 15,
    textAlign: 'center',
  },
  planText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  planContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  planButton: {
    backgroundColor: '#E0F0FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  planButtonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default Schedule;

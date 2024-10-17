import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment'; 
import { Alert } from 'react-native';

const DailyPage = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleConfirm = () => {
    if (!selectedDate) {
      Alert.alert(
        'Select a Date',
        'Please select a start date before confirming.',
        [{ text: 'OK' }]
      );
    } else {
      navigation.navigate('SubscriptionStartScreen');
    }
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString); 
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const today = moment().format('YYYY-MM-DD'); 


  const generateMarkedDates = () => {
    let markedDates = {};
    if (selectedDate) {
      markedDates[selectedDate] = {
        selected: true,
        selectedColor: '#004AAD',
      };

      const selectedMoment = moment(selectedDate);
      for (let i = 1; i <= 30; i++) {
        const nextDate = selectedMoment.clone().add(i, 'days').format('YYYY-MM-DD');
        markedDates[nextDate] = {
          marked: true,
          dotColor: '#004AAD', 
        };
      }
    }
    return markedDates;
  };

  return (
    <View style={styles.container}>
      <View style={styles.productDetails}>
        <Text style={styles.productName}>Heritage Special Toned Milk Pouch</Text>
        <Text>500 ml</Text>
      </View>
      <Text style={styles.sectionTitle}>Select start date</Text>
      <Calendar
        current={selectedDate || today} 
        minDate={today} 
        onDayPress={handleDayPress}
        markedDates={generateMarkedDates()} 
        theme={{
          selectedDayBackgroundColor: '#004AAD',
          todayTextColor: '#004AAD',
          arrowColor: '#004AAD',
          dayTextColor: '#000',
          textDisabledColor: '#d9e1e8',
        }}
      />
      {selectedDate && (
        <View style={styles.quantityContainer}>
          <Text style={styles.sectionTitle}>Select quantity</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  productDetails: {
    alignItems: 'center',
    marginBottom: 20,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  quantityContainer: {
    marginTop: 20,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    backgroundColor: '#E0F0FF',
    padding: 10,
    borderRadius: 10,
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#004AAD',
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 20,
  },
  confirmButton: {
    backgroundColor: '#004AAD',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DailyPage;

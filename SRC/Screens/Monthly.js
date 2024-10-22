import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { Alert } from 'react-native';

const MonthlyPage = ({ navigation }) => {
  const [selectedDates, setSelectedDates] = useState({});
  const [quantities, setQuantities] = useState({});
  const currentMonth = moment().format('YYYY-MM');
  const minDate = moment().startOf('month').format('YYYY-MM-DD');
  const maxDate = moment().endOf('month').format('YYYY-MM-DD');
  const handleDayPress = (day) => {
    const date = day.dateString;
    setSelectedDates((prev) => {
      const newDates = { ...prev };
      if (newDates[date]) {
        delete newDates[date];
        delete quantities[date];
      } else {
        newDates[date] = { selected: true, selectedColor: '#004AAD' };
        quantities[date] = 1;
      }
      return newDates;
    });
  };
  const handleConfirm = () => {
    if (Object.keys(selectedDates).length === 0)  {
      Alert.alert(
        'Select a Date',
        'Please select a start date before confirming.',
        [{ text: 'OK' }]
      );
    } else {
      navigation.navigate('SubscriptionStartScreen');
    }
  }; 
  
  const updateQuantity = (date, increment) => {
    setQuantities((prev) => {
      const newQuantities = { ...prev };
      if (increment) {
        newQuantities[date]++;
      } else {
        newQuantities[date] = Math.max(1, newQuantities[date] - 1);
      }
      return newQuantities;
    });
  };
  const generateMarkedDates = () => selectedDates;
  return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}> 
      <Text style={styles.header}>Select date(s) for monthly delivery</Text>
      
      <Calendar
        onDayPress={handleDayPress}
        markedDates={generateMarkedDates()}
        minDate={minDate} 
        maxDate={maxDate} 
        disableArrowLeft={true} 
        disableArrowRight={true} 
        hideDayNames={true} 
        hideExtraDays={true} 
        theme={{
          textMonthFontSize: 0, 
          selectedDayBackgroundColor: '#004AAD',
          todayTextColor: '#004AAD',
          arrowColor: '#004AAD',
        }}
      />

      {Object.keys(selectedDates).length > 0 && (
        <View style={styles.quantityContainer}>
          <Text style={styles.sectionTitle}>Select quantity</Text>
          <FlatList
            data={Object.keys(selectedDates)}
            keyExtractor={(item) => item}
            renderItem={({ item: date }) => (
              <View style={styles.dateQuantityRow}>
                <Text style={styles.dateText}>{moment(date).format('Do')} of every month</Text>
                <View style={styles.quantitySelector}>
                  <TouchableOpacity
                    onPress={() => updateQuantity(date, false)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{quantities[date]}</Text>
                  <TouchableOpacity
                    onPress={() => updateQuantity(date, true)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      )}
          
      
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </ScrollView> 
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff' 
},
  header: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 10 
},
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginVertical: 10 
},
  quantityContainer: { 
    marginTop: 20 
},
  dateQuantityRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginVertical: 5
 },
  dateText: { 
    fontSize: 16, 
    color: '#333' 
},
  quantitySelector: { 
    flexDirection: 'row', 
    alignItems: 'center'
},
  quantityButton: { 
    backgroundColor: '#E0F0FF', 
    padding: 10, borderRadius: 10
},
  quantityButtonText: { 
    fontSize: 18, 
    color: '#004AAD' 
},
  quantity: { fontSize: 18,
    marginHorizontal: 20 
},
  confirmButton: {
    backgroundColor: '#004AAD', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 30 ,
    paddingtop:20
},
  confirmButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold'
},
});

export default MonthlyPage;

import React, { useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const image1 = require('./images/pg1.png'); 
const image2 = require('./images/pg2.png'); 
const image3 = require('./images/pg3.png'); 
const image4 = require('./images/pg4.png'); 

const SlideShow = () => {
  const { width } = Dimensions.get('window');
  const slides = [
    {
      id: '1',
      title: 'Your Essentials, Just a Tap Away',
      description: 'Water, milk, groceries—delivered to your door with a smile.',
      image: image1, 
    },
    {
      id: '2',
      title: 'Freshness in Every Drop',
      description: 'Get top-quality products straight from the source to your doorstep.',
      image: image2, 
    },
    {
      id: '3',
      title: 'Set It and Forget It',
      description: 'Customize your delivery schedule, stay stocked effortlessly.',
      image: image3,
    },
    {
      id: '4',
      title: 'Total Control, Zero Hassle',
      description: 'Easily track and adjust your deliveries in one app.',
      image: image4, 
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation();  // Hook for navigation

  const goToNextSlide = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current.scrollToIndex({ index: nextIndex });
      setCurrentIndex(nextIndex);
    } else {
      // If it's the last slide, navigate to HomeScreen
      navigation.navigate('HomeScreen');
    }
  };

  const goToPreviousSlide = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      flatListRef.current.scrollToIndex({ index: prevIndex });
      setCurrentIndex(prevIndex);
    }
  };

  const handleScrollEnd = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentIndex ? '#000' : '#ddd' },
            ]}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.leftTouchable}
        onPress={goToPreviousSlide}
      />
      
      <TouchableOpacity
        style={styles.rightTouchable}
        onPress={goToNextSlide}
      />

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: Dimensions.get('window').width, 
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover', 
    marginBottom: 20, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    top: -290,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    position: 'absolute', 
    top: 20,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  leftTouchable: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '50%',
    zIndex: 10,
  },
  rightTouchable: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '50%',
    zIndex: 10,
  },
});

export default SlideShow;

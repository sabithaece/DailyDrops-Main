import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const ProductScreen = ({ navigation }) => {
  const [starRating, setStarRating] = useState(0); 
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isDescriptionCollapsed, setIsDescriptionCollapsed] = useState(true);
  const [isShelfLifeCollapsed, setIsShelfLifeCollapsed] = useState(true);
  const [isCertification, setIsCertification] = useState(true);
  const [isReview, setIsReview] = useState(true);
  const onSubmit = () => {
    navigation.navigate('BisleriSchedule');
  };

  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
        <Swiper showsButtons={true} autoplay={true} autoplayTimeout={3} style={styles.wrapper}>
          <Image source={require('./images/bisleriCan.jpg')} style={styles.si} />
          <Image source={require('./images/fssai.jpeg')} style={styles.slideImage} />
          <Image source={require('./images/bar.jpeg')} style={styles.slideImage} />
        </Swiper>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>Bisleri Water Can </Text>
          <Text style={styles.productQuantity}>25 L</Text>
          <Text style={styles.productPrice}>₹50</Text>
          <Text style={styles.subscribeText}>Subscribe now!</Text>
        </View>
        <TouchableOpacity
          onPress={() => setIsDescriptionCollapsed(!isDescriptionCollapsed)}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleButtonText}>Product Description</Text>
        </TouchableOpacity>
        <Collapsible collapsed={isDescriptionCollapsed}>
          <Text style={styles.descriptionText}>
          At Bisleri, our commitment to quality and purity in every drop of water stands us apart. 
          Bisleri Mineral Water is not just an ordinary bottle of water. Each drop of Bisleri water 
          is a promise of goodness that goes through rigorous 10 STEP QUALITY PROCESS and 90 TESTS.
          </Text>
        </Collapsible>
        <TouchableOpacity
          onPress={() => setIsShelfLifeCollapsed(!isShelfLifeCollapsed)}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleButtonText}>Shelf Life</Text>
        </TouchableOpacity>
        <Collapsible collapsed={isShelfLifeCollapsed}>
          <Text style={styles.descriptionText}>
            The shelf life of the Water Can  is 45 days.
          </Text>
        </Collapsible>
        <TouchableOpacity
          onPress={() => setIsCertification(!isCertification)}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleButtonText}>Certifications</Text>
        </TouchableOpacity>
        <Collapsible collapsed={isCertification}>
          <Text style={styles.descriptionText}>
            This product is certified by FSSAI.
          </Text>
        </Collapsible>
        <TouchableOpacity
          onPress={() => setIsReview(!isReview)}
          style={styles.toggleButton}
        >
          <Text style={styles.reviewText}>Review</Text>
        </TouchableOpacity>
        <Collapsible collapsed={isReview}>
          <View style={styles.starContainer}>

            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setStarRating(star)}
                onMouseEnter={() => setHoveredStar(star)} 
                onMouseLeave={() => setHoveredStar(0)} 
                style={styles.starTouchable}
              >
                <Icon
                  name="star"
                  size={30}
                  color={star <= (hoveredStar || starRating) ? '#FFD700' : '#D3D3D3'} 
                />
              </TouchableOpacity>
            ))}
            <Text style={styles.selectedRating}>{starRating}</Text>
          </View>
        </Collapsible>
      </ScrollView>
      <TouchableOpacity style={styles.subscribeButton} onPress={onSubmit}>
        <Text style={styles.subscribeButtonText} >Subscribe Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  swiperContainer: {
    height: 350,
    width: '100%',
  },
  slideImage: {
    height: '100%',
    width: '100%',
  },
  scrollView: {
    flex: 1,
  },
  productInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productQuantity: {
    fontSize: 16,
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 18,
    color: '#008000',
    marginVertical: 5,
  },
  subscribeText: {
    fontSize: 14,
    color: '#ff8c00',
  },
  toggleButton: {
    padding: 15,
    backgroundColor: '#ffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionText: {
    padding: 15,
    fontSize: 14,
    lineHeight: 20,
  },
  subscribeButton: {
    backgroundColor: '#0080ff', 
    paddingVertical: 10,        
    paddingHorizontal: 20,       
    justifyContent: 'center',   
    alignItems: 'center',        
    borderRadius: 8,             
    marginVertical: 20,          
    alignSelf: 'center',        
    elevation: 2,                
    top:-60
  },
  subscribeButtonText: {
    fontSize: 16,                
    color: '#ffffff',            
    fontWeight: 'bold',          
  },
  si: {
    height: '100%',
    width: '100%',
  },
  reviewText: {
    top: 2,
    fontWeight: 'bold',
    fontSize: 16,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  selectedRating: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    top: -30,
  },
  starTouchable: {
    marginRight: 5,
  },
});

export default ProductScreen;

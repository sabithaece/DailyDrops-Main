import React, { useState } from "react";
import {View,Text,StyleSheet,TouchableOpacity,Image,FlatList,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const DropsScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("Delivered"); 
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); 

  const pressSearch = () => {
    navigation.navigate("SearchScreen");
  };
  const products = [
    {
      id: 1,
      name: "Aavin Double Toned Milk",
      quantity: "2 x 500ml pouch",
      deliveryTime: "Everyday 6:30 - 7:00AM",
      status: "Delivered",
      image: require("./images/aavinmilk.png"),
    },
    {
      id: 2,
      name: "Tender Coconut",
      quantity: "2 Pcs",
      deliveryTime: "Every SUN, WED 6:30 - 7:00AM",
      status: "Delivered",
      image: require("./images/tender-coconut.png"),
    },
    {
      id: 3,
      name: "Aquafina 25 ltrs",
      quantity: "2 x 25ltr can",
      deliveryTime: "Every SUN, WED, THU 4:30 - 5:30PM",
      status: "Scheduled",
      image: require("./images/aquafina.png"),
    },
  ];
  const deliveredProducts = products.filter(
    (product) => product.status === "Delivered"
  );
  const scheduledProducts = products.filter(
    (product) => product.status === "Scheduled"
  );
  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productQuantity}>{item.quantity}</Text>
        <Text style={styles.deliveryTime}>{item.deliveryTime}</Text>
        <Text
          style={[
            styles.status,
            item.status === "Delivered" ? styles.delivered : styles.scheduled,
          ]}
        >
          {item.status}
        </Text>
      </View>
      <TouchableOpacity style={styles.manageButton}>
        <Text style={styles.manageButtonText}>Manage</Text>
      </TouchableOpacity>
    </View>
  );
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Drops</Text>
        <TouchableOpacity onPress={showDatePicker} style={styles.calendarIcon}>
          <Icon name="calendar" size={24} color="#555" />
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date(2025, 12, 31)}
        minimumDate={new Date(2023, 0, 1)}
      />
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "Delivered" && styles.activeTab,
          ]}
          onPress={() => setSelectedTab("Delivered")}
        >
          <Text style={styles.tabButtonText}>Delivered</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "Scheduled" && styles.activeTab,
          ]}
          onPress={() => setSelectedTab("Scheduled")}
        >
          <Text style={styles.tabButtonText}>Scheduled</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 20 }} />
      <FlatList
        data={
          selectedTab === "Delivered" ? deliveredProducts : scheduledProducts
        }
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.productList}
      />
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Icon name="home" size={24} color="#555" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={pressSearch}>
          <Icon name="search" size={24} color="#555" />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("DropScreen")}
        >
          <Icon name="dropbox" size={24} color="#555" />
          <Text style={styles.navText}>Drops</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("AccountScreen")}
        >
          <Icon name="user" size={24} color="#555" />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  calendarIcon: {
    padding: 10,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#94a3b8",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: "#064e3b",
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  productList: {
    flex: 1,
  },
  productItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productQuantity: {
    color: "#777",
  },
  deliveryTime: {
    color: "#999",
    marginBottom: 5,
  },
  status: {
    fontSize: 12,
    fontWeight: "bold",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  delivered: {
    backgroundColor: "#dcfce7",
    color: "#14532d",
    width: 98,
  },
  scheduled: {
    backgroundColor: "#e0f2fe",
    color: "#164e63",
    width: 97,
  },
  manageButton: {
    backgroundColor: "#9dd694",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  manageButtonText: {
    color: "#155b44",
    fontSize: 14,
    fontWeight: "bold",
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 30,
    backgroundColor: "#FFF",
    borderTopColor: "#EEE",
    borderTopWidth: 1,
  },
  
  navItem: { alignItems: "center" },
  navText: { fontSize: 14, color: "#555", marginTop: 5 },
});

export default DropsScreen;
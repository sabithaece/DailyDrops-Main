import React, { useState } from "react";
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,Image,FlatList,TextInput,} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const ProductCard = ({ title, price, imageUrl, onSubscribe }) => (
  <View style={styles.card}>
    <Image source={imageUrl} style={styles.image} />
    <View style={styles.info}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price}</Text>
    </View>
    <TouchableOpacity style={styles.subscribeButton} onPress={onSubscribe}>
      <Text style={styles.subscribeText}>Subscribe</Text>
    </TouchableOpacity>
  </View>
);

const products = [
  {
    id: "1",
    title: "Aavin Milk",
    price: "₹20/500ml",
    imageUrl: require("./images/aavinmilk.png"),
  },
  {
    id: "2",
    title: "Arokya Milk",
    price: "₹21/500ml",
    imageUrl: require("./images/arokyamilk.png"),
  },
  {
    id: "3",
    title: "Bisleri Water Can",
    price: "₹77/25ltr Can",
    imageUrl: require("./images/bisleri.png"),
  },
];

const runningLowItems = [
  { id: "1", name: "Water Can", image: require("./images/water-can.png") },
  { id: "2", name: "Milk", image: require("./images/milk-Bottle.png") },
  { id: "3", name: "Flowers", image: require("./images/flowers.png") },
];

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeTab, setActiveTab] = useState("Daily");

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const renderProductItem = ({ item }) => (
    <ProductCard
      title={item.title}
      price={item.price}
      imageUrl={item.imageUrl}
      onSubscribe={() => alert(`Subscribed to ${item.title}`)}
    />
  );

  const renderRunningLowItem = ({ item }) => (
    <TouchableOpacity
      style={styles.iconBox}
      onPress={() => {
        if (item.name === "Water Can") {
          navigation.navigate("WaterCanScreen"); 
        }
        if (item.name === "Milk") {
          navigation.navigate("MilkScreen");
        }
      }}
    >
      <Image source={item.image} style={styles.iconImage} />
      <Text style={styles.iconText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Daily" && styles.activeTab]}
          onPress={() => handleTabPress("Daily")}
        >
          <Text style={styles.tabText}>Daily</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={[styles.tab, activeTab === "Groceries" && styles.activeTab]}
          onPress={() => handleTabPress("Groceries")}
        >
          <Text style={styles.tabText}>Groceries</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={[styles.tab, activeTab === "Other Services" && styles.activeTab]}
          onPress={() => handleTabPress("Other Services")}
        >
          <Text style={styles.tabText}>Other Services</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={[styles.tab, activeTab === "Newly In" && styles.activeTab]}
          onPress={() => handleTabPress("Newly In")}
        >
          <Text style={styles.tabText}>Newly In</Text>
        </TouchableOpacity>
      </View>
  
      <View style={styles.scrollViewContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What Are You Running Low On?</Text>
          <FlatList
            data={runningLowItems}
            renderItem={renderRunningLowItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
  
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular in Your Area</Text>
          <FlatList
            data={filteredProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            horizontal={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
  
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Icon name="home" size={24} color="#555" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("SearchScreen")}
        >
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
  },
  searchBox: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  scrollViewContent: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  iconBox: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
  },
  iconImage: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  iconText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 5,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#888",
    
  },
  subscribeButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  subscribeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 32,
    backgroundColor: "#FFF",
    borderTopColor: "#EEE",
    borderTopWidth: 1,
  },
  
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 14,
    color: "#554",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#4CAF50",
  },
  tabText: {
    fontSize: 16,
    color: "#555",
    fontWeight: "bold",
  },
  contentText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 18,
  },
});

export default SearchScreen;
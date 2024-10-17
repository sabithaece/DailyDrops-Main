import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native"; 

const waterCanData = [
  {
    id: "1",
    name: "Bisleri Water Can",
    price: "₹77/25 ltr Can",
    image: require("./images/bisleri.png"),
  },
  {
    id: "2",
    name: "Aquafina Water Can",
    price: "₹77/25 ltr Can",
    image: require("./images/aquafina.png"),
  },
  {
    id: "3",  
    name: "Blue Star Water Can",
    price: "₹77/25 ltr Can",
    image: require("./images/bluestar.png"),
  },
];

const WaterCanScreen = () => {
  const navigation = useNavigation(); 

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("bisleri")} 
      >
        <Text style={styles.buttonText}>Subscribe</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Water Can</Text>
      <FlatList
        data={waterCanData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    padding: 22,
    marginBottom: 16,
    borderRadius: 8,
    borderColor: "#e0e0e0",
    borderWidth: 1,
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginRight: 12,
    marginLeft: -20,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
  button: {
    backgroundColor: "#e0f7ef",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "#10c295",
    fontSize: 14,
    fontWeight: "600",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
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
});

export default WaterCanScreen;
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const HomeScreen = ({ navigation }) => {
  const dailySupplies = [
    {
      id: "1",
      name: "Water Can",
      image: require("./images/water-can.png"),
      screen: "WaterCanScreen",
    },
    {
      id: "2",
      name: "Milk",
      image: require("./images/milk-Bottle.png"),
      screen: "MilkScreen",
    },
    {
      id: "3",
      name: "Flowers",
      image: require("./images/flowers.png"),
      screen: "FlowersScreen",
    },
    {
      id: "4",
      name: "Spinach",
      image: require("./images/spinach.png"),
      screen: "SpinachScreen",
    },
    {
      id: "5",
      name: "Post-Workout",
      image: require("./images/post-workout.png"),
      screen: "PostWorkoutScreen",
    },
    {
      id: "6",
      name: "Tender Coconut",
      image: require("./images/tender-coconut.png"),
      screen: "TenderCoconutScreen",
    },
  ];

  const otherServices = [
    {
      id: "1",
      name: "Laundry",
      image: require("./images/laundry.png"),
      screen: "LaundryScreen",
    },
    {
      id: "2",
      name: "Medicines",
      image: require("./images/medicines.png"),
      screen: "MedicinesScreen",
    },
    {
      id: "3",
      name: "Magazines",
      image: require("./images/magazines.png"),
      screen: "MagazinesScreen",
    },
  ];

  // Render item with Pressable
  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate(item.screen)}
      style={styles.item}
    >
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemText}>{item.name}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ flex: 1 }}>
          <FlatList
            ListHeaderComponent={() => (
              <>
                <View style={styles.header}>
                  <Text style={styles.deliveryText}>Delivering To</Text>
                  <Text style={styles.homeText}>Mythreya's Home</Text>
                </View>

                <View style={styles.banner}>
                  <Image
                    source={require("./images/aquafina.png")}
                    style={styles.bannerImage}
                  />
                  <View>
                    <Text style={styles.bannerTitle}>Daily Drop</Text>
                    <Text style={styles.bannerSubtitle}>
                      Thirsty for Savings?
                    </Text>
                    <Text style={styles.bannerDescription}>
                      Subscribe to Fresh Water Today!
                    </Text>
                    <Pressable
                      style={styles.subscribeButton}
                      onPress={() => navigation.navigate("productscreen")}
                    >
                      <Text style={styles.subscribeButtonText}>Subscribe</Text>
                    </Pressable>
                  </View>
                </View>

                <Text style={styles.sectionTitle}>Daily Supplies</Text>
              </>
            )}
            data={dailySupplies}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={styles.flatListContent}
            ListFooterComponent={() => (
              <>
                <Text style={styles.sectionTitle}>Other Services</Text>
                <FlatList
                  data={otherServices}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  numColumns={3}
                  contentContainerStyle={styles.flatListContent}
                />
              </>
            )}
          />
        </View>
        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <Pressable
            style={styles.navItem}
            onPress={() => navigation.navigate("HomeScreen")}
          >
            <Icon name="home" size={24} color="#555" />
            <Text style={styles.navText}>Home</Text>
          </Pressable>
          <Pressable
            style={styles.navItem}
            onPress={() => navigation.navigate("SearchScreen")}
          >
            <Icon name="search" size={24} color="#555" />
            <Text style={styles.navText}>Search</Text>
          </Pressable>

          <Pressable
            style={styles.navItem}
            onPress={() => navigation.navigate("DropScreen")}
          >
            <Icon name="dropbox" size={24} color="#555" />
            <Text style={styles.navText}>Drops</Text>
          </Pressable>

          <Pressable
            style={styles.navItem}
            onPress={() => navigation.navigate("AccountScreen")}
          >
            <Icon name="user" size={24} color="#555" />
            <Text style={styles.navText}>Account</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: Platform.OS === "android" ? 10 : 10, // Add padding for Android status bar
    paddingBottom: Platform.OS === "android" ? 10 : 10, // Bottom padding for Android
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "android" ? 10 : 10, // Adjust padding
    backgroundColor: "#FFF3E6",
  },
  deliveryText: {
    fontSize: 14,
    color: "#888",
  },
  homeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Platform.OS === "android" ? 10 : 10, // Adjust banner padding for Android
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderColor: "#b2dfab",
    marginHorizontal: 5,
    padding: 20,
  },
  bannerImage: {
    width: 80,
    height: 120,
    resizeMode: "contain",
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  bannerSubtitle: {
    fontSize: 16,
    color: "#555",
  },
  bannerDescription: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  subscribeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#d1fae5",
    borderRadius: 5,
  },
  subscribeButtonText: {
    color: "#2E7D32",
    fontSize: 16,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "android" ? 10 : 10, // Adjust section title padding
  },
  flatListContent: {
    paddingHorizontal: 2,
  },
  item: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 5,
    marginHorizontal: 1,
    borderWidth: 1, // Add border width
    borderColor: "#ccc", // Set border color
    borderRadius: 5, // Optional: Add some border radius for a softer look
    padding: 5, // Optional: Add some padding inside the item for better spacing
  },
  itemImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  itemText: {
    marginTop: 5,
    fontSize: 14,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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
    color: "#555",
  },
});

export default HomeScreen;

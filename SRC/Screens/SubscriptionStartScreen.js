import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Menu, Provider } from "react-native-paper";

const SubscriptionStartScreen = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleGoHome = () => {
    navigation.navigate("HomeScreen");
  };

  const handleVendorDetails = () => {
    closeMenu();
    navigation.navigate("VendorDetailsScreen");
  };

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu}>
                <Ionicons name="ellipsis-vertical" size={24} color="black" />
              </TouchableOpacity>
            }
          >
            <Menu.Item onPress={handleVendorDetails} title="VendorDetails" />
          </Menu>
        </View>

        <View style={styles.box}>
          <Ionicons name="checkmark-circle" size={50} color="green" />
          <Text style={styles.message}>
            Your Subscription Will Start on {"\n"}
            <Text style={styles.date}>3rd October 2024</Text>
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleGoHome}>
            <Text style={styles.buttonText}>Go To Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom:"",
  },
  menuContainer: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  box: {
    width: "80%",
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  message: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginVertical: 20,
  },
  date: {
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    backgroundColor: "#4caf50",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SubscriptionStartScreen;
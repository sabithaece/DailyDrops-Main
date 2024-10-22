import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const profileImage = "https://via.placeholder.com/100";

const AccountScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>Mythreya Kannan</Text>
            <Text style={styles.profilePhone}>(+91) 8903658369</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Image
              source={{
                uri: "https://icon-library.com/images/settings-icon-white/settings-icon-white-29.jpg",
              }}
              style={styles.settingsIcon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Active Subscriptions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Past Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Share Daily Drop to Friends</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Get Help</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>About App</Text>
        </TouchableOpacity>
      </ScrollView>

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
    profileContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
      padding: 20,
    },
    profileImageContainer: {
      borderRadius: 50,
      overflow: "hidden",
      marginRight: 20,
    },
    profileImage: {
      width: 50,
      height: 50,
    },
    profileDetails: {
      flex: 1,
    },
    profileName: {
      fontSize: 18,
      fontWeight: "bold",
    },
    profilePhone: {
      fontSize: 14,
      color: "#777",
    },
    settingsButton: {
      padding: 10,
    },
    settingsIcon: {
      width: 25,
      height: 25,
    },
    menuItem: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    menuText: {
      fontSize: 16,
      color: "#333",
    },
    bottomNav: {
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
      marginTop: 5,
    },
  });

export default AccountScreen;

import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Alert,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import AboutAppModal from "../Modals/AboutAppModal";
import HelpModal from "../Modals/HelpModal";
import PremiumModal from "../Modals/PremiumModal";
import ContactUsModal from "../Modals/ContactUsModal";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const navigation = useNavigation();
  const username = "yashi"; // Hardcoded username

  const [profileImage, setProfileImage] = useState(null);
  const [userName, setUserName] = useState("");
  const [eventCount, setEventCount] = useState(0);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [premiumVisible, setPremiumVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [helpVisible, setHelpVisible] = useState(false);

  const profileKey = `${username}profile`;

  useEffect(() => {
    loadUserData();
    loadEventCount();
  }, []);

  const loadUserData = async () => {
    try {
      const storedData = await AsyncStorage.getItem(profileKey);
      console.log(storedData)
      if (storedData) {
        const { profileImage, userName } = JSON.parse(storedData);
        setProfileImage(profileImage || null);
        setUserName(userName || "");
      }
    } catch (error) {
      console.error("Failed to load user data:", error);
    }
  };

  const saveUserData = async () => {
    try {
      const userData = { profileImage, userName };
      await AsyncStorage.setItem(profileKey, JSON.stringify(userData));
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      console.error("Failed to save user data:", error);
    }
  };

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Media library permissions are required.");
      return;
    }
  
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: [ImagePicker.MediaType.IMAGE], // Use the new API
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
  
      if (!result.canceled) { // Adjusted from `cancelled` to `canceled`
        setProfileImage(result.assets[0].uri); // Access the URI from the result's assets array
      }
    } catch (error) {
      console.error("Failed to pick image:", error);
      Alert.alert("Error", "Failed to pick an image.");
    }
  };
  

  const loadEventCount = async () => {
    try {
      const eventData = await AsyncStorage.getItem(username);
      if (eventData) {
        const parsedData = JSON.parse(eventData);
        setEventCount(parsedData.events?.length || 0);
      }
    } catch (error) {
      console.error("Failed to load event count:", error);
    }
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 20, backgroundColor: "#f8f9fa" }}>
        <Card className="w-full mb-5">
          <CardHeader>
            <CardTitle>
              
                Profile
              
            </CardTitle>
            <CardDescription>
             Manage your profile details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Input
                style={{
                  fontSize: 18,
                 
                  borderBottomWidth: 1,
                  borderColor:"#fff",
                  flex: 1,
                  marginRight: 15,
                }}
                placeholder="Enter your name"
                placeholderTextColor="#6c63ff"
                value={userName}
                onChangeText={setUserName}
              />
              <TouchableOpacity onPress={handleImageUpload}>
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 40,
                      borderWidth: 2,
                     
                    }}
                  />
                ) : (
                  <View
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 40,
                      backgroundColor: "#ccc",
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 2,
                     
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 32 }}></Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </CardContent>
          <CardFooter>
            <Text style={{  fontWeight: "bold" }}>
              Total Events Created: {eventCount}
            </Text>
          </CardFooter>
        </Card>

        <Button onPress={saveUserData} style={{marginBottom:5}} variant={"secondary"}>
          <Text>Save Profile</Text>
        </Button>

        <TouchableOpacity onPress={() => setAboutVisible(true)}>
         <Button variant={"secondary"}>
              <Text>About App</Text>
              </Button>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPremiumVisible(true)}>
        <Button variant={"secondary"}>
              <Text>Premium</Text>
              </Button>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setContactVisible(true)}>
        <Button variant={"secondary"}>
              <Text>Contact Us</Text>
              </Button>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setHelpVisible(true)}>
        <Button variant={"secondary"}>
              <Text>Help</Text>
              </Button>
        </TouchableOpacity>

        <Button
          onPress={() => {
            navigation.navigate("Login");
            Alert.alert("Logged Out", "You have been logged out successfully.");
          }}
          style={{marginTop:5}}
        variant={"secondary"}
       >
          <Text>Logout</Text>
        </Button>

        <AboutAppModal isVisible={aboutVisible} onClose={() => setAboutVisible(false)} />
        <PremiumModal isVisible={premiumVisible} onClose={() => setPremiumVisible(false)} />
        <ContactUsModal isVisible={contactVisible} onClose={() => setContactVisible(false)} />
        <HelpModal isVisible={helpVisible} onClose={() => setHelpVisible(false)} />
      </View>
    </ScrollView>
  );
}

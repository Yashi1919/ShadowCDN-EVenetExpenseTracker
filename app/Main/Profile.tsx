import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function Profile() {
  const route = useRoute();
  const navigation = useNavigation();
  const { username } = route.params;

  const [profileImage, setProfileImage] = useState(null);
  const [userName, setUserName] = useState("");
  const [eventCount, setEventCount] = useState(0);

  const profileKey = `${username}profile`;

  const loadUserData = async () => {
    try {
      const storedData = await AsyncStorage.getItem(profileKey);
      if (storedData) {
        const { profileImage, userName } = JSON.parse(storedData);
        setProfileImage(profileImage || null);
        setUserName(userName || "");
      }
    } catch (error) {
      console.error("Failed to load user data from AsyncStorage:", error);
    }
  };

  const saveUserData = async () => {
    try {
      const userData = { profileImage, userName };
      await AsyncStorage.setItem(profileKey, JSON.stringify(userData));
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      console.error("Failed to save user data to AsyncStorage:", error);
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
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.cancelled) {
        setProfileImage(result.uri);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      Alert.alert("Error", "Failed to select image.");
    }
  };

  const loadEventCount = async () => {
    try {
      const countData = await AsyncStorage.getItem(username);
      if (countData) {
        const data = JSON.parse(countData);
        setEventCount(data.events?.length || 0);
      }
    } catch (error) {
      console.error("Failed to load event count from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    loadUserData();
    loadEventCount();
  }, []);

  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 20, backgroundColor: "#f8f9fa" }}>
        <Card className="w-full max-w-sm mb-5">
          <CardHeader>
            <CardTitle>
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "#6c63ff" }}>
                Profile
              </Text>
            </CardTitle>
            <CardDescription>
              <Text style={{ color: "#6c63ff" }}>Update your profile details</Text>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                style={{
                  fontSize: 18,
                  color: "#6c63ff",
                  borderBottomWidth: 1,
                  borderBottomColor: "#6c63ff",
                  flex: 1,
                  marginRight: 10,
                }}
                placeholder="Enter your name"
                placeholderTextColor="#6c63ff"
                value={userName}
                onChangeText={setUserName}
              />
              <TouchableOpacity onPress={handleImageUpload}>
                <Avatar>
                  {profileImage ? (
                    <AvatarImage source={{ uri: profileImage }} />
                  ) : (
                    <AvatarFallback>
                      <Text>U</Text>
                    </AvatarFallback>
                  )}
                </Avatar>
              </TouchableOpacity>
            </View>
          </CardContent>
          <CardFooter>
            <Text style={{ color: "#6c63ff" }}>
              Total Events Created: {eventCount}
            </Text>
          </CardFooter>
        </Card>

        <Button onPress={saveUserData} className="mb-3">
          <Text>Save Profile</Text>
        </Button>

        <Button
          onPress={() => {
            navigation.navigate("Login");
            Alert.alert("Logged Out", "You have been logged out successfully.");
          }}
          className="bg-red-500 mt-3"
        >
          <Text>Logout</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

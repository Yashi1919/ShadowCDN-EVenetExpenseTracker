import React, { useState } from "react";
import {
  View,
  Alert,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import tw from "twrnc";
import * as ImagePicker from "expo-image-picker";

// Import UI components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

const Expenses: React.FC = () => {
  const [eventData, setEventData] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedExpenseType, setSelectedExpenseType] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const [message, setMessage] = useState<string>("");
  const [photo, setPhoto] = useState<string | null>(null);

  // Load event data from AsyncStorage
  const loadEventData = async () => {
    try {
      const storedEvent = await AsyncStorage.getItem("event");
      if (storedEvent) {
        const parsedEvent = JSON.parse(storedEvent);

        const updatedEventData = {
          ...parsedEvent,
          history: parsedEvent.history || [],
          totalAmount: parsedEvent.totalAmount || 0,
        };

        setEventData(updatedEventData);
      } else {
        Alert.alert("Event not found", "Please add an event and try again.");
      }
    } catch (error) {
      console.error("Failed to load event data", error);
      Alert.alert("Error", "Failed to load event data.");
    }
  };

  // UseFocusEffect to reload data when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadEventData();
    }, [])
  );

  const handleSaveToHistory = async () => {
    if (!selectedExpenseType || !amount || isNaN(Number(amount))) {
      Alert.alert("Error", "Please provide valid expense details.");
      return;
    }

    const expenseAmount = parseFloat(amount);

    if (expenseAmount > eventData.totalAmount) {
      Alert.alert("Error", "Insufficient funds. Cannot make this expense.");
      return;
    }

    const newExpense = {
      type: selectedExpenseType,
      amount: expenseAmount,
      message,
      photo,
    };

    const updatedHistory = [...(eventData.history || []), newExpense];
    const updatedTotalAmount = eventData.totalAmount - expenseAmount;

    const updatedEventData = {
      ...eventData,
      history: updatedHistory,
      totalAmount: updatedTotalAmount,
    };

    try {
      await AsyncStorage.setItem("event", JSON.stringify(updatedEventData));
      setEventData(updatedEventData);
      setIsModalVisible(false);
      setSelectedExpenseType("");
      setAmount("");
      setMessage("");
      setPhoto(null);
      Alert.alert("Success", "Expense saved to history.");
    } catch (error) {
      console.error("Failed to save expense to history", error);
      Alert.alert("Error", "Failed to save expense to history.");
    }
  };

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setPhoto(result.uri);
      }
    } catch (error) {
      console.error("Failed to pick image", error);
      Alert.alert("Error", "Failed to pick image.");
    }
  };

  if (!eventData) {
    return (
      <View style={tw`flex-1 bg-gray-100 p-5 justify-center items-center`}>
        <Text style={tw`text-lg text-gray-600`}>Loading event data...</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      {/* Card for Event Overview */}
      <Card className="mx-4 my-4">
        <CardHeader>
          <CardTitle>{eventData.name}</CardTitle>
          <CardDescription>Total Amount: {eventData.totalAmount.toFixed(2)} rs</CardDescription>
        </CardHeader>
      </Card>

      {/* Floating Add Button */}
      
      <Button
      variant={"secondary"}
        style={[
          tw`absolute rounded-full items-center justify-center shadow-lg`,
          {
            width: 120,
            height: 120,
            bottom: 150,
            alignSelf: "center",
           
          },
        ]}
        onLongPress={() => setIsModalVisible(true)}
      >
        <MaterialIcons name="add" size={28} color="#6c63ff" />
      </Button>

      {/* Modal for Adding Expense */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
          <Card className="w-4/5 bg-white p-5 rounded-lg shadow-lg">
            <CardHeader>
              <CardTitle>Save Expense to History</CardTitle>
            </CardHeader>

            <CardContent>
              <Text style={tw`text-gray-700 mb-2`}>Select Expense Type:</Text>
              <FlatList
                data={eventData.expenseTypes}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Button
                    className={`mr-2 ${
                      item === selectedExpenseType ? "bg-purple-600" : "bg-gray-300"
                    }`}
                    onPress={() => setSelectedExpenseType(item)}
                  variant={"secondary"}>
                    <Text className={item === selectedExpenseType ? "text-white" : "text-gray-800"}>
                      {item}
                    </Text>
                  </Button>
                )}
              />

              <Text style={tw`text-gray-700 mt-4`}>Amount:</Text>
              <TextInput
                style={tw`border border-gray-300 rounded p-2 mb-3`}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />

              <Text style={tw`text-gray-700`}>Message:</Text>
              <TextInput
                style={tw`border border-gray-300 rounded p-2 mb-3`}
                placeholder="Enter message"
                value={message}
                onChangeText={setMessage}
              />

              <Button className="bg-purple-600 py-2 rounded-lg mb-3" onPress={handleImagePick}>
                <Text className="text-white font-bold">Upload Proof</Text>
              </Button>

              {photo && (
                <Image
                  source={{ uri: photo }}
                  style={tw`w-32 h-32 rounded-lg mb-3 self-center`}
                />
              )}
            </CardContent>

            <CardFooter>
              <Button className="bg-blue-600 py-2 rounded-lg mb-2" onPress={handleSaveToHistory}>
                <Text className="text-white font-bold">Save to History</Text>
              </Button>
              <Button className="bg-gray-600 py-2 rounded-lg" onPress={() => setIsModalVisible(false)}>
                <Text className="text-white font-bold">Cancel</Text>
              </Button>
            </CardFooter>
          </Card>
        </View>
      </Modal>
    </View>
  );
};

export default Expenses;

import React, { useState, useEffect } from "react";
import {
  View,
  Modal,
  Alert,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import tw from "twrnc";

// Import UI components
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const Fundraisers: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [fundraisers, setFundraisers] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fundraiserName, setFundraiserName] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    loadEventData();
  }, []);

  const loadEventData = async () => {
    try {
      const storedEvent = await AsyncStorage.getItem("event");
      if (storedEvent) {
        const parsedEvent = JSON.parse(storedEvent);
        setFundraisers(parsedEvent.fundraisers || []);
      }
    } catch (error) {
      console.error("Failed to load event data", error);
      Alert.alert("Error", "Failed to load event data.");
    }
  };

  const handleAddFundraiser = async () => {
    if (!fundraiserName.trim() || !amount || isNaN(Number(amount))) {
      Alert.alert("Error", "Please provide valid fundraiser details.");
      return;
    }

    const newFundraiser = {
      name: fundraiserName,
      amount: parseFloat(amount),
    };

    try {
      const storedEvent = await AsyncStorage.getItem("event");
      if (storedEvent) {
        const parsedEvent = JSON.parse(storedEvent);

        // Update fundraisers and totalAmount
        const updatedFundraisers = [...(parsedEvent.fundraisers || []), newFundraiser];
        const updatedTotalAmount = (parsedEvent.totalAmount || 0) + newFundraiser.amount;

        const updatedEventData = {
          ...parsedEvent,
          fundraisers: updatedFundraisers,
          totalAmount: updatedTotalAmount,
        };

        // Save updated event data to AsyncStorage
        await AsyncStorage.setItem("event", JSON.stringify(updatedEventData));

        // Update local state
        setFundraisers(updatedFundraisers);
        setIsModalVisible(false);
        setFundraiserName("");
        setAmount("");

        Alert.alert("Success", "Fundraiser added successfully.");
      } else {
        Alert.alert("Error", "Failed to load event data.");
      }
    } catch (error) {
      console.error("Failed to save fundraiser", error);
      Alert.alert("Error", "Failed to save fundraiser.");
    }
  };

  const filteredFundraisers = fundraisers.filter((fundraiser) =>
    fundraiser.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      {/* Header */}
     

      {/* Search Bar with Add Button */}
      <View style={tw`flex-row items-center p-4 bg-gray-200`}>
        <Input
          placeholder="Search fundraisers..."
          value={searchText}
          onChangeText={setSearchText}
          aria-labelledby="inputLabel"
          aria-errormessage="inputError"
          style={[tw`flex-1`, { borderRadius: 10 }]}
        />
        <Button
          className="ml-2"
          onPress={() => setIsModalVisible(true)}
        >
          <MaterialIcons name="add" size={24} color="#fff" />
        </Button>
      </View>

      {/* Fundraisers List */}
      <FlatList
        data={filteredFundraisers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card className="mb-2 mx-4">
            <CardHeader>
              <CardTitle style={{fontSize: 18 }}>
                {item.name}
              </CardTitle>
              <CardDescription>
                <Text>₹{item.amount.toFixed(2)}</Text>
              </CardDescription>
            </CardHeader>
          </Card>
        )}
        contentContainerStyle={tw`p-4`}
      />

      {/* Modal for Adding Fundraiser */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
          <Card className="w-4/5">
            <CardHeader>
              <CardTitle>Add Fundraiser</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Fundraiser Name */}
              <Text>Name:</Text>
              <Input
                placeholder="Enter fundraiser name"
                value={fundraiserName}
                onChangeText={setFundraiserName}
              />

              {/* Amount */}
              <Text className="mt-4">Amount:</Text>
              <Input
                placeholder="Enter amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
              />
            </CardContent>
            <CardContent className="p-4">
              <Button
                onPress={handleAddFundraiser}
              >
                <Text>Save Fundraiser</Text>
              </Button>
              <Button
                onPress={() => setIsModalVisible(false)}
              >
                <Text>Cancel</Text>
              </Button>
            </CardContent>
          </Card>
        </View>
      </Modal>
    </View>
  );
};

export default Fundraisers;

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import tw from "twrnc";
import { Image } from "react-native";
import { Text } from "~/components/ui/text";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";

const History: React.FC<{ event: any }> = ({ event }) => {
  const [eventData, setEventData] = useState<any>(null);

  // Load event data from AsyncStorage
  const loadEventData = async () => {
    try {
      const storedEvent = await AsyncStorage.getItem("event");
      if (storedEvent) {
        const parsedEvent = JSON.parse(storedEvent);

        // Ensure all expected fields are initialized
        const updatedEventData = {
          ...parsedEvent,
          history: parsedEvent.history || [],
          fundraisers: parsedEvent.fundraisers || [],
          expenseTypes: parsedEvent.expenseTypes || [],
        };

        setEventData(updatedEventData);
      } else {
        Alert.alert("Error", "Failed to load event data.");
      }
    } catch (error) {
      console.error("Failed to load event data", error);
      Alert.alert("Error", "Failed to load event data.");
    }
  };

  // Use useFocusEffect to reload data whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      loadEventData();
    }, [])
  );

  if (!eventData) {
    return (
      <View style={tw`flex-1 bg-gray-100 p-5 justify-center items-center`}>
        <Text className="text-lg text-gray-600">Loading event data...</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-gray-100`}>
     <ScrollView>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Event Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Text>Name: {eventData.name}</Text>
            <Text>Date: {eventData.date}</Text>
            <Text>Total Amount: ₹{eventData.totalAmount.toFixed(2)}</Text>
            <Text>Expense Types: {eventData.expenseTypes.join(", ")}</Text>
          </CardContent>
        </Card>

        {/* Fundraisers List */}
        <View className="mb-4">
          <Text className="text-lg font-bold mb-2">Fundraisers</Text>
          <FlatList
            data={eventData.fundraisers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Card className="mb-2">
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>₹{item.amount.toFixed(2)}</CardDescription>
                </CardHeader>
              </Card>
            )}
            scrollEnabled={false} // Prevent FlatList from scrolling inside ScrollView
          />
        </View>

        {/* History List */}
        <View>
          <Text className="text-lg font-bold mb-2">Expenses</Text>
          <FlatList
            data={eventData.history}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Card className="mb-2">
                <CardHeader>
                  <CardTitle>{item.type}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text>Amount: ₹{item.amount.toFixed(2)}</Text>
                  {item.message && <Text>Message: {item.message}</Text>}
                  {item.photo ? (
                    <Image
                      source={{ uri: item.photo }}
                      style={tw`w-32 h-32 rounded-lg mt-2`}
                    />
                  ) : (
                    <Text>No Proof Uploaded</Text>
                  )}
                </CardContent>
              </Card>
            )}
            scrollEnabled={false} // Prevent FlatList from scrolling inside ScrollView
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default History;

import React, { useEffect } from "react";
import { View, AsyncStorage } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "@expo/vector-icons/MaterialIcons"; // Expo vector icons
import tw from "twrnc";

// Import screens
import Expenses from "./Events/Expenses";
import Fundraisers from "./Events/FundRaisers";
import History from "./Events/History";

const Tab = createBottomTabNavigator();

const EventScreen = ({ route }) => {
  const { event } = route.params; // Get event details from navigation params

  // Save event details in AsyncStorage if not already present
  const saveEventToStorage = async () => {
    try {
      const storedEvent = await AsyncStorage.getItem(event.name);
      if (!storedEvent) {
        const eventData = {
          name: event.name,
          date: event.date,
          expenseTypes: event.expenseTypes,
          totalAmount: 0,
          history: [],
          fundraisers: [],
          volunteers: [],
        };
        await AsyncStorage.setItem(event.name, JSON.stringify(eventData));
        console.log(`Event ${event.name} saved to storage.`);
      } else {
        console.log(`Event ${event.name} already exists in storage.`);
      }
    } catch (error) {
      console.error("Failed to save event data to AsyncStorage", error);
    }
  };

  useEffect(() => {
    saveEventToStorage();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Expenses") {
            iconName = "attach-money";
          } else if (route.name === "Fundraisers") {
            iconName = "volunteer-activism";
          } else if (route.name === "Statistics") {
            iconName = "bar-chart";
          } else if (route.name === "History") {
            iconName = "history";
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#6c63ff",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: tw`bg-white border-t border-gray-200`,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Expenses">
        {() => <Expenses event={event} />}
      </Tab.Screen>
      <Tab.Screen name="Fundraisers">
        {() => <Fundraisers event={event} />}
      </Tab.Screen>
      <Tab.Screen name="Statistics">
        {() => <Statistics event={event} />}
      </Tab.Screen>
      <Tab.Screen name="History">
        {() => <History event={event} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default EventScreen;

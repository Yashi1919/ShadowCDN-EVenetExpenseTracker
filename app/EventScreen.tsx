import React, { useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Import screens
import Expenses from "./Events/Expenses";
import Fundraisers from "./Events/FundRaisers";
import History from "./Events/History";

// Define the tab navigator
const Tab = createBottomTabNavigator();

const EventScreen: React.FC = () => {
  const saveDefaultEventToStorage = async () => {
    try {
      const storedEvent = await AsyncStorage.getItem("event");
      if (!storedEvent) {
        const defaultEventData = {
          name: "Default Event",
          date: new Date().toISOString(),
          expenseTypes: ["Food", "Transport", "Miscellaneous"],
          totalAmount: 0,
          history: [],
          fundraisers: [],
          volunteers: [],
        };

        await AsyncStorage.setItem("event", JSON.stringify(defaultEventData));
        console.log("Default event saved to storage.");
      }
    } catch (error) {
      console.error("Error saving event to AsyncStorage:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      saveDefaultEventToStorage();
    }, [])
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          switch (route.name) {
            case "Expenses":
              iconName = "attach-money";
              break;
            case "Fundraisers":
              iconName = "volunteer-activism";
              break;
          
            case "History":
              iconName = "history";
              break;
            default:
              iconName = "help-outline";
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#6c63ff",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: tw`bg-white border-t border-gray-200`,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Expenses" component={Expenses} />
      <Tab.Screen name="Fundraisers" component={Fundraisers} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
};

export default EventScreen;

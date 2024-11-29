import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import * as Calendar from "expo-calendar";
import DateTimePicker from "react-native-ui-datepicker";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Button } from '~/components/ui/button';
import dayjs from "dayjs";
import tw from "twrnc";
import { useRouter } from "expo-router";
import { useNavigation } from '@react-navigation/native';


export default function CreateEvents() {
const navigation=useNavigation()
  const username = "yashi";
  const [events, setEvents] = useState([]);
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [eventName, setEventName] = useState("");
  const [newExpenseType, setNewExpenseType] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);

    const router=useRouter()
  
    useEffect(() => {
    requestCalendarPermission();
    loadStorageData();
  }, []);

  const requestCalendarPermission = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Calendar permissions are required.");
    }
  };

  const loadStorageData = async () => {
    try {
      const userData = await AsyncStorage.getItem(username);
      if (userData) {
        const parsedData = JSON.parse(userData);
        setEvents(parsedData.events || []);
      }
    } catch (error) {
      console.error("Failed to load data from AsyncStorage", error);
    }
  };

  const handleEventClick = (event) => {
    router.push('/EventScreen')
  };

  const handleLongPress = (event) => {
    Alert.alert("Delete Event", `Are you sure you want to delete "${event.name}"?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => deleteEvent(event.id), style: "destructive" },
    ]);
  };

  const deleteEvent = async (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    try {
      const userData = await AsyncStorage.getItem(username);
      const parsedData = userData ? JSON.parse(userData) : { events: [] };
      parsedData.events = updatedEvents;
      await AsyncStorage.setItem(username, JSON.stringify(parsedData));
      setEvents(updatedEvents);
      Alert.alert("Success", "Event deleted successfully.");
    } catch (error) {
      console.error("Failed to delete event from AsyncStorage", error);
    }
  };

  const saveEvent = async () => {
    if (!eventName.trim() || expenseTypes.length === 0 || !selectedDate) {
      Alert.alert("Error", "Please provide all required fields.");
      return;
    }

    try {
      const calendarId = await getDefaultCalendarId();
      await Calendar.createEventAsync(calendarId, {
        title: eventName,
        startDate: selectedDate,
        endDate: new Date(selectedDate.getTime() + 60 * 60 * 1000),
        timeZone: "GMT",
        notes: expenseTypes.join(", "),
      });

      const newEvent = {
        id: Date.now(),
        name: eventName,
        expenseTypes,
        date: selectedDate,
      };

      const updatedEvents = [...events, newEvent];
      const userData = await AsyncStorage.getItem(username);
      const parsedData = userData ? JSON.parse(userData) : { events: [] };
      parsedData.events = updatedEvents;
      await AsyncStorage.setItem(username, JSON.stringify(parsedData));
      setEvents(updatedEvents);
      resetEventForm();
      Alert.alert("Success", "Event added successfully!");
    } catch (error) {
      console.error("Failed to save event to calendar", error);
      Alert.alert("Error", "Failed to save event.");
    }
  };

  const resetEventForm = () => {
    setEventName("");
    setExpenseTypes([]);
    setSelectedDate(new Date());
    setIsModalVisible(false);
  };

  const getDefaultCalendarId = async () => {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    return calendars.length > 0 ? calendars[0].id : null;
  };

  return (
    <View style={styles.container}>
     
      <FlatList
        data={events}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleEventClick()}
            onLongPress={() => handleLongPress(item)}
          >
            <Card style={styles.eventCard}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>Date: {new Date(item.date).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <Text>Expense Types:</Text>
                {item.expenseTypes.map((type, index) => (
                  <Text key={index} style={styles.expenseType}>
                    - {type}
                  </Text>
                ))}
              </CardContent>
              <CardFooter>
                <Text style={styles.footerText}>Tap to view or delete</Text>
              </CardFooter>
            </Card>
          </TouchableOpacity>
        )}
      />
      
     <Button
        style={{marginBottom:14,height:80,width:80,alignSelf:"center",borderRadius:40,backgroundColor:"#000000"}}
        onPress={() => setIsModalVisible(true)}
      >
        <View
    style={[
      tw`w-18 h-18 rounded-full justify-center items-center shadow-lg`,
      {}, // Replace purple with #6c63ff
    ]}
  >
    <MaterialIcons name="add" size={28} color={"#6c63ff"}/>
  </View>
      </Button>
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => resetEventForm()}
      >
        <KeyboardAvoidingView
  style={styles.modalBackground}
  behavior={Platform.OS === "ios" ? "padding" : "height"}
>
  <View style={styles.modalContent}>
    <Text style={styles.modalHeader}>Add Event</Text>
    <TextInput
      style={styles.input}
      placeholder="Event Name"
      value={eventName}
      onChangeText={setEventName}
    />

    {/* Date Selection with Arrows */}
    <View style={styles.dateNavigation}>
      <TouchableOpacity
        onPress={() => setSelectedDate(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000))}
        style={styles.arrowButton}
      >
        <MaterialIcons name="arrow-left" size={24} color="#6c63ff" />
      </TouchableOpacity>
      <Text style={styles.dateText}>{selectedDate.toDateString()}</Text>
      <TouchableOpacity
        onPress={() => setSelectedDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000))}
        style={styles.arrowButton}
      >
        <MaterialIcons name="arrow-right" size={24} color="#6c63ff" />
      </TouchableOpacity>
    </View>

    <TextInput
      style={styles.input}
      placeholder="Add Expense Type"
      value={newExpenseType}
      onChangeText={setNewExpenseType}
    />
    <TouchableOpacity
      style={styles.addExpenseButton}
      onPress={() => setExpenseTypes([...expenseTypes, newExpenseType])}
    >
      <Text style={styles.buttonText}>Add Expense Type</Text>
    </TouchableOpacity>
    <FlatList
      data={expenseTypes}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.expenseRow}>
          <Text style={styles.expenseText}>{item}</Text>
          <TouchableOpacity
            onPress={() => setExpenseTypes(expenseTypes.filter((type) => type !== item))}
          >
            <MaterialIcons name="delete" size={20} color="red" />
          </TouchableOpacity>
        </View>
      )}
    />
    <TouchableOpacity style={styles.saveButton} onPress={saveEvent}>
      <Text style={styles.buttonText}>Save Event</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.cancelButton} onPress={resetEventForm}>
      <Text style={styles.buttonText}>Cancel</Text>
    </TouchableOpacity>
  </View>
</KeyboardAvoidingView>

      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  header: { fontSize: 24, fontWeight: "bold", color: "#6c63ff", textAlign: "center" ,marginTop:30},
  eventCard: {
    marginVertical: 8,
    borderRadius: 8,
   
    
    height:400,
    width: 300,
    marginRight: 10,

  },
  expenseType: { fontSize: 12},
  footerText: { fontSize: 14, color: "#6c63ff" },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    alignSelf:"center",
    padding: 16,
    borderRadius: 50,
  },
  modalBackground: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalContent: { width: "80%", backgroundColor: "#fff", borderRadius: 12, padding: 20 },
  modalHeader: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 },
  dateButton: { backgroundColor: "#6c63ff", padding: 10, borderRadius: 8, marginBottom: 15 },
  dateButtonText: { color: "#fff", textAlign: "center" },
  addExpenseButton: { backgroundColor: "#28a745", padding: 10, borderRadius: 8, marginBottom: 15 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  saveButton: { backgroundColor: "#007bff", padding: 10, borderRadius: 8, marginBottom: 10 },
  cancelButton: { backgroundColor: "#6c757d", padding: 10, borderRadius: 8 },
  expenseRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  expenseText: { fontSize: 14, color: "#333" },
  dateNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  arrowButton: {
    padding: 10,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});

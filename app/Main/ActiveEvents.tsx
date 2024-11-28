import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";

export default function ActiveEvents({ route }: any) {
  const { username } = route.params; // Access the username passed via route
  const [events, setEvents] = useState([
    { id: "1", name: "React Native Workshop", description: "Learn the basics of React Native." },
    { id: "2", name: "Expo Development", description: "Build apps with Expo tools." },
    { id: "3", name: "UI/UX Design", description: "Design stunning user interfaces." },
  ]);

  const handleEventPress = (eventName: string) => {
    Alert.alert("Event Details", `You selected "${eventName}".`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Active Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.eventCard}
            onPress={() => handleEventPress(item.name)}
          >
            <Text style={styles.eventName}>{item.name}</Text>
            <Text style={styles.eventDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.footer}>Logged in as: {username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  eventCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eventDescription: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    textAlign: "center",
    color: "#888",
  },
});

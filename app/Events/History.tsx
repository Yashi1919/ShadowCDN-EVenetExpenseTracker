import React from "react";
import { View, Text, StyleSheet } from "react-native";

const History = ({ event }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History Screen</Text>
      <Text style={styles.subtitle}>Event Name: {event.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6c63ff",
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
});

export default History;

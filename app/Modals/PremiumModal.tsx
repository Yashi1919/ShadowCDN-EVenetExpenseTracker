import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import tw from "twrnc";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";

const PremiumModal = ({ isVisible, onClose }) => {
  const premiumPlans = [
    {
      id: "1",
      title: "Silver",
      price: "₹100/month",
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      id: "2",
      title: "Gold",
      price: "₹200/month",
      features: ["Feature A", "Feature B", "Feature C", "Feature D"],
    },
    {
      id: "3",
      title: "Diamond",
      price: "₹300/month",
      features: ["Feature X", "Feature Y", "Feature Z", "Feature W"],
    },
  ];

  const renderCard = ({ item }) => (
    <Card
      className="shadow-lg"
      style={{
        width: Dimensions.get("screen").width * 0.8,
        marginHorizontal: 10,
      }}
    >
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.price}</CardDescription>
      </CardHeader>
      <CardContent>
        <Text style={tw`text-lg font-semibold mb-2`}>Included Features:</Text>
        {item.features.map((feature, index) => (
          <Text key={index} style={tw`text-sm text-gray-600`}>
            - {feature}
          </Text>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[tw`bg-white p-4 rounded-lg`, { width: "95%" }]}>
          <Text style={tw`text-lg font-bold text-center mb-4`}>
            Premium Features
          </Text>
          <FlatList
            data={premiumPlans}
            renderItem={renderCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <Button className="mt-5" onPress={onClose}>
            <Text style={tw`text-center text-white font-bold`}>Close</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default PremiumModal;

import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const ContactUsModal = ({ isVisible, onClose }) => {
  const handleOpenLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error(`Cannot open URL: ${url}`);
        Alert.alert("Error", "Unable to open the link.");
      }
    } catch (err) {
      console.error("Failed to open URL:", err);
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Contact Us</Text>

          {/* Contact Details */}
          <View style={styles.contactContainer}>
            <Text style={styles.contactText}>
              For any queries, feel free to reach out:
            </Text>
            <TouchableOpacity
              style={styles.contactRow}
              onPress={() => handleOpenLink("mailto:pendyalayasvanth@app.com")}
            >
              <MaterialIcons name="email" size={20} color="#6c63ff" />
              <Text style={styles.contactDetail}>pendyalayasvanth@app.com</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactRow}
              onPress={() => handleOpenLink("tel:+917993521142")}
            >
              <MaterialIcons name="phone" size={20} color="#6c63ff" />
              <Text style={styles.contactDetail}>+91 7993521142</Text>
            </TouchableOpacity>
          </View>

          {/* Social Media Links */}
          <View style={styles.socialMediaContainer}>
            <TouchableOpacity
              style={styles.socialIcon}
              onPress={() => handleOpenLink("https://instagram.com")}
            >
              <FontAwesome name="instagram" size={28} color="#E1306C" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialIcon}
              onPress={() => handleOpenLink("https://facebook.com")}
            >
              <FontAwesome name="facebook" size={28} color="#1877F2" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialIcon}
              onPress={() => handleOpenLink("https://twitter.com")}
            >
              <FontAwesome name="twitter" size={28} color="#1DA1F2" />
            </TouchableOpacity>
          </View>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
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
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  contactContainer: {
    marginBottom: 20,
  },
  contactText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  contactDetail: {
    marginLeft: 10,
    fontSize: 16,
    color: "#6c63ff",
  },
  socialMediaContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  socialIcon: {
    marginHorizontal: 10,
  },
  closeButton: {
    backgroundColor: "#6c63ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ContactUsModal;

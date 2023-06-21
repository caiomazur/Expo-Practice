import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import CircleButton from "./components/CircleButton";
import IconButton from "./components/IconButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  // State variables
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);

  // Function to pick an image from the device's library
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image.");
    }
  };

  // Event handler for resetting the app options
  const onReset = () => {
    setShowAppOptions(false);
  };

  // Event handler for adding a sticker
  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  // Event handler for closing the modal
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  // Function to save the image
  const onSaveImageAsync = async () => {
    // will implement this later
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        {/* Component for displaying the selected image */}
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
        {/* Component for displaying the selected emoji sticker */}
        {pickedEmoji !== null ? (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
        ) : null}
      </View>

      {/* Conditional rendering of app options */}
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            {/* Button for resetting */}
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            {/* Button for adding a sticker */}
            <CircleButton onPress={onAddSticker} />
            {/* Button for saving the image */}
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          {/* Button for choosing a photo */}
          <Button
            theme="primary"
            label="Choose a photo"
            onPress={pickImageAsync}
          />
          {/* Button for using the selected photo */}
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}

      {/* Emoji picker modal */}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        {/* List of emojis to choose from */}
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>

      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});

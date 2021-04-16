import React from "react";
import { View, Image, TouchableWithoutFeedback, Alert } from "react-native";
import Block from "./Block.js";
import * as ImagePicker from "expo-image-picker";
import * as theme from "../constants/theme.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default ImageInput = ({ imageUri, onChangeImage, editable }) => {
  const handlePress = () => {
    if (!imageUri) {
      selectImage();
    } else {
      Alert.alert("Remove", "Are you sure you want to remove this image", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
    }
  };
  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
      if (!result.cancelled) {
        onChangeImage(result.uri);
      }
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress} disabled={editable}>
      <View
        style={{
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          width: 120,
          height: 120,
          backgroundColor: theme.colors.gray,
        }}
      >
        {!imageUri && (
          <MaterialCommunityIcons
            name="camera"
            size={45}
            color={theme.colors.gray2}
          />
        )}
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{ height: "100%", width: "100%" }}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

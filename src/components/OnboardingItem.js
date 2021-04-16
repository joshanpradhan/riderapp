import React from "react";
import { StyleSheet, View, Image, useWindowDimensions } from "react-native";
import Text from "./Text";

export default OnboardingItem = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
      <View style={{ flex: 0.1, paddingHorizontal: 5, paddingVertical: 5 }}>
        <Text h2 center>
          {item.title}
        </Text>
        <Text h4 center gray>
          {item.description}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
  },
});

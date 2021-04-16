import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import Block from "./Block";
import Text from "./Text";
import * as theme from "../constants/theme.js";
import { useNetInfo } from "@react-native-community/netinfo";
export default OfflineNotice = () => {
  const netInfo = useNetInfo();
  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false) {
    return (
      <Block style={styles.container}>
        <Text h4 color={theme.colors.white}>
          No Internet Connection
        </Text>
      </Block>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    height: 30,
    position: "absolute",
    backgroundColor: theme.colors.red,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    top: StatusBar.currentHeight,
  },
});

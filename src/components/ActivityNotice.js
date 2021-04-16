import React, { useEffect,useContext } from "react";
import { StatusBar, StyleSheet } from "react-native";
import Block from "./Block";
import Text from "./Text";
import * as theme from "../constants/theme.js";
import { UserContext } from "../context/UserContext.js";

export default ActivityNotice = () => {
  const context = useContext(UserContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibility(!context.activityNotice);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  if (context.activityNotice) {
    return (
      <Block style={styles.container}>
        <Text h4 color={theme.colors.white} numberOfLines={1}>
          {context.activityNoticeTitle}
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
    backgroundColor: theme.colors.green,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    top: StatusBar.currentHeight,
  },
});

import React from "react";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import * as theme from "../constants/theme";

const { width } = Dimensions.get("window");

export default OutlinedButton = ({ style, full, opacity, children, ...props }) => {
  const buttonStyles = [styles.button, full && styles.full, style];

  return (
    <TouchableOpacity
      style={buttonStyles}
      activeOpacity={opacity || 0.8}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.white,
    borderColor:theme.colors.black,
    borderWidth:1.5,
    borderRadius: 4,
    height: 55,
    paddingVertical: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  full: {
    width: width - 50,
  },
});

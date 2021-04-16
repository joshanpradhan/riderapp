import React from "react";
import { StyleSheet, View, TextInput, Dimensions } from "react-native";
import Text from "./Text";
import * as theme from "../constants/theme";

const { width } = Dimensions.get("window");

export default Input = ({
  label,
  rightLabel,
  full,
  email,
  phone,
  number,
  password,
  style,
  ...props
}) => {
  const inputStyles = [styles.input, full && styles.full, style];

  const inputType = email
    ? "email-address"
    : number
    ? "numeric"
    : phone
    ? "phone-pad"
    : "default";

  return (
    <View>
      <View style={styles.labelContainer}>
        <Text caption medium style={styles.label}>
          {label}
        </Text>
        {rightLabel}
      </View>
      <TextInput
        style={inputStyles}
        secureTextEntry={password}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={inputType}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.input,
    borderWidth: 0.5,
    borderColor: theme.colors.border,
    borderRadius: 5,
    fontSize: theme.sizes.font,
    color: theme.colors.black,
    height: 45,
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  label: {
    textTransform: "uppercase",
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  full: {
    width: width - 50,
  },
});

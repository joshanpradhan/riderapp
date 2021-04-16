import React from "react";
import Text from "./Text";
import * as theme from "../constants/theme.js";

export default ErrorMessage = ({ error, visible }) => {
  if (!visible || !error) return null;
  return (
    <Text
      style={{ marginVertical: 5, paddingRight: 15 }}
      bold
      color={theme.colors.red}
    >
      {error}
    </Text>
  );
};

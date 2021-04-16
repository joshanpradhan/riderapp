import React from "react";
import { Image } from "react-native";
import * as theme from "../constants/theme.js";
import Block from "./Block.js";
import Text from "./Text.js";

export default Empty = ({ title }) => {
  return (
    <Block center middle>
      <Block style={{ marginTop: 20 }}>
        <Image
          source={require("../assets/icons/box.png")}
          style={{ height: 100, width: 100 }}
        />
      </Block>
      <Text h3 color={theme.colors.gray} bold>
        No {title} available!
      </Text>
    </Block>
  );
};

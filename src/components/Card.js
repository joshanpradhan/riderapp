import React from "react";
import Block from "./Block";
import Text from "./Text";
import * as theme from "../constants/theme.js";
export default Card = ({ title, description,color }) => {
    return (
        <Block
        style={{
          paddingVertical: 5,
          paddingHorizontal: 15,
        }}
      >
      <Block
        style={{
          borderRadius:10,
          paddingVertical:10,
          paddingHorizontal: 20,
          backgroundColor:color
        }}
      >
        <Text h4 style={{ fontSize: 20 }} color={theme.colors.white}>
          {title}
        </Text>
        <Text bold paragraph color={theme.colors.white}>
          {description}
        </Text>
      </Block>
 
      </Block>
    );
};


import React from "react";
import Block from "./Block";
import Text from "./Text";
import * as theme from "../constants/theme.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default EventCard = ({
  club,
  eventDate,
  description,
  location,
  title,
  dateCreated,
}) => {
  return (
    <Block
      style={{
        paddingVertical: 5,
        paddingHorizontal: 15,
      }}
    >
      <Block
        style={{
          paddingVertical: 8,
          paddingHorizontal: 20,
          backgroundColor: theme.colors.maroon,
          borderRadius: 5,
        }}
      >
        <Text bold style={{ fontSize: 20 }} color={theme.colors.white}>
          {title}
        </Text>
        <Block row center>
          <MaterialCommunityIcons
            name="calendar-clock"
            size={20}
            color={theme.colors.white}
            style={{ marginRight: 5 }}
          />

          <Text h4 center color={theme.colors.white}>
            {eventDate}
          </Text>
        </Block>

        <Block row center>
          <MaterialCommunityIcons
            name="map-marker"
            size={20}
            color={theme.colors.white}
            style={{ marginRight: 5 }}
          />
          <Text h4 center color={theme.colors.white}>
            {location}
          </Text>
        </Block>

        <Block row center>
          <MaterialCommunityIcons
            name="account-supervisor-circle"
            size={20}
            color={theme.colors.white}
            style={{ marginRight: 5 }}
          />

          <Text h4 center color={theme.colors.white}>
            {club}
          </Text>
        </Block>
        <Block
          style={{
            borderWidth: 0.5,
            borderColor: theme.colors.white,
            marginVertical: 5,
          }}
        />

        <Text bold paragraph color={theme.colors.white}>{description}</Text>
        <Block
          center
          style={{
            alignItems: "flex-end",
          }}
        >
          <Text paragraph color={theme.colors.white}>{dateCreated}</Text>
        </Block>
      </Block>
    </Block>
  );
};
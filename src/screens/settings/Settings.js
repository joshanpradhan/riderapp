import React,{useContext} from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import * as theme from "../../constants/theme.js";
import setting from "../../constants/setting.js";
import { Block, Text } from "../../components/Index.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserContext } from "../../context/UserContext.js";

export default Settings = ({navigation }) => {
  const user = useContext(UserContext);

  const onPressLogOut = () => {
    Alert.alert("Log Out", "Are you sure you want to log out", [
      { text: "Yes", onPress: () => handleLogOut() },
      { text: "No" },
    ]);
  };

  const handleLogOut = async () => {
    console.log("Joshan");
    try {
        user.setUser();
        user.setJwt();
        navigation.navigate("Welcome");
    } catch (error) {
      console.log("handleLogOut error");
      console.log(error);
    }
  };

  const logOut = () => {
    return (
      <TouchableOpacity
        onPress={onPressLogOut}
        activeOpacity={0.7}
        style={{
          paddingVertical: 15,
          paddingHorizontal: 20,
          backgroundColor: theme.colors.white,
        }}
      >
        <Block row style={{ paddingHorizontal: 15 }}>
          <MaterialCommunityIcons
            name="logout"
            color={theme.colors.black}
            size={22}
          />
          <Text bold style={{ fontSize: 18, marginLeft: 15, marginTop: 2 }}>
            Log Out
          </Text>
        </Block>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={setting}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => {
        return item.id;
      }}
      ListFooterComponent={logOut}
      ListFooterComponentStyle={{
        borderWidth: 1,
        borderColor: theme.colors.gray,
      }}
      ItemSeparatorComponent={() => {
        return <View style={styles.separator} />;
      }}
      renderItem={(post) => {
        const item = post.item;
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.title)}
            activeOpacity={0.7}
            style={{
              paddingVertical: 15,
              paddingHorizontal: 20,
              backgroundColor: theme.colors.white,
            }}
          >
            <Block row style={{ paddingHorizontal: 15 }}>
              <MaterialCommunityIcons
                name={item.icon}
                color={theme.colors.black}
                size={22}
              />
              <Text bold style={{ fontSize: 18, marginLeft: 15, marginTop: 2 }}>
                {item.title}
              </Text>
            </Block>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  /******** card **************/
  separator: {
    borderWidth: 0.5,
    borderColor: theme.colors.gray,
  },
});

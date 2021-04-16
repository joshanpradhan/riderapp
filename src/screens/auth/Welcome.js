import React from "react";
import { StyleSheet, Image } from "react-native";
import {Button,OutlinedButton,Block,Text} from "../../components/Index.js";
import * as theme from "../../constants/theme.js";

export default Login = ({ navigation }) => {
  return (
    <Block center middle>
      <Block middle center style={{marginTop:50}}>
        <Image
          source={require("../../assets/icons/scooter.png")}
          style={{ height:150, width: 150 }}
        />
      </Block>
      <Block flex={2.5} center>
        <Text h2 style={{ marginBottom: 6 }}>
          Welcome to Apexlyft
        </Text>

        <Block center style={{ marginTop: 44 }}>
          <Button
            full
            style={{ marginBottom: 12 }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text button>Already have account? Log In</Text>
          </Button>

          <OutlinedButton
            full
            style={{ marginBottom: 12 }}
            onPress={() => navigation.navigate("Register")}
          >
            <Text outlinedButton>Create an account</Text>
          </OutlinedButton>
        </Block>
      </Block>
    </Block>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:theme.colors.white
  
  },
});

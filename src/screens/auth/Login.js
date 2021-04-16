import React, { useState, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import {
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { showMessage } from "react-native-flash-message";
import { ridersUrl } from "../../constants/url.js";
import { UserContext } from "../../context/UserContext.js";
import * as theme from "../../constants/theme.js";
import {
  Button,
  Block,
  Text,
  Input,
  ErrorMessage,
} from "../../components/Index.js";
import axios from "axios";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).max(50).label("Password"),
});

export default Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const context = useContext(UserContext);

  onSubmitLogin = async (values) => {
    const { email, password } = values;
    try {
      await axios({
        method: "GET",
        url: ridersUrl,
        data: {
          "email": email,
        },
      }).then(function (response) {
        const currentUser = response.data.find((item) => {
          if (item.email == email && item.password === password) {
            return item;
          }
        });
      if(currentUser!==undefined){
        showMessage({
          message: "Logged in successfully",
          type: "success",
        });
        context.setUser(currentUser);
        console.log("Joshan Data");
        setLoading(false);
        navigation.navigate("MainTab");
      }else{
        showMessage({
          message: "Please check your credentials. Try again!!",
          type: "danger",
        });
        setLoading(false);
      }
      });
    } catch (error) {
      showMessage({
        message: "Please check your credentials. Try again!",
        type: "danger",
      });
      setLoading(false);
    }
   
  };
  return (
    <KeyboardAwareScrollView
      style={{ marginVertical: 10 }}
      showsVerticalScrollIndicator={false}
    >
      <KeyboardAvoidingView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Block center middle>
            <Block style={{ marginTop: 20 }}>
              <Image
                source={require("../../assets/icons/scooter.png")}
                style={{ height: 100, width: 100 }}
              />
            </Block>
            <Block flex={2.5} center>
              <Text h3 style={{ marginBottom: 6 }} color={theme.colors.maroon}>
                Log in to Ride Sharing
              </Text>
              <Text paragraph color={theme.colors.maroon}>
                Please enter your credentials to proceed.
              </Text>
              <Block center style={{ marginTop: 44 }}>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  onSubmit={(values) => {
                    setLoading(!loading);
                    onSubmitLogin(values);
                  }}
                  validationSchema={validationSchema}
                >
                  {({
                    handleChange,
                    touched,
                    setFieldTouched,
                    handleSubmit,
                    values,
                    errors,
                  }) => (
                    <Block>
                      <Input
                        full
                        email
                        autoFocus={true}
                        label="Email address"
                        style={{ marginBottom: 5 }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={handleChange("email")}
                        onBlur={() => setFieldTouched("email")}
                        value={values.email}
                      />
                      <ErrorMessage
                        error={errors.email}
                        visible={touched.email}
                      />
                      <Input
                        full
                        password
                        label="Password"
                        style={{ marginBottom: 5 }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={handleChange("password")}
                        onBlur={() => setFieldTouched("password")}
                        value={values.password}
                        rightLabel={
                          <Text
                            bold
                            color="black"
                            onPress={() =>
                              navigation.navigate("Forgot Password")
                            }
                          >
                            Forgot password?
                          </Text>
                        }
                      />
                      <ErrorMessage
                        error={errors.password}
                        visible={touched.password}
                      />

                      {!errors.email && !errors.password ? (
                        <Button
                          full
                          style={{
                            marginBottom: 12,
                          }}
                          onPress={handleSubmit}
                        >
                          {loading ? (
                            <ActivityIndicator
                              size="small"
                              color={theme.colors.white}
                            />
                          ) : (
                            <Text button>Log In</Text>
                          )}
                        </Button>
                      ) : (
                        <Button
                          full
                          style={{
                            marginBottom: 12,
                            backgroundColor: theme.colors.gray,
                          }}
                          disabled={true}
                        >
                          <Text button>Log In</Text>
                        </Button>
                      )}

                      <Block center>
                        <Text h4 color="black">
                          Don't have an account?{" "}
                          <Text
                            h4
                            height={18}
                            color={theme.colors.maroon}
                            onPress={() => navigation.navigate("Register")}
                          >
                            Register
                          </Text>
                        </Text>
                      </Block>
                    </Block>
                  )}
                </Formik>
              </Block>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:theme.colors.white,
  },
});

import React, { useState, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import {
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import * as theme from "../../constants/theme.js";
import {
  Button,
  Block,
  Text,
  Input,
  ErrorMessage,
} from "../../components/Index.js";
import axios from "axios";
import { UserContext } from "../../context/UserContext.js";
import { showMessage } from "react-native-flash-message";
import { ridersUrl } from "../../constants/url.js";


const validationSchema = Yup.object().shape({
  fullName: Yup.string().required().min(6).max(50).label("Full name"),
  email: Yup.string().required().email().label("Email"),
  mobileNo: Yup.number().required().min(10).positive().label("Mobile No"),
});
export default Profile = ({ navigation }) => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const context = useContext(UserContext);
  console.log("Joshan Data");
  console.log(context.user);
  onSubmitSaveChanges = async (values) => {

    const { fullName, email, mobileNo } = values;
    try {
      await axios({
        method: "PUT",
        url: `${ridersUrl}/${context.user.id}`,
        data: {
          fullName: fullName,
          email: email,
          mobileNo: mobileNo,
        },
      }).then(function (response) {
        showMessage({
          message: "Successfully changed your profile details",
          type: "success",
        });
        console.log(response.data)
        context.setUser(response.data);
        setLoading(false);
        setEditing(false);
      });
    } catch (error) {
      console.log(error);
      showMessage({
        message: "Sorry, we could not proceed your request.",
        type: "danger",
      });
      setLoading(false);
      setEditing(false);
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
            <Block flex={2.5} center>
              <Text h3 style={{ marginBottom: 6 }} color={theme.colors.maroon}>
                Your profile details
              </Text>
              <Block center style={{ marginTop: 44 }}>
                <Formik
                  initialValues={{
                    email: context.user.email,
                    fullName: context.user.fullName,
                    mobileNo: context.user.mobileNo,
                  }}
                  onSubmit={(values) => {
                    setLoading(!loading);
                    onSubmitSaveChanges(values);
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
                        label="Full name"
                        autoFocus={editing ? true : false}
                        style={{ marginBottom: 5 }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={handleChange("fullName")}
                        onBlur={() => setFieldTouched("fullName")}
                        value={values.fullName}
                        editable={editing ? true : false}
                      />
                      <ErrorMessage
                        error={errors.fullName}
                        visible={touched.fullName}
                      />

                      <Input
                        full
                        email
                        label="Email address"
                        style={{ marginBottom: 5 }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={handleChange("email")}
                        onBlur={() => setFieldTouched("email")}
                        value={values.email}
                        editable={editing ? true : false}
                      />
                      <ErrorMessage
                        error={errors.email}
                        visible={touched.email}
                      />
                      <Input
                        full
                        phone
                        label="Mobile no (+977)"
                        style={{ marginBottom: 5 }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={handleChange("mobileNo")}
                        onBlur={() => setFieldTouched("mobileNo")}
                        value={values.mobileNo}
                        editable={editing ? true : false}
                      />
                      <ErrorMessage
                        error={errors.mobileNo}
                        visible={touched.mobileNo}
                      />
                      {!errors.fullName && !errors.email && !errors.mobileNo ? (
                        editing ? (
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
                              <Text button>Save changes</Text>
                            )}
                          </Button>
                        ) : (
                          <Button
                            full
                            style={{
                              marginBottom: 12,
                              backgroundColor: theme.colors.maroon,
                            }}
                            onPress={() => setEditing(!editing)}
                          >
                            <Text button>Edit Detail</Text>
                          </Button>
                        )
                      ) : (
                        <Button
                          full
                          style={{
                            marginBottom: 12,
                            backgroundColor: theme.colors.maroon,
                          }}
                          onPress={() => setEditing(!editing)}
                        >
                          <Text button>Edit Detail</Text>
                        </Button>
                      )}
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
  },
});

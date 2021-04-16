import React, { useState } from "react";
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

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required()
    .min(6)
    .max(50)
    .label("Current Password"),
  newPassword: Yup.string().required().min(6).max(50).label("New Password"),
  confirmPassword: Yup.string()
    .required()
    .min(6)
    .max(50)
    .oneOf(
      [Yup.ref("newPassword"), null],
      "New password and  confirm password must match"
    )
    .label("Confirm Password"),
});

export default ChangePassword = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(true);

  const onSubmitChangePassword = (values) => {
    setCurrentPassword(values.currentPassword);
    setNewPassword(values.newPassword);
    setConfirmPassword(values.confirmPassword);
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
                Change your password
              </Text>
              <Text paragraph color={theme.colors.maroon}>
                Please enter your credentials
              </Text>
              <Block center style={{ marginTop: 44 }}>
                <Formik
                  initialValues={{
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  }}
                  onSubmit={(values) => onSubmitChangePassword(values)}
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
                        password
                        autoFocus={true}
                        label="Current Password"
                        style={{ marginBottom: 5 }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={handleChange("currentPassword")}
                        onBlur={() => setFieldTouched("currentPassword")}
                        value={values.currentPassword}
                      />
                      <ErrorMessage
                        error={errors.currentPassword}
                        visible={touched.currentPassword}
                      />

                      <Input
                        full
                        password
                        label="New Password"
                        style={{ marginBottom: 5 }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={handleChange("newPassword")}
                        onBlur={() => setFieldTouched("newPassword")}
                        value={values.newPassword}
                      />
                      <ErrorMessage
                        error={errors.newPassword}
                        visible={touched.newPassword}
                      />

                      <Input
                        full
                        password
                        label="Confirm Password"
                        style={{ marginBottom: 5 }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={handleChange("confirmPassword")}
                        onBlur={() => setFieldTouched("confirmPassword")}
                        value={values.confirmPassword}
                      />
                      <ErrorMessage
                        error={errors.confirmPassword}
                        visible={touched.confirmPassword}
                      />

                      {!errors.currentPassword &&
                      !errors.newPassword &&
                      !errors.confirmPassword ? (
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
                            <Text button>Change Password</Text>
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
                          <Text button>Change Password</Text>
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

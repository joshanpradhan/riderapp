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
  vehicleBrand: Yup.string().required().label("Vehicle Brand"),
  vehicleType: Yup.string().required().label("Vehicle Type"),
  vehicleColor: Yup.string().required().label("Vehicle Color"),
  vehicleNumber: Yup.string().required().label("Vehicle Number"),
  licenseNumber: Yup.string().required().label("License Number"),
  citizenshipNumber: Yup.string().required().label("Citizenship Number"),
});

export default VehicleDetail = ({ navigation }) => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const context = useContext(UserContext);

  onSubmitSaveChanges = async (values) => {
    const {
      vehicleType,
      vehicleBrand,
      vehicleColor,
      vehicleNumber,
      licenseNumber,
      citizenshipNumber,
    } = values;
    try {
      await axios({
        method: "PUT",
        url: `${ridersUrl}/${context.user.id}`,
        data: {
          "vehicleType": vehicleType,
          "vehicleBrand": vehicleBrand,
          "vehicleNumber": vehicleNumber,
          "vehicleColor": vehicleColor,
          "licenseNumber": licenseNumber,
          "citizenshipNumber": citizenshipNumber
        },
      }).then(function (response) {
        showMessage({
          message: "Successfully changed your vehicle details",
          type: "success",
        });
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
      style={{ marginVertical: 0 }}
      showsVerticalScrollIndicator={false}
    >
      <KeyboardAvoidingView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Block center middle>
            <Block flex={2.5} center>
              <Text h3 style={{ marginBottom: 2 }} color={theme.colors.maroon}>
                Your vehicle details
              </Text>
              <Block center style={{ marginTop: 44 }}>
                <Formik
                  initialValues={{
                    vehicleBrand: context.user.vehicleBrand,
                    vehicleType: context.user.vehicleType,
                    vehicleColor: context.user.vehicleColor,
                    vehicleNumber: context.user.vehicleNumber,
                    licenseNumber: context.user.vehicleNumber,
                    citizenshipNumber: context.user.citizenshipNumber,
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
                        label="Vehicle Brand(Example: Yamaha)"
                        style={{ marginBottom: 5 }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={handleChange("vehicleBrand")}
                        onBlur={() => setFieldTouched("vehicleBrand")}
                        value={values.vehicleBrand}
                        editable={editing ? true : false}
                      />
                      <ErrorMessage
                        error={errors.vehicleBrand}
                        visible={touched.vehicleBrand}
                      />
                      <Input
                        full
                        label="Vehicle Type(Example: Scooter)"
                        style={{ marginBottom: 5 }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={handleChange("vehicleType")}
                        onBlur={() => setFieldTouched("vehicleType")}
                        value={values.vehicleType}
                        editable={editing ? true : false}
                      />
                      <ErrorMessage
                        error={errors.vehicleType}
                        visible={touched.vehicleType}
                      />

                      <Input
                        full
                        label="Vehicle Color(Example: Blue)"
                        style={{ marginBottom: 5 }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={handleChange("vehicleColor")}
                        onBlur={() => setFieldTouched("vehicleColor")}
                        value={values.vehicleColor}
                        editable={editing ? true : false}
                      />
                      <ErrorMessage
                        error={errors.vehicleColor}
                        visible={touched.vehicleColor}
                      />

                      <Input
                        full
                        label="Vehicle Number(Example: ba-1-ja-2345)"
                        style={{ marginBottom: 5 }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={handleChange("vehicleNumber")}
                        onBlur={() => setFieldTouched("vehicleNumber")}
                        value={values.vehicleNumber}
                        editable={editing ? true : false}
                      />
                      <ErrorMessage
                        error={errors.vehicleNumber}
                        visible={touched.vehicleNumber}
                      />
                      <Input
                        full
                        label="License Number(Eample: 92-1231312)"
                        style={{ marginBottom: 5 }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={handleChange("licenseNumber")}
                        onBlur={() => setFieldTouched("licenseNumber")}
                        value={values.licenseNumber}
                        editable={editing ? true : false}
                      />

                      <ErrorMessage
                        error={errors.licenseNumber}
                        visible={touched.licenseNumber}
                      />

                      <Input
                        full
                        label="Citizenship Number(Example: 19-127389-1239182)"
                        style={{ marginBottom: 5 }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={handleChange("citizenshipNumber")}
                        onBlur={() => setFieldTouched("citizenshipNumber")}
                        value={values.citizenshipNumber}
                        editable={editing ? true : false}
                      />
                      <ErrorMessage
                        error={errors.citizenshipNumber}
                        visible={touched.citizenshipNumber}
                      />

                      {!errors.vehicleType &&
                      !errors.vehicleBrand &&
                      !errors.vehicleColor &&
                      !errors.vehicleNumber &&
                      !errors.licenseNumber &&
                      !errors.citizenshipNumber ? (
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

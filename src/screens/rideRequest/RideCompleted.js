import React, { useState, useContext,useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import {
  TouchableWithoutFeedback,
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import * as theme from "../../constants/theme.js";
import {Button,Block,Text,Input,ErrorMessage} from "../../components/Index.js";
import { showMessage } from "react-native-flash-message";
import { UserContext } from "../../context/UserContext.js";
import axios from 'axios';
import { ridersUrl,rideHistoryUrl } from "../../constants/url.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object().shape({
  verificationCode: Yup.string().required().min(6).label("Verification Code"),
});
export default RideCompleted = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const context = useContext(UserContext);

  const getAsyncValue = async () => {
    try {
      await AsyncStorage.getItem("@rideHistory").then((jsonvalue) => {
        setData(JSON.parse(jsonvalue))
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmitVerification = async (values,data) => {
    console.log(data.verificationCode);
  const { verificationCode } = values;
   const newWalletBalance=parseInt(context.user.walletBalance)+30;
   const newRideCompleted=parseInt(context.user.newRideCompleted)+1;

    if(verificationCode==data.verificationCode){
      try {
        await axios({
          method: "PUT",
          url:`${rideHistoryUrl}/${data.rideHistoryId}`,
          data: {
            rideStatus: "Verified",
          },
        }).then(function (response) {
          
        });
      } catch (error) {
        showMessage({
          message: "Sorry, we could not proceed your request. Try again!",
          type: "danger",
        });
        setLoading(false);
      }
        try {
          await axios({
            method: "PUT",
            url: `${ridersUrl}/${context.user.id}`,
            data: {
              walletBalance: newWalletBalance,
              newRideCompleted:newRideCompleted
            },
          }).then(function (response) {
            console.log(response.data)
            context.setUser(response.data)
            navigation.navigate("Ride Request");
            showMessage({
              message: "Congratulations, code has been added successfully",
              type: "success",
            });
            setLoading(false);
          });
        } catch (error) {
          showMessage({
            message: "Sorry, we could not proceed your request. Try again!",
            type: "danger",
          });
          setLoading(false);
        }
    }else{
      showMessage({
        message: "Sorry, your code has not been verified. Please try again",
        type: "danger",
      });
      setLoading(false);
    }
  };
  useEffect(() => {
    const source = axios.CancelToken.source();
    getAsyncValue();
    return () => {
      source.cancel();
    };
  }, []);

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
              <Block>
                <Text>Enter the verification code given by your passenger</Text>
                </Block>
              <Block center style={{ marginTop: 44 }}>
                <Formik
                  initialValues={{ verificationCode: "" }}
                  onSubmit={(values) => {
                    setLoading(!loading);
                    onSubmitVerification(values,data);
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
                        number
                        autoFocus={true}
                        label="Enter verification code"
                        style={{ marginBottom: 5 }}
                        onChangeText={handleChange("verificationCode")}
                        onBlur={() => setFieldTouched("verificationCode")}
                        value={values.verificationCode}
                      />
                      <ErrorMessage
                        error={errors.verificationCode}
                        visible={touched.verificationCode}
                      />
                      {!errors.verificationCode ? (
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
                            <Text button>Submit code</Text>
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
                          <Text button>Submit code</Text>
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

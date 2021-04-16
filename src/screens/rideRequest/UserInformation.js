import React, { useState, useEffect, useContext } from "react";
import { Image, Linking, Platform, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as theme from "../../constants/theme.js";
import { Button, Block, Text, OutlinedButton } from "../../components/Index.js";
import { showMessage } from "react-native-flash-message";
import { UserContext } from "../../context/UserContext.js";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { rideHistoryUrl, userProfileUrl } from "../../constants/url.js";
import * as Notifications from "expo-notifications";

export default UserInformation = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [userInfo, setUserInfo] = useState();

  const context = useContext(UserContext);
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  const getAsyncValue = async () => {
    try {
      await AsyncStorage.getItem("@rideHistory").then((jsonvalue) => {
        setData(JSON.parse(jsonvalue));
        getUserProfileData(JSON.parse(jsonvalue));
        checkUserAction(JSON.parse(jsonvalue));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitStartRide = async (jsonvalue) => {
    try {
      await axios({
        method: "PUT",
        url: `${rideHistoryUrl}/${jsonvalue.rideHistoryId}`,
        data: {
          rideStatus: "Riding",
        },
      }).then(function (response) {
        navigation.navigate("Start Ride");
        setLoading(false);
      });
    } catch (error) {
      showMessage({
        message: "Sorry, we could not proceed your request. Try again!",
        type: "danger",
      });
      setLoading(false);
    }
  };

  const MakeCall = () => {
    if (Platform.OS !== "android") {
      mobileNo = `telprompt:${userInfo.mobileNo}`;
    } else {
      mobileNo = `tel:${userInfo.mobileNo}`;
    }
    Linking.canOpenURL(mobileNo)
      .then((supported) => {
        if (!supported) {
          showMessage({
            message: "Number is not available",
            type: "info",
          });
        } else {
          return Linking.openURL(mobileNo);
        }
      })
      .catch((err) => console.log(err));
  };

  const LeaveMessage = () => {
    if (Platform.OS !== "android") {
      sms = `sms:${userInfo.mobileNo}`;
    } else {
      sms = `sms:${userInfo.mobileNo}`;
    }
    Linking.canOpenURL(sms)
      .then((supported) => {
        if (!supported) {
          showMessage({
            message: "Number is not available",
            type: "info",
          });
        } else {
          return Linking.openURL(sms);
        }
      })
      .catch((err) => console.log(err));
  };

  const CancelRide = async (jsonvalue) => {
    console.log(jsonvalue.rideHistoryId);
    try {
      await axios({
        method: "PUT",
        url: `${rideHistoryUrl}/${jsonvalue.rideHistoryId}`,
        data: {
          rideStatus: "Cancelled",
          // riderCancelNote: riderCancelNote,
        },
      }).then(async (response) => {
        showMessage({
          message: "Successfully cancelled ride request",
          type: "success",
        });
        await sendPushNotification(
          response.data.passenger.expoPushToken,
          context.user.fullName
        );
        navigation.navigate("Ride Request");
        setLoading(false);
      });
    } catch (error) {
      showMessage({
        message: "Sorry, we could not proceed your request. Try again!",
        type: "danger",
      });
      setLoading(false);
    }
  };

  const getUserProfileData = async (jsonvalue) => {
    try {
      await axios({
        method: "GET",
        url: `${userProfileUrl}/${jsonvalue.passengerId}`,
      }).then(function (response) {
        setUserInfo(response.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const checkUserAction = async (data) => {
    try {
      await axios({
        method: "GET",
        url: `${rideHistoryUrl}/${data.rideHistoryId}`,
      }).then(async (response) => {
        if (response.data.rideStatus == "Cancelled") {
          // navigation.navigate("Rider Information")
          navigation.navigate("Ride Request");
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    getAsyncValue();
    const interval = setInterval(() => {
      getAsyncValue();
    }, 5000);
    return () => {
      source.cancel();
      clearInterval(interval);
    };
  }, []);

  return (
    <Block>
      {loading ? (
        <Block center middle>
          <ActivityIndicator size="large" color={theme.colors.black} />
        </Block>
      ) : (
        <Block style={{ marginTop: 10 }}>
          <Block center middle style={{ flex: 1 }}>
            <Image
              source={require("../../assets/images/location.png")}
              style={{
                height: 150,
                width: 150,
                borderRadius: 70,
              }}
            />
          </Block>

          <Block
            style={{
              flex: 2,
              paddingHorizontal: 15,
            }}
          >
            <Block
              style={{
                paddingHorizontal: 5,
                paddingVertical: 10,
                borderRadius: 10,
                backgroundColor: theme.colors.white,
              }}
            >
              <Block
                row
                middle
                style={{
                  flex: 0.5,
                  paddingHorizontal: 20,
                }}
              >
                <Text h4 color={theme.colors.black}>
                  Passenger information
                </Text>
              </Block>

              <Block
                row
                style={{
                  flex: 0.5,
                  paddingHorizontal: 20,
                }}
              >
                <Text h4 color={theme.colors.black}>
                  Full name:
                </Text>
                <Text h4 color={theme.colors.black}>
                  {userInfo.fullName}
                </Text>
              </Block>

              <Block
                row
                style={{
                  flex: 0.5,
                  paddingHorizontal: 20,
                }}
              >
                <Text h4 color={theme.colors.black}>
                  Email:
                </Text>
                <Text h4 color={theme.colors.black}>
                  {userInfo.email}
                </Text>
              </Block>
              <Block
                row
                style={{
                  flex: 0.5,

                  paddingHorizontal: 20,
                }}
              >
                <Text h4 color={theme.colors.black}>
                  Mobile No:
                </Text>
                <Text h4 color={theme.colors.black}>
                  {userInfo.mobileNo}
                </Text>
              </Block>
              <Block
                row
                style={{
                  flex: 0.5,
                  paddingHorizontal: 20,
                }}
              >
                <Text h4 color={theme.colors.black}>
                  Pickup location:
                </Text>
                <Text h4 color={theme.colors.black}>
                  {data.pickupInfo}
                </Text>
              </Block>
              <Block
                row
                style={{
                  flex: 0.5,
                  paddingHorizontal: 20,
                }}
              >
                <Text h4 color={theme.colors.black}>
                  Destination location:
                </Text>
                <Text h4 color={theme.colors.black}>
                  {data.destinationInfo}
                </Text>
              </Block>
              <Block
                row
                style={{
                  flex: 0.5,
                  paddingHorizontal: 20,
                }}
              >
                <Text h4 color={theme.colors.black}>
                 Message:
                </Text>
                <Text h4 color={theme.colors.black}>
                  {data.riderMessage}
                </Text>
              </Block>
              <Block
                row
                style={{
                  flex: 0.5,
                  paddingHorizontal: 20,
                }}
              >
                <Text h4 color={theme.colors.black}>
                  Cost:
                </Text>
                <Text h4 color={theme.colors.black}>
                {'\u20B9'} {data.cost}
                </Text>
              </Block>

              <Block
                style={{
                  paddingHorizontal: 20,
                }}
              >
                <OutlinedButton onPress={() => onSubmitStartRide(data)}>
                  <Block row center>
                    <Text outlinedButton>Start ride</Text>
                    <MaterialCommunityIcons
                      name="directions-fork"
                      size={24}
                      color={theme.colors.black}
                      style={{ marginLeft: 5 }}
                    />
                  </Block>
                </OutlinedButton>
              </Block>
              <Block
                style={{
                  paddingHorizontal: 20,
                }}
              >
                <OutlinedButton onPress={() => MakeCall()}>
                  <Block row center>
                    <Text outlinedButton>Give Call</Text>
                    <MaterialCommunityIcons
                      name="cellphone-iphone"
                      size={24}
                      color={theme.colors.black}
                      style={{ marginLeft: 5 }}
                    />
                  </Block>
                </OutlinedButton>
              </Block>
              <Block
                style={{
                  paddingHorizontal: 20,
                }}
              >
                <OutlinedButton onPress={() => LeaveMessage()}>
                  <Block row center>
                    <Text outlinedButton>Leave message</Text>
                    <MaterialCommunityIcons
                      name="message-text"
                      size={24}
                      color={theme.colors.black}
                      style={{ marginLeft: 5 }}
                    />
                  </Block>
                </OutlinedButton>
              </Block>

              <Block
                style={{
                  paddingHorizontal: 20,
                }}
              >
                <Button
                  style={{
                    backgroundColor: theme.colors.red,
                  }}
                  onPress={() => CancelRide(data)}
                >
                  <Block row center>
                    <Text button>Cancel Ride</Text>
                  </Block>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      )}
    </Block>
  );
};

async function sendPushNotification(expoPushToken, fullName) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Sorry",
    body: `${fullName} has cancelled your ride`,
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

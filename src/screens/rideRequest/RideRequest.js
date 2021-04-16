import React, { useState, useEffect, useContext, useRef } from "react";
import {
  RefreshControl,
  ActivityIndicator,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as theme from "../../constants/theme.js";
import { Block, Text, Empty } from "../../components/Index.js";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import { UserContext } from "../../context/UserContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { rideHistoryUrl,ridersUrl } from "../../constants/url.js";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
export default RideRequest = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [rideRequestData, setRideRequestData] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();

  const context = useContext(UserContext);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getRideRequestData();
    setRefreshing(false);
  });

  const AcceptRequest = async (
    rideHistoryId,
    passengerId,
    riderMessage,
    passenger
  ) => {
    var verificationCode = Math.floor(100000 + Math.random() * 900000);
    try {
      await axios({
        method: "PUT",
        url: `${rideHistoryUrl}/${rideHistoryId}`,
        data: {
          rider: context.user.id,
          rideStatus: "Accepted",
          verificationCode: verificationCode,
        },
      }).then(async (response) => {
        showMessage({
          message: `Sending notification to ${passenger}`,
          type: "success",
        });
        const riderId = response.data.rider.id;
        await AsyncStorage.setItem(
          "@rideHistory",
          JSON.stringify({
            rideHistoryId: rideHistoryId,
            passengerId: passengerId,
            riderId: riderId,
            verificationCode: verificationCode,
            riderMessage: riderMessage,
            passenger: passenger,
            pickupInfo: response.data.pickupInfo,
            destinationInfo: response.data.destinationInfo,
            cost: response.data.cost,
          })
        );
        context.setRideHistory({
          rideHistoryId: rideHistoryId,
          passengerId: passengerId,
          verificationCode: verificationCode,
          riderMessage: riderMessage,
          passenger: passenger,
        });
        navigation.navigate("User Information", {
          rideHistoryId: rideHistoryId,
          passengerId: passengerId,
        });
        setLoading(false);
        await sendPushNotification(response.data.passenger.expoPushToken, context.user.fullName);
      });
    } catch (error) {
      showMessage({
        message: "Sorry, we could not proceed your request.",
        type: "danger",
      });
      setLoading(false);
    }
    try {
      await axios({
        method: "PUT",
        url: `${ridersUrl}/${context.user.id}`,
        data: {
          citizenshipNumber:expoPushToken,
          //replace citizen number with expoPushToken in database model
        },
      }).then(async(response)=>{
        setLoading(false);
      })
      
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getRideRequestData = async () => {
    try {
      await axios({
        method: "GET",
        url: rideHistoryUrl,
      }).then(function (response) {
        const currentRide = response.data.find((item) => {
          const rider = item.rider;
          if (
            (item.rideStatus == "Accepted" ||
              item.rideStatus == "Riding") &&
            rider.id == context.user.id
          ) {
            return item;
          }
        });
        if (currentRide !== undefined) {
          navigation.navigate("User Information");
        }

        const pendingData = response.data.filter((item) => {
          return item.rideStatus == "Pending";
        });

        setRideRequestData(pendingData);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    getRideRequestData();
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener();
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener();
    return () => {
      source.cancel();

      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  const Item = ({
    rideHistoryId,
    passengerId,
    passenger,
    rideStatus,
    dateCreated,
    cost,
    pickupInfo,
    destinationInfo,
    riderMessage,
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
            backgroundColor: theme.colors.white,
            borderRadius: 10,
            paddingVertical: 8,
            paddingHorizontal: 20,
          }}
        >
          <Block row>
            <Block row center>
              <Image
                source={require("../../assets/icons/user.png")}
                style={{ height: 25, width: 25, marginRight: 2 }}
              />
              <Text
                bold
                color={theme.colors.black}
                style={{ paddingHorizontal: 8, fontSize: 12 }}
              >
                {passenger}
              </Text>
            </Block>

            <Block
              style={{
                alignItems: "flex-end",
              }}
            >
              <Block
                style={{
                  padding: 5,
                  backgroundColor: theme.colors.yellow,
                  borderRadius: 20,
                }}
              >
                <Text
                  bold
                  color={theme.colors.white}
                  style={{ paddingHorizontal: 8, fontSize: 12 }}
                >
                  {rideStatus}
                </Text>
              </Block>
            </Block>
          </Block>

          <Block row>
            <Block row center>
              <MaterialCommunityIcons
                name="timetable"
                size={20}
                color={theme.colors.gray}
                style={{ marginRight: 5 }}
              />
              <Text
                bold
                color={theme.colors.black}
                style={{ paddingHorizontal: 8, fontSize: 12 }}
              >
                {dateCreated}
              </Text>
            </Block>
            <Block
              center
              style={{
                alignItems: "flex-end",
              }}
            >
              <Text
                bold
                color={theme.colors.black}
                style={{ paddingHorizontal: 8, fontSize: 12 }}
              >
                {'\u20B9'} {cost}
              </Text>
            </Block>
          </Block>

          <Block
            style={{
              borderWidth: 0.5,
              borderColor: theme.colors.gray,
              marginVertical: 2,
            }}
          />
          <Block row center>
            <MaterialCommunityIcons
              name="human-greeting"
              size={16}
              color={theme.colors.gray}
              style={{ marginRight: 2 }}
            />
            <Text
              bold
              color={theme.colors.black}
              style={{ paddingHorizontal: 8, fontSize: 12 }}
            >
              {pickupInfo}
            </Text>
          </Block>
          <Block row>
            <Ionicons
              name="ios-ellipsis-vertical-sharp"
              size={16}
              color={theme.colors.gray}
            />
          </Block>
          <Block row center>
            <MaterialCommunityIcons
              name="map-marker"
              size={16}
              color={theme.colors.gray}
              style={{ marginRight: 5, marginBottom: 2 }}
            />
            <Text
              bold
              color={theme.colors.black}
              style={{ paddingHorizontal: 8, fontSize: 12 }}
            >
              {destinationInfo}
            </Text>
          </Block>

          <Block
            row
            middle
            style={{ justifyContent: "space-between", marginTop: 5 }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                borderRadius: 20,
                borderWidth: 1.5,
                borderColor: theme.colors.yellow,
                paddingHorizontal: 10,
                paddingVertical: 8,
              }}
              onPress={() =>
                navigation.navigate("UserLocationDestination", {
                  rideHistoryId: rideHistoryId,
                })
              }
            >
              <Text bold color={theme.colors.yellow}>
                View on map
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                borderRadius: 20,
                borderWidth: 1.5,
                borderColor: theme.colors.green,
                paddingHorizontal: 10,
                paddingVertical: 8,
              }}
              onPress={() =>
                AcceptRequest(
                  rideHistoryId,
                  passengerId,
                  riderMessage,
                  passenger
                )
              }
            >
              <Text bold color={theme.colors.green}>
                Accept Request
              </Text>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <Block center middle>
          <ActivityIndicator size="large" color={theme.colors.black} />
        </Block>
      ) : (
        <FlatList
          data={rideRequestData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => {
            return item.id.toString();
          }}
          ListEmptyComponent={() => <Empty title="rides" />}
          refreshControl={
            <RefreshControl
              colors={[theme.colors.black]}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          renderItem={(post) => (
            <Item
              rideHistoryId={post.item.id}
              passengerId={post.item.passenger.id}
              passenger={post.item.passenger.fullName}
              verificationCode={post.item.verificationCode}
              dateCreated={post.item.created_at}
              cost={post.item.cost}
              rideStatus={post.item.rideStatus}
              pickupInfo={post.item.pickupInfo}
              destinationInfo={post.item.destinationInfo}
              riderMessage={post.item.riderMessage}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

async function sendPushNotification(expoPushToken, fullName) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Congratulations",
    body: `${fullName} has accepted your ride request`,
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

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

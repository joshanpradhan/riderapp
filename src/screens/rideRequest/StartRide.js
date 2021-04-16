import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import * as theme from "../../constants/theme.js";
import { Button, Block, Text } from "../../components/Index.js";
import { UserContext } from "../../context/UserContext.js";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { rideHistoryUrl } from "../../constants/url.js";

export default StartRide = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [rideRequestData, setRideRequestData] = useState();
  const [data, setData] = useState();

  const context = useContext(UserContext);  

  const getAsyncValue = async () => {
    try {
      await AsyncStorage.getItem("@rideHistory").then((jsonvalue) => {
        setData(JSON.parse(jsonvalue))
        getRideRequestData(JSON.parse(jsonvalue));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getRideRequestData = async (jsonvalue) => {
    try {
      await axios({
        method: "GET",
        url:`${rideHistoryUrl}/${jsonvalue.rideHistoryId}`,
           }).then(function (response) {
        setRideRequestData(response.data);
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

  const onSubmitCompleted = async (jsonvalue) => {
        try {
          await axios({
            method: "PUT",
            url:`${rideHistoryUrl}/${jsonvalue.rideHistoryId}`,
            data: {
              rideStatus: "Completed",
            },
          }).then(function (response) {
            navigation.navigate("Ride Completed");
            setLoading(false);
          });
        } catch (error) {
          showMessage({
            message: "Sorry, we could not proceed your request. Try again!",
            type: "danger",
          });
          setLoading(false);
        }
    }

    useEffect(() => {
      const source = axios.CancelToken.source();
      getAsyncValue();
      return () => {
        source.cancel();
      };
    }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <Block center middle>
          <ActivityIndicator size="large" color={theme.colors.black} />
        </Block>
      ) : (
        <Block>
          <MapView
            style={{ flex: 3 }}
            initialRegion={{
              latitude: rideRequestData.pickupPointLatitudeCoordinate,
              longitude: rideRequestData.pickupPointLongitudeCoordinate,
              latitudeDelta: 0.045,
              longitudeDelta: 0.045,
            }}
            rotateEnabled={false}
            loadingEnabled={true}
          >
            <Marker
              title={"User location"}
              coordinate={{
                latitude: rideRequestData.pickupPointLatitudeCoordinate,
                longitude: rideRequestData.pickupPointLongitudeCoordinate,
              }}
            >
              <MaterialCommunityIcons
                name="human-greeting"
                size={30}
                color={theme.colors.black}
              />
            </Marker>
            <Marker
              title={"User destination"}
              coordinate={{
                latitude: rideRequestData.destinationPointLatitudeCoordinate,
                longitude: rideRequestData.destinationPointLongitudeCoordinate,
              }}
            >
              <MaterialCommunityIcons
                name="map-marker"
                size={30}
                color={theme.colors.black}
              />
            </Marker>
            <MapView.Polyline
              coordinates={[
                {
                  latitude: rideRequestData.pickupPointLatitudeCoordinate,
                  longitude: rideRequestData.pickupPointLongitudeCoordinate,
                },
                {
                  latitude: rideRequestData.destinationPointLatitudeCoordinate,
                  longitude:rideRequestData.destinationPointLongitudeCoordinate,
                },
              ]}
              strokeWidth={2}
              strokeColor={theme.colors.black}
            />
          </MapView>

          <Block
            style={{
              paddingVertical: 8,
              paddingHorizontal: 20,
            }}
          >
            <Block row center>
              <MaterialCommunityIcons
                name="human-greeting"
                size={24}
                color={theme.colors.black}
                style={{ marginRight: 8 }}
              />
              <Text
                h4
                color={theme.colors.black}
                style={{ paddingHorizontal: 10 }}
              >
                {rideRequestData.pickupInfo}
              </Text>
            </Block>

            <Block row>
              <Ionicons
                name="ios-ellipsis-vertical-sharp"
                size={24}
                color="black"
              />
            </Block>
            <Block row center>
              <MaterialCommunityIcons
                name="map-marker"
                size={20}
                color={theme.colors.black}
                style={{ marginRight: 5 }}
              />
              <Text
                h4
                color={theme.colors.black}
                style={{ paddingHorizontal: 10 }}
              >
                {rideRequestData.destinationInfo}
              </Text>
            </Block>
            <Button
              style={{
                backgroundColor: theme.colors.black,
              }}
              onPress={() => onSubmitCompleted(data)}
            >
              <Text button>Ride Completed</Text>
            </Button>
          </Block>
        </Block>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
  },

  header: {
    backgroundColor: "#f7f5eee8",
    shadowColor: "#000000",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
});

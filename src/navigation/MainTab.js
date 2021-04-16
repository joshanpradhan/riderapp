import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import * as theme from "../constants/theme";
import RideRequest from "../screens/rideRequest/RideRequest";
import LeaderBoard from "../screens/leaderBoard/LeaderBoard";
import History from "../screens/rideHistory/History";
import Settings from "../screens/settings/Settings";

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({  color }) => {
    let iconName;
    if (route.name === "Ride Request") {
      iconName = "bicycle-outline";
    } else if (route.name === "Settings") {
      iconName = "settings-outline";
    } else if (route.name === "History") {
      iconName = "timer-outline";
    } else if (route.name === "Leader Board") {
      iconName = "stats-chart-outline";
    }

    return <Ionicons name={iconName} color={color} size={28} />;
  },
});

export default MainTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Ride Request"
      screenOptions={screenOptions}
      tabBarOptions={{
        activeTintColor: theme.colors.black,
        inactiveTintColor: theme.colors.gray,
        style: {
          paddingBottom: 5,
          height: 50,
        },
      }}
    >
      <Tab.Screen name="Ride Request" component={RideRequestStack} />
      <Tab.Screen name="Leader Board" component={LeaderBoardStack} />
      <Tab.Screen name="History" component={HistoryStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
};

const RideRequestRoute = createStackNavigator();

function RideRequestStack() {
  return (
    <RideRequestRoute.Navigator
      screenOptions={{
        headerShown: true,
        headerLeft: null,
      }}
      initialRouteName="Ride Request"
    >
      <RideRequestRoute.Screen name="Ride Request" component={RideRequest} />
    </RideRequestRoute.Navigator>
  );
}
const LeaderBoardRoute = createStackNavigator();

function LeaderBoardStack() {
  return (
    <LeaderBoardRoute.Navigator
      screenOptions={{
        headerShown: true,
        headerLeft: null,
      }}
      initialRouteName="Leader Board"
    >
      <LeaderBoardRoute.Screen
        name="Leader Board"
        component={LeaderBoard}
      />
    </LeaderBoardRoute.Navigator>
  );
}

const HistoryRoute = createStackNavigator();

function HistoryStack() {
  return (
    <HistoryRoute.Navigator
      screenOptions={{
        headerShown: false,
        headerLeft: null,
      }}
      initialRouteName="History"
    >
      <HistoryRoute.Screen name="History" component={History} />
    </HistoryRoute.Navigator>
  );
}

const SettingsRoute = createStackNavigator();

function SettingsStack() {
  return (
    <SettingsRoute.Navigator
      screenOptions={{
        headerShown: true,
        headerLeft: null,
      }}
      initialRouteName="Settings"
    >
      <SettingsRoute.Screen name="Settings" component={Settings} />
    </SettingsRoute.Navigator>
  );
}

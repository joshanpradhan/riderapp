import React, { useState, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as theme from "../constants/theme.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

import MainTab from "./MainTab";
import Onboarding from "../screens/auth/Onboarding";
import Welcome from "../screens/auth/Welcome";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import Forgot from "../screens/auth/Forgot";

import Profile from "../screens/settings/Profile";
import VehicleDetail from "../screens/settings/VehicleDetail";
import Privacy from "../screens/settings/Privacy";
import FAQ from "../screens/settings/FAQ";
import ChangePassword from "../screens/settings/ChangePassword";
import AboutUs from "../screens/settings/AboutUs.js";

import UserLocationDestination from "../screens/rideRequest/UserLocationDestination.js";
import UserInformation from "../screens/rideRequest/UserInformation.js";
import StartRide from "../screens/rideRequest/StartRide.js";
import RideCompleted from "../screens/rideRequest/RideCompleted.js";
import VerifyRide from "../screens/rideRequest/VerifyRide";
import OfflineNotice from "../components/OfflineNotice.js";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.blue,
    background: theme.colors.white,
  },
};

const Stack = createStackNavigator();
export default App = () => {
  
  const [viewedOnboarding, setViewedOnboarding] = useState(null);
  let routeName;
  useEffect(() => {
    AsyncStorage.getItem("@viewedOnboarding").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("@viewedOnboarding", "true");
        setViewedOnboarding(true);
      } else {
        setViewedOnboarding(false);
      }
    });
  }, []); // Add


  if (viewedOnboarding === null) {
    return null;
  } else if (viewedOnboarding == true) {
    routeName = "Onboarding";
  } else {
    routeName = "Welcome";
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName={routeName}>
       
        <Stack.Screen
          name="User Information"
          options={{ headerShown: false }}
          component={UserInformation}
        />
        <Stack.Screen
          name="Verify Ride"
          options={{ headerShown: true }}
          component={VerifyRide}
        />
        <Stack.Screen
          name="Vehicle Detail"
          options={{ headerShown: true }}
          component={VehicleDetail}
        />
        <Stack.Screen
          name="Ride Completed"
          options={{ headerShown: false }}
          component={RideCompleted}
        />
         <Stack.Screen
          name="Start Ride"
          options={{ headerShown: false }}
          component={StartRide}
        />
        <Stack.Screen
          name="UserLocationDestination"
          options={{ headerShown: false }}
          component={UserLocationDestination}
        />
        <Stack.Screen
          name="Onboarding"
          options={{ headerShown: false }}
          component={Onboarding}
        />
        <Stack.Screen
          name="Welcome"
          options={{ headerShown: false }}
          component={Welcome}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: true }}
          component={Login}
        />
        <Stack.Screen
          name="Register"
          options={{ headerShown: true }}
          component={Register}
        />
        <Stack.Screen
          name="Forgot Password"
          options={{ headerShown: true }}
          component={Forgot}
        />
        <Stack.Screen
          name="MainTab"
          options={{ headerShown: false }}
          component={MainTab}
        />

        <Stack.Screen
          name="Change Password"
          options={{ headerShown: true }}
          component={ChangePassword}
        />
        <Stack.Screen
          name="Account Profile"
          options={{ headerShown: true }}
          component={Profile}
        />
      
        <Stack.Screen
          name="Privacy Policy"
          options={{ headerShown: true }}
          component={Privacy}
        />
        <Stack.Screen
          name="FAQ"
          options={{ headerShown: true }}
          component={FAQ}
        />
        <Stack.Screen
          name="About Us"
          options={{ headerShown: true }}
          component={AboutUs}
        />
      </Stack.Navigator>
      <OfflineNotice/>
      
    </NavigationContainer>
  );
};

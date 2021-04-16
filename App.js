import React, { useState } from "react";
import Navigation from "./src/navigation/Index.js";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import { UserProvider } from "./src/context/UserContext.js";
import FlashMessage from "react-native-flash-message";

// import all used images
const images = [
  require("./src/assets/icons/box.png"),
  require("./src/assets/icons/dots.png"),
  require("./src/assets/icons/grayscooter.png"),
  require("./src/assets/icons/markerIcon.png"),
  require("./src/assets/icons/scooter.png"),
  require("./src/assets/icons/smile.png"),
  require("./src/assets/images/location.png"),
  require("./src/assets/images/mobilePay.png"),
  require("./src/assets/images/places.png"),
];

export default App = () => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  handleResourcesAsync = async () => {
    // we're caching all the images
    // for better performance on the app

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  };
  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={handleResourcesAsync}
        onError={(error) => console.warn(error)}
        onFinish={() => setIsLoadingComplete(true)}
      />
    );
  }

  return (
    <UserProvider>
      <Navigation />
      <FlashMessage
        position="top"
        icon={{ icon: "auto", position: "right" }}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </UserProvider>
  );
};

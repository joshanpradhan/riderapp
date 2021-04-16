import React, { useState, useRef } from "react";
import { StyleSheet, View, FlatList, Animated } from "react-native";
import slides from "../../constants/slides.js";
import {OnboardingItem,Paginator,NextButton} from "../../components/Index.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as theme from "../../constants/theme.js";

export default Onboarding = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(0);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const scrollTo = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      try {
        await AsyncStorage.setItem("@viewedOnboarding ", "true");
        navigation.navigate("Welcome");
      } catch (err) {
        console.log("Error @setItem", err);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          horizontal
          onViewableItemsChanged={viewableItemsChanged}
          scrollEventThrottle={32}
          viewAbilityConfig={viewConfig}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          ref={slidesRef}
        />
      </View>
      <Paginator data={slides} scrollX={scrollX} />
      <NextButton
        scrollTo={scrollTo}
        percentage={(currentIndex + 1) * (100 / slides.length)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:theme.colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
});

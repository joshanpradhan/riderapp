import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  Animated,
  View,
  TouchableOpacity,
} from "react-native";
import SVG, { G, Circle } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";
import * as theme from "../constants/theme.js";

export default NextButton = ({ percentage, scrollTo }) => {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);
  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(
      (value) => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;
        if (progressRef?.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [percentage]
    );
    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);

  return (
    <View style={styles.container}>
      <SVG height={size} width={size}>
        <G rotation="-90" origin={center}>
          <Circle
            stroke="#E6E7E8"
            strokeWidth={strokeWidth}
            cx={center}
            cy={center}
            r={radius}
          />
          <Circle
            ref={progressRef}
            stroke={theme.colors.maroon}
            strokeWidth={strokeWidth}
            cx={center}
            cy={center}
            r={radius}
            strokeDasharray={circumference}
          />
        </G>
      </SVG>

      <TouchableOpacity
        onPress={scrollTo}
        style={styles.button}
        activeOpacity={0.6}
      >
        <AntDesign name="arrowright" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    backgroundColor: theme.colors.maroon,
    borderRadius: 100,
    padding: 10,
  },
});

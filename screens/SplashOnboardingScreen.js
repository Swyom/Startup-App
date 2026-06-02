import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function SplashOnboardingScreen() {
  const navigation = useNavigation();
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});

  const handlePlaybackStatusUpdate = (playbackStatus) => {
    setStatus(() => playbackStatus);
    if (playbackStatus.didJustFinish) {
      navigation.replace("Login");
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        style={styles.video}
        source={require("../assets/SplashScreen.mp4")}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping={false}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  video: {
    width: width,
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

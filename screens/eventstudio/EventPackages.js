import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

export default function EventPackages() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Event Packages Coming Soon...</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF7F8",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: "PlayfairDisplay_700Bold",
    color: "#630d2d",
  },
});

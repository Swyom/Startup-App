import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function AuthInput({ label, rightElement, ...props }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholderTextColor="#94a3b8"
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            rightElement ? styles.inputWithRightElement : styles.inputStandard,
          ]}
          onFocus={(e) => {
            setIsFocused(true);
            if (props.onFocus) props.onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            if (props.onBlur) props.onBlur(e);
          }}
          {...props}
        />
        {rightElement && (
          <View style={styles.rightElementContainer}>{rightElement}</View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
  },
  inputContainer: {
    justifyContent: "center",
    position: "relative",
  },
  input: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 16,
    paddingVertical: 14,
    color: "#0f172a",
    fontSize: 16,
  },
  inputFocused: {
    borderColor: "#630d2d",
  },
  inputWithRightElement: {
    paddingLeft: 16,
    paddingRight: 48,
  },
  inputStandard: {
    paddingHorizontal: 16,
  },
  rightElementContainer: {
    position: "absolute",
    right: 16,
  },
});

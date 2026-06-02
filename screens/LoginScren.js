import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Eye, EyeOff, ArrowRight } from "lucide-react-native";
import AuthInput from "./(auth)/AuthInput";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const baseWidth = 375;

const scale = (size) => (SCREEN_WIDTH / baseWidth) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export default function LoginScreen({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ImageBackground
      source={require("../assets/bg2.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.vignetteOverlay} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {}
          <View style={styles.headerContainer}>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>The Wedding Studio</Text>
            </View>

            <Text style={styles.brandTitle} numberOfLines={1}>
              VELVETIQUE
            </Text>

            <Text style={styles.brandSubtitle}>
              Orchestrate your perfect day beautifully.
            </Text>
          </View>

          {}
          <View style={styles.glassCard}>
            <Text style={styles.welcomeText}>Welcome Back</Text>

            {}
            <View style={styles.inputStack}>
              <AuthInput
                label="Email or Phone"
                placeholder="bride.groom@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <AuthInput
                label="Password"
                placeholder="••••••••••••"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
                rightElement={
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    activeOpacity={0.7}
                    style={styles.eyeButton}
                  >
                    {showPassword ? (
                      <EyeOff size={18} color="#630d2d" strokeWidth={1.5} />
                    ) : (
                      <Eye size={18} color="#630d2d" strokeWidth={1.5} />
                    )}
                  </TouchableOpacity>
                }
              />
            </View>

            {}
            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity activeOpacity={0.6}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {}
            <TouchableOpacity
              onPress={() => onNavigate("main")}
              activeOpacity={0.85}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>Sign In</Text>
              <ArrowRight size={14} color="#ffffff" strokeWidth={2} />
            </TouchableOpacity>

            {}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or Connect With</Text>
              <View style={styles.dividerLine} />
            </View>

            {}
            <View style={styles.socialContainer}>
              <TouchableOpacity activeOpacity={0.7} style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7} style={styles.socialButton}>
                <Text style={styles.socialButtonText}>Apple</Text>
              </TouchableOpacity>
            </View>
          </View>

          {}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => onNavigate("register")}
              activeOpacity={0.6}
            >
              <Text style={styles.footerActionText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  vignetteOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(253, 247, 248, 0.85)",
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: moderateScale(28),
    paddingTop: Platform.OS === "ios" ? 40 : 20,
    paddingBottom: 24,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: moderateScale(28),
    paddingHorizontal: 16,
    zIndex: 10,
  },
  badgeContainer: {
    backgroundColor: "rgba(99, 13, 45, 0.05)",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "rgba(99, 13, 45, 0.1)",
    marginBottom: 14,
  },
  badgeText: {
    color: "#630d2d",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  brandTitle: {
    fontFamily: "PlayfairDisplay_700Bold",
    color: "#630d2d",
    fontSize: moderateScale(34),
    letterSpacing: 4,
    textAlign: "center",
    textTransform: "uppercase",
    width: "100%",
  },
  brandSubtitle: {
    color: "rgba(120, 113, 108, 0.8)",
    marginTop: 8,
    fontSize: 12,
    fontWeight: "300",
    letterSpacing: 1,
    textAlign: "center",
    maxWidth: 260,
    lineHeight: 16,
  },
  glassCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 28,
    padding: moderateScale(22),
    zIndex: 10,
    shadowColor: "#630d2d",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 3,
  },
  welcomeText: {
    color: "#292524",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.3,
    textAlign: "center",
    marginBottom: 20,
  },
  inputStack: {
    rowGap: 12,
  },
  eyeButton: {
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginTop: 10,
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#630d2d",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  primaryButton: {
    backgroundColor: "#630d2d",
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#630d2d",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginRight: 6,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 0.5,
    backgroundColor: "#e7e5e4",
  },
  dividerText: {
    color: "#a8a29e",
    fontSize: 9,
    fontWeight: "500",
    letterSpacing: 1.5,
    paddingHorizontal: 12,
    textTransform: "uppercase",
  },
  socialContainer: {
    flexDirection: "row",
    columnGap: 12,
  },
  socialButton: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e7e5e4",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  socialButtonText: {
    color: "#44403c",
    fontSize: 13,
    fontWeight: "500",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(24),
    paddingBottom: 16,
    zIndex: 10,
  },
  footerText: {
    color: "#78716c",
    fontSize: 13,
    fontWeight: "400",
  },
  footerActionText: {
    color: "#630d2d",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginLeft: 4,
  },
});

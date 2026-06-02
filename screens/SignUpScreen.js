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
  TextInput,
} from "react-native";
import { ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react-native";
import AuthInput from "./(auth)/AuthInput";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const baseWidth = 375;

const scale = (size) => (SCREEN_WIDTH / baseWidth) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export default function SignUpScreen({ onNavigate }) {
  const [step, setStep] = useState("register");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleSignUpSubmit = () => {
    setStep("otp");
  };

  const handleVerifyOtp = () => {
    if (onNavigate) onNavigate("main");
  };

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
              {step === "register"
                ? "Begin orchestrating your perfect day beautifully."
                : "Securing your elegant wedding planning experience."}
            </Text>
          </View>

          {}
          {step === "register" ? (
            <View style={styles.glassCard}>
              <Text style={styles.welcomeText}>Create Account</Text>

              <View style={styles.inputStack}>
                <AuthInput
                  label="Full Name"
                  placeholder="Anastasia & Christian"
                  autoCapitalize="words"
                  value={fullName}
                  onChangeText={setFullName}
                />

                <AuthInput
                  label="Email Address"
                  placeholder="bride.groom@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />

                <AuthInput
                  label="Phone Number"
                  placeholder="+1 (555) 000-0000"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />

                <AuthInput
                  label="Password"
                  placeholder="••••••••••••"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <TouchableOpacity
                onPress={handleSignUpSubmit}
                activeOpacity={0.85}
                style={[styles.primaryButton, { marginTop: scale(24) }]}
              >
                <Text style={styles.primaryButtonText}>Continue</Text>
                <ArrowRight size={14} color="#ffffff" strokeWidth={2} />
              </TouchableOpacity>

              {}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or Register With</Text>
                <View style={styles.dividerLine} />
              </View>

              {}
              <View style={styles.socialContainer}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.socialButton}
                >
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.socialButton}
                >
                  <Text style={styles.socialButtonText}>Apple</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.glassCard}>
              <TouchableOpacity
                onPress={() => setStep("register")}
                style={styles.backButton}
                activeOpacity={0.6}
              >
                <ArrowLeft size={16} color="#630d2d" strokeWidth={2} />
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>

              <View style={styles.iconCenterWrapper}>
                <ShieldCheck size={40} color="#630d2d" strokeWidth={1.2} />
              </View>

              <Text style={styles.welcomeText}>Verification Code</Text>
              <Text style={styles.otpDescriptionText}>
                We sent a 4-digit premium secure pass-code to your contact
                details.
              </Text>

              {}
              <View style={styles.otpContainer}>
                {otp.map((digit, idx) => (
                  <TextInput
                    key={idx}
                    style={styles.otpInputBox}
                    maxLength={1}
                    keyboardType="number-pad"
                    textAlign="center"
                    value={digit}
                    onChangeText={(val) => handleOtpChange(val, idx)}
                    placeholder="•"
                    placeholderTextColor="#a8a29e"
                  />
                ))}
              </View>

              <TouchableOpacity
                onPress={handleVerifyOtp}
                activeOpacity={0.85}
                style={styles.primaryButton}
              >
                <Text style={styles.primaryButtonText}>Verify & Access</Text>
                <ArrowRight size={14} color="#ffffff" strokeWidth={2} />
              </TouchableOpacity>

              {}
              <View style={styles.resendWrapper}>
                <Text style={styles.resendText}>Didn't receive code? </Text>
                <TouchableOpacity activeOpacity={0.6}>
                  <Text style={styles.resendActionText}>Resend OTP</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => onNavigate("login")}
              activeOpacity={0.6}
            >
              <Text style={styles.footerActionText}>Sign In</Text>
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
    marginBottom: moderateScale(24),
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
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  backButtonText: {
    color: "#630d2d",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  iconCenterWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  welcomeText: {
    color: "#292524",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.3,
    textAlign: "center",
    marginBottom: 16,
  },
  otpDescriptionText: {
    color: "#78716c",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  inputStack: {
    rowGap: 12,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 10,
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  otpInputBox: {
    flex: 1,
    height: scale(52),
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e7e5e4",
    borderRadius: 12,
    fontSize: 20,
    fontWeight: "600",
    color: "#630d2d",
    ...Platform.select({
      ios: {
        shadowColor: "#630d2d",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
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
  resendWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  resendText: {
    color: "#78716c",
    fontSize: 12,
  },
  resendActionText: {
    color: "#630d2d",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
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

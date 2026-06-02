import React, { useState, useRef } from "react";
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
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
} from "lucide-react-native";
import Svg, { Path } from "react-native-svg";
import AuthInput from "./(auth)/AuthInput";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const baseWidth = 375;

const scale = (size) => (SCREEN_WIDTH / baseWidth) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export default function SignUpScreen({ onNavigate }) {
  const [step, setStep] = useState("register");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otp, setOtp] = useState(["", "", "", ""]);

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
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
          <View style={styles.headerContainer}>
            <View style={styles.logoEmblemContainer}>
              <View style={styles.outerRingGraphic}>
                <View style={styles.innerRingGraphic}>
                  <Sparkles
                    size={moderateScale(18)}
                    color="#E6C687"
                    strokeWidth={2}
                  />
                </View>
              </View>
            </View>

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

          {step === "register" ? (
            <View style={styles.glassCard}>
              <Text style={styles.welcomeText}>Create Account</Text>

              <View style={styles.inputStack}>
                <AuthInput
                  label="Username"
                  placeholder="anastasia_design"
                  autoCapitalize="none"
                  value={username}
                  onChangeText={setUsername}
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
                  label="Mobile Number"
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

                <AuthInput
                  label="Confirm Password"
                  placeholder="••••••••••••"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>

              <TouchableOpacity
                onPress={handleSignUpSubmit}
                activeOpacity={0.85}
                style={[styles.primaryButton, { marginTop: scale(24) }]}
              >
                <Text style={styles.primaryButtonText}>Continue</Text>
                <ArrowRight
                  size={moderateScale(14)}
                  color="#ffffff"
                  strokeWidth={2.5}
                />
              </TouchableOpacity>

              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or Register With</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialContainer}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.socialButton}
                >
                  <View style={styles.socialIconSpace}>
                    <Svg width={20} height={20} viewBox="0 0 48 48">
                      <Path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                      <Path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      />
                      <Path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      />
                      <Path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                    </Svg>
                  </View>
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.socialButton}
                >
                  <View style={styles.socialIconSpace}>
                    <Svg width={20} height={20} viewBox="0 0 50 50">
                      <Path
                        fill="#171717"
                        d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"
                      />
                    </Svg>
                  </View>
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

              <View style={styles.otpContainer}>
                {otp.map((digit, idx) => (
                  <TextInput
                    key={idx}
                    ref={inputRefs[idx]}
                    style={styles.otpInputBox}
                    maxLength={1}
                    keyboardType="number-pad"
                    textAlign="center"
                    value={digit}
                    onChangeText={(val) => handleOtpChange(val, idx)}
                    onKeyPress={(e) => handleKeyPress(e, idx)}
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

              <View style={styles.resendWrapper}>
                <Text style={styles.resendText}>Didn't receive code? </Text>
                <TouchableOpacity activeOpacity={0.6}>
                  <Text style={styles.resendActionText}>Resend OTP</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

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
  backgroundImage: { flex: 1 },
  vignetteOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(253, 247, 248, 0.82)",
  },
  container: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: moderateScale(24),
    paddingTop: Platform.OS === "ios" ? 54 : 32,
    paddingBottom: 24,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: moderateScale(24),
    paddingHorizontal: 16,
    zIndex: 10,
  },
  logoEmblemContainer: {
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  outerRingGraphic: {
    width: scale(54),
    height: scale(54),
    borderRadius: scale(27),
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(99, 13, 45, 0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  innerRingGraphic: {
    width: "84%",
    height: "84%",
    borderRadius: 99,
    backgroundColor: "#630d2d",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeContainer: {
    backgroundColor: "rgba(99, 13, 45, 0.05)",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "rgba(99, 13, 45, 0.1)",
    marginBottom: 12,
  },
  badgeText: {
    color: "#630d2d",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  brandTitle: {
    fontFamily: "PlayfairDisplay_700Bold",
    color: "#630d2d",
    fontSize: moderateScale(34),
    letterSpacing: 5,
    textAlign: "center",
    textTransform: "uppercase",
    width: "100%",
  },
  brandSubtitle: {
    color: "#78716c",
    marginTop: 6,
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0.6,
    textAlign: "center",
    maxWidth: 260,
    lineHeight: 18,
  },
  glassCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 24,
    padding: moderateScale(20),
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#630d2d",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.03,
        shadowRadius: 16,
      },
      android: { elevation: 2 },
    }),
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
    color: "#171717",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.2,
    textAlign: "center",
    marginBottom: 20,
  },
  otpDescriptionText: {
    color: "#737373",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  inputStack: { rowGap: 14 },
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
    borderRadius: 14,
    fontSize: 20,
    fontWeight: "600",
    color: "#630d2d",
  },
  primaryButton: {
    backgroundColor: "#630d2d",
    borderRadius: 14,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginRight: 6,
  },
  resendWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  resendText: { color: "#737373", fontSize: 12 },
  resendActionText: {
    color: "#630d2d",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#F0F0F0" },
  dividerText: {
    color: "#A3A3A3",
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 1,
    paddingHorizontal: 12,
    textTransform: "uppercase",
  },
  socialContainer: { flexDirection: "row", columnGap: 12 },
  socialButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  socialIconSpace: {
    marginRight: 6,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  socialButtonText: { color: "#171717", fontSize: 14, fontWeight: "600" },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(28),
    paddingBottom: 16,
    zIndex: 10,
  },
  footerText: { color: "#737373", fontSize: 13, fontWeight: "400" },
  footerActionText: {
    color: "#630d2d",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginLeft: 4,
  },
});

import React, { useRef, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Text,
  Image,
  StatusBar,
  Platform,
} from "react-native";

import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Home,
  ShoppingBag,
  Plus,
  ClipboardList,
  User,
  Bell,
} from "lucide-react-native";
import * as SplashScreen from "expo-splash-screen";

import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import ChecklistScreen from "./screens/ChecklistScreen";
import AccountScreen from "./screens/AccountScreen";
import EventStudio from "./screens/EventStudio";
import EventPackages from "./screens/eventstudio/EventPackages";
import SplashOnboardingScreen from "./screens/SplashOnboardingScreen";
import VendorProfile from "./screens/VendorProfile";

import LoginScren from "./screens/LoginScren";
import SignUpScreen from "./screens/SignUpScreen";

import {
  useFonts,
  PlayfairDisplay_700Bold,
} from "@expo-google-fonts/playfair-display";

SplashScreen.preventAutoHideAsync();

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const scale = (size) => (SCREEN_WIDTH / 375) * size;
const normalize = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const CustomHeader = () => (
  <View style={styles.headerWrapper}>
    <View style={styles.headerContent}>
      <TouchableOpacity style={styles.logoContainer} activeOpacity={0.7}>
        <Image
          source={require("./assets/logo.png")}
          style={styles.headerLogo}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>VELVETIQUE</Text>

      <TouchableOpacity style={styles.notificationBtn} activeOpacity={0.7}>
        <Bell size={normalize(20)} color="#ffffff" strokeWidth={1.8} />
        <View style={styles.dot} />
      </TouchableOpacity>
    </View>
  </View>
);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CustomAnimatedTabBar({ currentRoute, navigation }) {
  const getIndexByRoute = (route) => {
    switch (route) {
      case "Home":
        return 0;
      case "Cart":
        return 1;
      case "Checklist":
        return 3;
      case "Account":
        return 4;
      default:
        return 0;
    }
  };

  const activeIndex = getIndexByRoute(currentRoute);

  const totalBarWidth = SCREEN_WIDTH - 40;
  const singleTabWidth = totalBarWidth / 5;

  const sliderPosition = useRef(
    new Animated.Value(activeIndex * singleTabWidth),
  ).current;

  useEffect(() => {
    Animated.spring(sliderPosition, {
      toValue: activeIndex * singleTabWidth,
      friction: 7,
      tension: 45,
      useNativeDriver: true,
    }).start();
  }, [activeIndex]);

  const handleNavigationTransition = (targetRoute, stackTarget) => {
    if (currentRoute === targetRoute) return;
    navigation.navigate(stackTarget);
  };

  return (
    <View style={styles.floatingTab}>
      {}
      <Animated.View
        style={[
          styles.slidingHighlightPill,
          {
            width: singleTabWidth - 12,
            transform: [{ translateX: Animated.add(sliderPosition, 6) }],
          },
        ]}
      />

      {}
      <TouchableOpacity
        style={styles.tabBarButtonContainer}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Home")}
      >
        <Home
          size={normalize(21)}
          color={
            currentRoute === "Home" ? "#E6C687" : "rgba(255, 255, 255, 0.45)"
          }
          strokeWidth={currentRoute === "Home" ? 2.2 : 1.8}
        />
      </TouchableOpacity>

      {}
      <TouchableOpacity
        style={styles.tabBarButtonContainer}
        activeOpacity={0.7}
        onPress={() => handleNavigationTransition("Cart", "Cart")}
      >
        <ShoppingBag
          size={normalize(21)}
          color={
            currentRoute === "Cart" ? "#E6C687" : "rgba(255, 255, 255, 0.45)"
          }
          strokeWidth={currentRoute === "Cart" ? 2.2 : 1.8}
        />
      </TouchableOpacity>

      {}
      <TouchableOpacity
        activeOpacity={0.92}
        style={styles.centerButtonContainer}
        onPress={() => navigation.navigate("EventStudioRoot")}
      >
        <View style={styles.centerButtonOuterShield}>
          <View style={styles.centerButtonInnerCore}>
            <Plus size={normalize(26)} color="#ffffff" strokeWidth={2.5} />
          </View>
        </View>
      </TouchableOpacity>

      {}
      <TouchableOpacity
        style={styles.tabBarButtonContainer}
        activeOpacity={0.7}
        onPress={() => handleNavigationTransition("Checklist", "Checklist")}
      >
        <ClipboardList
          size={normalize(21)}
          color={
            currentRoute === "Checklist"
              ? "#E6C687"
              : "rgba(255, 255, 255, 0.45)"
          }
          strokeWidth={currentRoute === "Checklist" ? 2.2 : 1.8}
        />
      </TouchableOpacity>

      {}
      <TouchableOpacity
        style={styles.tabBarButtonContainer}
        activeOpacity={0.7}
        onPress={() => handleNavigationTransition("Account", "Account")}
      >
        <User
          size={normalize(21)}
          color={
            currentRoute === "Account" ? "#E6C687" : "rgba(255, 255, 255, 0.45)"
          }
          strokeWidth={currentRoute === "Account" ? 2.2 : 1.8}
        />
      </TouchableOpacity>
    </View>
  );
}

function HomeTabNavigator({ currentRoute, navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#FDF7F8" }}>
      <CustomHeader />
      <Tab.Navigator
        tabBar={() => (
          <CustomAnimatedTabBar
            currentRoute={currentRoute}
            navigation={navigation}
          />
        )}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="CartDummy" component={View} />
        <Tab.Screen name="AddDummy" component={View} />
        <Tab.Screen name="ChecklistDummy" component={View} />
        <Tab.Screen name="AccountDummy" component={View} />
      </Tab.Navigator>
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({ PlayfairDisplay_700Bold });
  const [currentRoute, setCurrentRoute] = useState("Home");
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() => {
        const currentRouteName = navigationRef.getCurrentRoute()?.name;
        if (currentRouteName) {
          setCurrentRoute(currentRouteName);
        }
      }}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashOnboardingScreen} />
        <Stack.Screen name="Login" component={LoginAuthWrapper} />
        <Stack.Screen name="Register" component={RegisterAuthWrapper} />

        <Stack.Screen name="MainTabs">
          {(props) => (
            <HomeTabNavigator {...props} currentRoute={currentRoute} />
          )}
        </Stack.Screen>

        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="VendorProfile" component={VendorProfile} />
        <Stack.Screen name="EventStudioRoot" component={EventStudio} />
        <Stack.Screen name="Checklist" component={ChecklistScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="EventPackages" component={EventPackages} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function LoginAuthWrapper({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#FDF7F8" }}>
      <LoginScren
        onNavigate={(target) => {
          if (target === "register") navigation.navigate("Register");
          if (target === "main" || target === "otp")
            navigation.replace("MainTabs");
        }}
      />
    </View>
  );
}

function RegisterAuthWrapper({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#FDF7F8" }}>
      <SignUpScreen
        onNavigate={(target) => {
          if (target === "login") navigation.navigate("Login");
          if (target === "main") navigation.replace("MainTabs");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: "#630d2d",
    paddingTop:
      Platform.OS === "android" ? StatusBar.currentHeight + 14 : normalize(52),
    paddingBottom: normalize(16),
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#630d2d",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  headerContent: {
    height: normalize(44),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    position: "relative",
  },
  logoContainer: {
    position: "absolute",
    left: 20,
    width: normalize(46),
    height: normalize(46),
    justifyContent: "center",
    alignItems: "center",
  },
  headerLogo: {
    width: "100%",
    height: "100%",
  },
  headerTitle: {
    fontSize: normalize(21),
    fontFamily: "PlayfairDisplay_700Bold",
    color: "#ffffff",
    letterSpacing: 6,
    textAlign: "center",
  },
  notificationBtn: {
    position: "absolute",
    right: 20,
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 14,
  },
  dot: {
    position: "absolute",
    top: 6,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ff4d6d",
  },
  floatingTab: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? normalize(34) : 34,
    left: 20,
    right: 20,
    backgroundColor: "#630d2d",
    borderRadius: 24,
    height: normalize(66),
    borderTopWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 12,
    shadowColor: "#630d2d",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
  },
  tabBarButtonContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 4,
  },
  slidingHighlightPill: {
    position: "absolute",
    height: normalize(44),
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    zIndex: 1,
    left: 0,
  },
  centerButtonContainer: {
    width: (SCREEN_WIDTH - 40) / 5,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  centerButtonOuterShield: {
    position: "absolute",
    top: normalize(-16),
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(30),
    backgroundColor: "#FDF7F8",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#630d2d",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  centerButtonInnerCore: {
    width: "88%",
    height: "88%",
    borderRadius: 99,
    backgroundColor: "#630d2d",
    justifyContent: "center",
    alignItems: "center",
  },
});

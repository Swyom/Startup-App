import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  Platform
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, ShoppingBag, Plus, ClipboardList, User, Bell } from 'lucide-react-native';
import * as SplashScreen from 'expo-splash-screen';

// Screen Imports
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import ChecklistScreen from './screens/ChecklistScreen';
import AccountScreen from './screens/AccountScreen';
import AddScreen from './screens/AddScreen';
import SplashOnboardingScreen from './screens/SplashOnboardingScreen';

// Font Imports
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';

SplashScreen.preventAutoHideAsync();

const { width } = Dimensions.get('window');

// --- Custom Header Component ---
const CustomHeader = () => (
  <View style={styles.headerWrapper}>
    <SafeAreaView>
      <View style={styles.headerContent}>
        <TouchableOpacity style={styles.logoContainer} activeOpacity={0.7}>
          <Image
            source={require('./assets/logo.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>VELVETIQUE</Text>

        <TouchableOpacity style={styles.notificationBtn} activeOpacity={0.7}>
          <Bell size={24} color="#ffffff" strokeWidth={1.5} />
          <View style={styles.dot} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </View>
);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// --- Animated Tab Icon ---
const AnimatedIcon = ({ children, focused }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: focused ? 1.15 : 1,
      friction: 5,
      useNativeDriver: true 
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ 
      transform: [{ scale: scaleValue }], 
      opacity: focused ? 1 : 0.6, 
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {focused && <View style={styles.iconBackground} />}
      {children}
      {focused && <View style={styles.activeDot} />}
    </Animated.View>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashOnboardingScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainTabs() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FDF7F8' }}>
      <CustomHeader />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.floatingTab,
          // ADDED: This provides internal padding for the icons
          tabBarItemStyle: {
            paddingTop: Platform.OS === 'ios' ? 0 : 30, 
          }
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <AnimatedIcon focused={focused}>
                <Home size={29} color="#ffffff" />
              </AnimatedIcon>
            )
          }}
        />
        <Tab.Screen 
          name="Cart" 
          component={CartScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <AnimatedIcon focused={focused}>
                <ShoppingBag size={29} color="#ffffff" />
              </AnimatedIcon>
            )
          }}
        />
        <Tab.Screen 
          name="Add" 
          component={AddScreen}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity activeOpacity={0.9} style={styles.centerButtonContainer} onPress={props.onPress}>
                <View style={styles.centerButton}>
                  <Plus size={32} color="#FFF" strokeWidth={2.5} />
                </View>
              </TouchableOpacity>
            )
          }}
        />
        <Tab.Screen 
          name="Checklist" 
          component={ChecklistScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <AnimatedIcon focused={focused}>
                <ClipboardList size={29} color="#ffffff" />
              </AnimatedIcon>
            )
          }}
        />
        <Tab.Screen 
          name="Account" 
          component={AccountScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <AnimatedIcon focused={focused}>
                <User size={29} color="#ffffff" />
              </AnimatedIcon>
            )
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#630d2d',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContent: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    position: 'relative',
  },
  logoContainer: {
    position: 'absolute',
    left: -15,
    width:135,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLogo: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#ffffff',
    letterSpacing: 4,
    textAlign: 'center',
  },
  notificationBtn: {
    position: 'absolute',
    right: 16,
    padding: 5,
  },
  dot: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ff4d6d',
    borderWidth: 2,
    borderColor: '#630d2d',
  },
  floatingTab: {
    position: 'absolute',
    bottom: 25,
    left: 15,
    right: 15,
    backgroundColor: '#630d2d',
    borderRadius: 35,
    height: 75,
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  centerButtonContainer: {
    top: -35, 
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 5,
  },
  centerButton: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#630d2d',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#FDF7F8', 
    elevation: 8,
    // Ensure it sits above other items
    zIndex: 1,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ffffff',
    marginTop: 5,
  },
  iconBackground: {
    position: 'absolute',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
});
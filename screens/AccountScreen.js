import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
  StyleSheet,
  Platform,
} from "react-native";
import {
  User,
  Heart,
  Settings,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  Calendar,
  Gift,
} from "lucide-react-native";

export default function AccountScreen({ navigation }) {
  const { width: windowWidth } = useWindowDimensions();

  const isLargeDevice = windowWidth > 450;
  const baseScale = windowWidth / 375;
  const normalize = (size, factor = 0.5) =>
    size + (baseScale * size - size) * factor;

  const dynamicPadding = isLargeDevice ? windowWidth * 0.08 : normalize(20);
  const dynamicGap = normalize(12);

  const REGISTRY_OPTIONS = [
    {
      id: "1",
      label: "Manage Celebration Registry",
      icon: Gift,
      color: "#A0522D",
    },
    {
      id: "2",
      label: "Curated Favorites & Wishlist",
      icon: Heart,
      color: "#ef4444",
    },
    {
      id: "3",
      label: "Milestone Consultation Bookings",
      icon: Calendar,
      color: "#630d2d",
    },
  ];

  const SYSTEM_OPTIONS = [
    {
      id: "4",
      label: "Notification Preferences",
      icon: Bell,
      color: "#737373",
    },
    {
      id: "5",
      label: "Account Security & Privacy",
      icon: Shield,
      color: "#737373",
    },
    { id: "6", label: "App Global Settings", icon: Settings, color: "#737373" },
  ];

  const renderMenuOption = (item) => {
    const IconComponent = item.icon;
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.menuRowItem}
        activeOpacity={0.7}
        onPress={() => alert(`Navigating to ${item.label}...`)}
      >
        <View style={styles.menuItemLeftBlock}>
          <View
            style={[
              styles.menuIconBadge,
              { backgroundColor: `${item.color}10` },
            ]}
          >
            <IconComponent
              size={normalize(16)}
              color={item.color}
              strokeWidth={2}
            />
          </View>
          <Text style={[styles.menuItemLabel, { fontSize: normalize(14) }]}>
            {item.label}
          </Text>
        </View>
        <ChevronRight size={normalize(14)} color="#A3A3A3" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.masterBackground}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />

      <SafeAreaView style={styles.safeContainer}>
        {}
        <View style={[styles.header, { paddingHorizontal: dynamicPadding }]}>
          <View style={styles.headerLeftContainer}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate("MainTabs", { screen: "Home" })
              }
            >
              <ArrowLeft
                size={normalize(18)}
                color="#171717"
                strokeWidth={2.5}
              />
            </TouchableOpacity>
            <View>
              <Text style={[styles.headerTitle, { fontSize: normalize(20) }]}>
                Profile Studio
              </Text>
              <Text
                style={[styles.headerSubtitle, { fontSize: normalize(11) }]}
              >
                Manage your designer experience
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingHorizontal: dynamicPadding },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {}
          <View style={styles.profileCard}>
            <View style={styles.avatarRow}>
              <View style={styles.avatarOuterRing}>
                <View style={styles.avatarInnerCore}>
                  <User
                    size={normalize(32)}
                    color="#630d2d"
                    strokeWidth={1.5}
                  />
                </View>
              </View>
              <View style={styles.identityTextColumn}>
                <View style={styles.premiumBadgeRow}>
                  <Text
                    style={[styles.userNameText, { fontSize: normalize(18) }]}
                  >
                    Victoria Sterling
                  </Text>
                  <View style={styles.vipPill}>
                    <Sparkles
                      size={normalize(10)}
                      color="#E6C687"
                      strokeWidth={2}
                      style={{ marginRight: 3 }}
                    />
                    <Text style={[styles.vipText, { fontSize: normalize(9) }]}>
                      BRIDE
                    </Text>
                  </View>
                </View>
                <Text
                  style={[styles.userEmailText, { fontSize: normalize(13) }]}
                >
                  victoria@sterlingcelebrations.com
                </Text>
              </View>
            </View>

            <View style={styles.profileDivider} />

            {}
            <View style={styles.countdownMetricRow}>
              <View style={styles.metricBlock}>
                <Text style={[styles.metricValue, { fontSize: normalize(16) }]}>
                  September 12
                </Text>
                <Text style={[styles.metricLabel, { fontSize: normalize(10) }]}>
                  CELEBRATION DATE
                </Text>
              </View>
              <View style={styles.metricVerticalSeparator} />
              <View style={styles.metricBlock}>
                <Text style={[styles.metricValue, { fontSize: normalize(16) }]}>
                  102 Days
                </Text>
                <Text style={[styles.metricLabel, { fontSize: normalize(10) }]}>
                  COUNTDOWN
                </Text>
              </View>
            </View>
          </View>

          {}
          <Text
            style={[
              styles.sectionHeading,
              { fontSize: normalize(11), marginBottom: dynamicGap },
            ]}
          >
            CURATED REGISTRY
          </Text>
          <View
            style={[styles.menuWrapperCard, { marginBottom: dynamicGap * 1.5 }]}
          >
            {REGISTRY_OPTIONS.map(renderMenuOption)}
          </View>

          {}
          <Text
            style={[
              styles.sectionHeading,
              { fontSize: normalize(11), marginBottom: dynamicGap },
            ]}
          >
            PREFERENCES & SECURITY
          </Text>
          <View
            style={[styles.menuWrapperCard, { marginBottom: dynamicGap * 2 }]}
          >
            {SYSTEM_OPTIONS.map(renderMenuOption)}
          </View>

          {}
          <TouchableOpacity
            style={styles.logoutBtn}
            activeOpacity={0.75}
            onPress={() => navigation.replace("Login")}
          >
            <LogOut
              size={normalize(16)}
              color="#ef4444"
              strokeWidth={2}
              style={{ marginRight: 8 }}
            />
            <Text style={[styles.logoutBtnText, { fontSize: normalize(13) }]}>
              Sign Out of Account
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  masterBackground: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  safeContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    height: 68,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 8,
    marginLeft: -4,
    marginRight: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  headerTitle: {
    fontWeight: "700",
    color: "#171717",
    letterSpacing: -0.4,
  },
  headerSubtitle: {
    color: "#737373",
    fontWeight: "400",
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#ECECEC",
    padding: 20,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.02,
        shadowRadius: 12,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarOuterRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#FDF7F8",
    borderWidth: 1,
    borderColor: "rgba(99, 13, 45, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInnerCore: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  identityTextColumn: {
    flex: 1,
    marginLeft: 16,
  },
  premiumBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  userNameText: {
    fontWeight: "700",
    color: "#171717",
    letterSpacing: -0.3,
    marginRight: 8,
  },
  vipPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#630d2d",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 99,
  },
  vipText: {
    color: "#E6C687",
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  userEmailText: {
    color: "#737373",
    fontWeight: "400",
    marginTop: 4,
  },
  profileDivider: {
    height: 1,
    backgroundColor: "#F5F5F5",
    width: "100%",
    marginVertical: 18,
  },
  countdownMetricRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  metricBlock: {
    alignItems: "center",
  },
  metricValue: {
    color: "#630d2d",
    fontWeight: "700",
  },
  metricLabel: {
    color: "#A3A3A3",
    fontWeight: "600",
    letterSpacing: 1,
    marginTop: 4,
  },
  metricVerticalSeparator: {
    width: 1,
    height: 28,
    backgroundColor: "#EAEAEA",
  },

  sectionHeading: {
    color: "#737373",
    fontWeight: "700",
    letterSpacing: 1.2,
    paddingLeft: 4,
  },
  menuWrapperCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ECECEC",
    overflow: "hidden",
  },
  menuRowItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  menuItemLeftBlock: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIconBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  menuItemLabel: {
    color: "#171717",
    fontWeight: "500",
  },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
    paddingVertical: 14,
    borderRadius: 16,
  },
  logoutBtnText: {
    color: "#ef4444",
    fontWeight: "600",
  },
});

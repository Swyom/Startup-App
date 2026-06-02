import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import {
  ArrowLeft,
  Star,
  MapPin,
  ShieldCheck,
  Mail,
} from "lucide-react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function VendorProfile({ route, navigation }) {
  const { vendor } = route.params || {};

  const isLargeDevice = SCREEN_WIDTH > 450;
  const baseScale = SCREEN_WIDTH / 375;
  const normalize = (size, factor = 0.5) =>
    size + (baseScale * size - size) * factor;

  const dynamicPadding = isLargeDevice ? SCREEN_WIDTH * 0.08 : normalize(24);
  const dynamicBannerHeight = isLargeDevice ? 380 : normalize(280);

  if (!vendor) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          No studio variables loaded correctly.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.masterContainer}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <View style={[styles.mediaContainer, { height: dynamicBannerHeight }]}>
        <Image
          source={{ uri: vendor.image }}
          style={styles.bannerImage}
          resizeMode="cover"
        />

        <View style={styles.imageOverlayShield} />

        <View style={[styles.floatingHeaderActions, { left: dynamicPadding }]}>
          <TouchableOpacity
            style={styles.circleBackBtn}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={normalize(18)} color="#171717" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollProfileContent,
          { paddingHorizontal: dynamicPadding },
        ]}
      >
        <Text style={[styles.categoryBadgeText, { fontSize: normalize(11) }]}>
          {vendor.category.toUpperCase()}
        </Text>

        <Text style={[styles.studioNameTitle, { fontSize: normalize(26) }]}>
          {vendor.name}
        </Text>

        <View style={styles.locationMetadataRow}>
          <View style={styles.metaBadgeCell}>
            <MapPin
              size={normalize(13)}
              color="#737373"
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.metaLabelString, { fontSize: normalize(13) }]}>
              {vendor.location}
            </Text>
          </View>
          <View style={styles.metaBadgeCell}>
            <Star
              size={normalize(13)}
              color="#E6C687"
              fill="#E6C687"
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.metaLabelString, { fontSize: normalize(13) }]}>
              {vendor.rating} Verified Grade
            </Text>
          </View>
        </View>

        <View style={styles.separatorLine} />

        <Text style={[styles.sectionSubHeading, { fontSize: normalize(11) }]}>
          ABOUT THE STUDIO
        </Text>
        <Text style={[styles.descriptionTextBody, { fontSize: normalize(14) }]}>
          {vendor.description}
        </Text>

        <View style={styles.trustBannerRow}>
          <ShieldCheck size={normalize(18)} color="#630d2d" strokeWidth={2} />
          <Text style={[styles.trustLabelText, { fontSize: normalize(12) }]}>
            Bespoke Tier Velvetique Guaranteed Partner
          </Text>
        </View>
      </ScrollView>

      <View
        style={[
          styles.fixedActionFooter,
          { paddingHorizontal: dynamicPadding },
        ]}
      >
        <TouchableOpacity
          style={styles.consultBtn}
          activeOpacity={0.9}
          onPress={() => alert("Consultation request transmitted!")}
        >
          <Mail
            size={normalize(16)}
            color="#FFFFFF"
            strokeWidth={2}
            style={{ marginRight: 8 }}
          />
          <Text style={[styles.consultBtnText, { fontSize: normalize(13) }]}>
            Request Private Consultation
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  masterContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  errorText: {
    fontFamily: "Inter_400Regular",
    color: "#737373",
  },
  mediaContainer: {
    width: "100%",
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlayShield: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },
  floatingHeaderActions: {
    position: "absolute",

    top: Platform.OS === "ios" ? 54 : StatusBar.currentHeight + 14,
    right: 16,
    zIndex: 10,
  },
  circleBackBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  scrollProfileContent: {
    paddingTop: 24,
    paddingBottom: 140,
  },
  categoryBadgeText: {
    fontFamily: "Inter_600SemiBold",
    color: "#A0522D",
    letterSpacing: 1.2,
  },
  studioNameTitle: {
    fontFamily: "PlayfairDisplay_700Bold",
    color: "#171717",
    marginTop: 6,
    letterSpacing: -0.3,
  },
  locationMetadataRow: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    marginTop: 12,
  },
  metaBadgeCell: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaLabelString: {
    fontFamily: "Inter_400Regular",
    color: "#737373",
  },
  separatorLine: {
    height: 1,
    backgroundColor: "#F5F5F5",
    width: "100%",
    marginVertical: 22,
  },
  sectionSubHeading: {
    fontFamily: "Inter_600SemiBold",
    color: "#171717",
    letterSpacing: 1,
    marginBottom: 10,
  },
  descriptionTextBody: {
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
    color: "#444444",
  },
  trustBannerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(99, 13, 45, 0.05)",
    padding: 14,
    borderRadius: 14,
    marginTop: 28,
  },
  trustLabelText: {
    fontFamily: "Inter_600SemiBold",
    color: "#630d2d",
  },
  fixedActionFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    paddingTop: 16,
    paddingBottom: Platform.OS === "ios" ? 36 : 16,
    zIndex: 20,
  },
  consultBtn: {
    backgroundColor: "#630d2d",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 14,
  },
  consultBtnText: {
    fontFamily: "Inter_600SemiBold",
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

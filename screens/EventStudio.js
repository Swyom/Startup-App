import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ScrollView,
  Dimensions,
  PixelRatio,
  PanResponder,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ArrowLeft,
  Sparkles,
  MapPin,
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Heart,
  Briefcase,
  Gift,
  Star,
  Music,
} from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 375;
function normalize(size) {
  const newSize = size * scale;
  return Platform.OS === "ios"
    ? Math.round(PixelRatio.roundToNearestPixel(newSize))
    : Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}

const EVENT_TYPES = [
  { id: "Wedding", label: "Wedding", icon: Heart },
  { id: "Corporate", label: "Corporate", icon: Briefcase },
  { id: "Birthday", label: "Birthday", icon: Gift },
  { id: "Anniversary", label: "Anniversary", icon: Star },
  { id: "Party", label: "Social Party", icon: Music },
  { id: "Other", label: "Other", icon: Sparkles },
];

const BUDGET_CATEGORIES = [
  { id: "Elegant", label: "Elegant" },
  { id: "Premium", label: "Premium" },
  { id: "Grand", label: "Grand" },
  { id: "Exclusive", label: "Exclusive" },
];

const VENDOR_TYPES = [
  { id: "Caterer", icon: "restaurant-outline", label: "Caterer" },
  { id: "Photographer", icon: "camera-outline", label: "Photographer" },
  { id: "Makeup Artist", icon: "brush-outline", label: "Makeup Artist" },
  { id: "Decorator", icon: "gift-outline", label: "Decorator" },
  { id: "Venue", icon: "business-outline", label: "Venue" },
  { id: "Transport", icon: "car-outline", label: "Transport" },
  { id: "DJBand", icon: "musical-notes-outline", label: "DJ / Band" },
  { id: "Bartender", icon: "wine-outline", label: "Bartender" },
  { id: "Mehendi", icon: "color-palette-outline", label: "Mehendi Artist" },
];

const STEPS = [
  { title: "What are we celebrating?", subtitle: "Select the type of event." },
  { title: "When and where?", subtitle: "Give us the basic logistics." },
  {
    title: "What's the scale?",
    subtitle: "Tell us about guests and event tier.",
  },
  { title: "How can we help?", subtitle: "Select the services you need." },
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const SLIDER_STEPS = [
  "< 50",
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "1000",
  "1000+",
];

const TRACK_WIDTH = SCREEN_WIDTH - normalize(96);
const STEP_WIDTH = TRACK_WIDTH / (SLIDER_STEPS.length - 1);

export default function EventStudio() {
  const navigation = useNavigation();

  const [isSplashing, setIsSplashing] = useState(true);
  const splashOpacity = useRef(new Animated.Value(1)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    type: "",
    date: null,
    location: "",
    guests: "50",
    budgetCategory: "",
    services: [],
  });

  const [viewDate, setViewDate] = useState(new Date());
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const pan = useRef(new Animated.Value(1 * STEP_WIDTH)).current;
  const sliderIndexRef = useRef(1);

  useEffect(() => {
    let soundObject = null;
    const playIntro = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/Snap.mp3"),
        );
        soundObject = sound;
        await sound.playAsync();
      } catch (e) {
        console.warn("Audio Error:", e);
      }

      Animated.spring(logoScale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(splashOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start(() => {
          setIsSplashing(false);
          if (soundObject) soundObject.unloadAsync();
        });
      }, 1800);
    };
    playIntro();
  }, []);

  useEffect(() => {
    if (isSplashing) return;
    fadeAnim.setValue(0);
    slideAnim.setValue(20);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [step, isSplashing]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset(pan._value);
        pan.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        let newTotal = pan._offset + gestureState.dx;

        if (newTotal < 0) newTotal = 0;
        if (newTotal > TRACK_WIDTH) newTotal = TRACK_WIDTH;

        pan.setValue(newTotal - pan._offset);
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();

        const finalIndex = Math.round(pan._value / STEP_WIDTH);

        Animated.spring(pan, {
          toValue: finalIndex * STEP_WIDTH,
          useNativeDriver: false,
          bounciness: 10,
        }).start();

        setFormData((prev) => ({ ...prev, guests: SLIDER_STEPS[finalIndex] }));
      },
    }),
  ).current;

  useEffect(() => {
    const listener = pan.addListener(({ value }) => {
      const index = Math.round(value / STEP_WIDTH);
      if (
        index !== sliderIndexRef.current &&
        index >= 0 &&
        index < SLIDER_STEPS.length
      ) {
        sliderIndexRef.current = index;
        Haptics.selectionAsync();
        setFormData((prev) => ({ ...prev, guests: SLIDER_STEPS[index] }));
      }
    });
    return () => pan.removeListener(listener);
  }, []);

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else navigation.navigate("EventPackages", { requirements: formData });
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    else navigation.goBack();
  };

  const toggleService = (serviceId) => {
    setFormData((prev) => {
      const exists = prev.services.includes(serviceId);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== serviceId)
          : [...prev.services, serviceId],
      };
    });
  };

  const isNextDisabled = () => {
    if (step === 0) return !formData.type;
    if (step === 1) return !formData.date || !formData.location;
    if (step === 2) return !formData.budgetCategory;
    if (step === 3) return formData.services.length === 0;
    return false;
  };

  const changeMonth = (offset) => {
    setViewDate(
      new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1),
    );
  };

  const generateCalendarDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    let days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  };

  const SectionNextButton = ({ title = "Next Step" }) => (
    <TouchableOpacity
      style={[
        styles.inlineNextBtn,
        isNextDisabled() && styles.inlineNextBtnDisabled,
      ]}
      onPress={handleNext}
      disabled={isNextDisabled()}
      activeOpacity={0.8}
    >
      <Text style={styles.inlineNextBtnText}>{title}</Text>
      <ArrowRight
        size={normalize(20)}
        color="#FFF"
        style={{ marginLeft: normalize(8) }}
      />
    </TouchableOpacity>
  );

  const renderContent = () => {
    if (step === 0) {
      return (
        <View style={styles.inputStack}>
          <View style={styles.grid}>
            {EVENT_TYPES.map((type) => {
              const IconComponent = type.icon;
              const isActive = formData.type === type.id;
              return (
                <TouchableOpacity
                  key={type.id}
                  activeOpacity={0.7}
                  style={[styles.eventCard, isActive && styles.eventCardActive]}
                  onPress={() => setFormData({ ...formData, type: type.id })}
                >
                  <View
                    style={[
                      styles.iconWrapper,
                      isActive && styles.iconWrapperActive,
                    ]}
                  >
                    <IconComponent
                      size={normalize(24)}
                      color={isActive ? "#FFF" : "#630d2d"}
                    />
                  </View>
                  <Text
                    style={[
                      styles.eventCardText,
                      isActive && styles.eventCardTextActive,
                    ]}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <SectionNextButton />
        </View>
      );
    }

    if (step === 1) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return (
        <View style={styles.inputStack}>
          <View style={styles.calendarContainer}>
            <View style={styles.calendarHeader}>
              <TouchableOpacity
                onPress={() => changeMonth(-1)}
                style={styles.calNavBtn}
              >
                <ChevronLeft size={normalize(20)} color="#630d2d" />
              </TouchableOpacity>
              <Text style={styles.calendarMonthYear}>
                {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
              </Text>
              <TouchableOpacity
                onPress={() => changeMonth(1)}
                style={styles.calNavBtn}
              >
                <ChevronRight size={normalize(20)} color="#630d2d" />
              </TouchableOpacity>
            </View>

            <View style={styles.weekDaysRow}>
              {WEEKDAYS.map((day) => (
                <Text key={day} style={styles.weekDayText}>
                  {day}
                </Text>
              ))}
            </View>

            <View style={styles.daysGrid}>
              {generateCalendarDays().map((dateObj, index) => {
                if (!dateObj)
                  return <View key={`empty-${index}`} style={styles.dayCell} />;
                const isSelected =
                  formData.date &&
                  formData.date.toDateString() === dateObj.toDateString();
                const isToday =
                  new Date().toDateString() === dateObj.toDateString();

                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dayCell,
                      isSelected && styles.dayCellSelected,
                    ]}
                    onPress={() => setFormData({ ...formData, date: dateObj })}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        isToday && !isSelected && styles.dayTextToday,
                        isSelected && styles.dayTextSelected,
                      ]}
                    >
                      {dateObj.getDate()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <Text style={styles.sectionLabel}>Event Location</Text>
          <View style={styles.inputWrapper}>
            <MapPin
              size={normalize(20)}
              color="#630d2d"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="City or Venue Name"
              placeholderTextColor="#A09E9F"
              value={formData.location}
              onChangeText={(t) => setFormData({ ...formData, location: t })}
            />
          </View>
          <SectionNextButton />
        </View>
      );
    }

    if (step === 2) {
      return (
        <View style={styles.inputStack}>
          <Text style={styles.sectionLabel}>Estimated Guest Count</Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderValueText}>{formData.guests} Guests</Text>

            {}
            <View style={styles.sliderTrackWrapper}>
              {}
              <View style={styles.sliderTrackBackground} />
              {}
              <Animated.View style={[styles.sliderTrackFill, { width: pan }]} />

              {}
              {SLIDER_STEPS.map((_, i) => (
                <View
                  key={i}
                  style={[styles.sliderTick, { left: i * STEP_WIDTH }]}
                />
              ))}

              {}
              <Animated.View
                {...panResponder.panHandlers}
                style={[
                  styles.sliderThumb,
                  { transform: [{ translateX: pan }] },
                ]}
              >
                <View style={styles.sliderThumbInner} />
              </Animated.View>
            </View>

            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>&lt; 50</Text>
              <Text style={styles.sliderLabelText}>1000+</Text>
            </View>
          </View>

          <Text style={[styles.sectionLabel, { marginTop: normalize(15) }]}>
            Event Tier
          </Text>
          <View style={styles.grid}>
            {BUDGET_CATEGORIES.map((category) => {
              const isActive = formData.budgetCategory === category.id;
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.budgetCard,
                    isActive && styles.budgetCardActive,
                  ]}
                  onPress={() =>
                    setFormData({ ...formData, budgetCategory: category.id })
                  }
                >
                  <Text
                    style={[
                      styles.budgetCardTitle,
                      isActive && styles.budgetCardTitleActive,
                    ]}
                  >
                    {category.label}
                  </Text>
                  <Text
                    style={[
                      styles.budgetCardDesc,
                      isActive && styles.budgetCardDescActive,
                    ]}
                  >
                    {category.desc}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <SectionNextButton />
        </View>
      );
    }

    if (step === 3) {
      return (
        <View style={styles.inputStack}>
          <View style={styles.grid}>
            {VENDOR_TYPES.map((vendor) => {
              const isActive = formData.services.includes(vendor.id);
              return (
                <TouchableOpacity
                  key={vendor.id}
                  style={[
                    styles.serviceCard,
                    isActive && styles.serviceCardActive,
                  ]}
                  onPress={() => toggleService(vendor.id)}
                  activeOpacity={0.7}
                >
                  {isActive && (
                    <View style={styles.checkBadge}>
                      <Check size={normalize(12)} color="#FFF" />
                    </View>
                  )}
                  <Ionicons
                    name={vendor.icon}
                    size={normalize(28)}
                    color={isActive ? "#630d2d" : "#A09E9F"}
                    style={{ marginBottom: normalize(8) }}
                  />
                  <Text
                    style={[
                      styles.serviceText,
                      isActive && styles.serviceTextActive,
                    ]}
                  >
                    {vendor.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <SectionNextButton title="Find My Packages" />
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isSplashing && (
        <Animated.View
          style={[styles.splashOverlay, { opacity: splashOpacity }]}
        >
          <Animated.Image
            source={require("../assets/logo.png")}
            style={[styles.splashLogo, { transform: [{ scale: logoScale }] }]}
            resizeMode="contain"
          />
          <Text style={styles.splashText}>Entering Studio...</Text>
        </Animated.View>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.iconBtn}>
            <ArrowLeft size={normalize(24)} color="#630d2d" />
          </TouchableOpacity>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${((step + 1) / STEPS.length) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.stepText}>
            {step + 1}/{STEPS.length}
          </Text>
        </View>

        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          {!isSplashing && (
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
            >
              <View style={styles.titleContainer}>
                <Sparkles
                  size={normalize(28)}
                  color="#ff4d6d"
                  style={{ marginBottom: normalize(12) }}
                />
                <Text style={styles.title}>{STEPS[step].title}</Text>
                <Text style={styles.subtitle}>{STEPS[step].subtitle}</Text>
              </View>
              {renderContent()}
            </Animated.View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDF7F8" },

  splashOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#630d2d",
    zIndex: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  splashLogo: { width: normalize(200), height: normalize(150) },
  splashText: {
    color: "#FFF",
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: normalize(20),
    marginTop: normalize(20),
    letterSpacing: 2,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: normalize(20),
    paddingTop: normalize(15),
    paddingBottom: normalize(10),
  },
  iconBtn: { padding: normalize(5), marginLeft: -normalize(5) },
  progressTrack: {
    flex: 1,
    height: normalize(6),
    backgroundColor: "#EBE7E0",
    borderRadius: normalize(3),
    marginHorizontal: normalize(15),
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#630d2d",
    borderRadius: normalize(3),
  },
  stepText: { fontSize: normalize(14), fontWeight: "600", color: "#630d2d" },

  scrollArea: { flex: 1 },
  scrollContent: {
    paddingHorizontal: normalize(24),
    paddingBottom: normalize(220),
  },

  titleContainer: { marginTop: normalize(10), marginBottom: normalize(30) },
  title: {
    fontSize: normalize(32),
    fontFamily: "PlayfairDisplay_700Bold",
    color: "#630d2d",
    marginBottom: normalize(8),
    lineHeight: normalize(40),
  },
  subtitle: { fontSize: normalize(16), color: "#888" },
  sectionLabel: {
    fontSize: normalize(16),
    fontFamily: "PlayfairDisplay_700Bold",
    color: "#630d2d",
    marginBottom: normalize(12),
    marginTop: normalize(10),
  },
  inputStack: { gap: normalize(16) },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: normalize(12),
  },

  eventCard: {
    width: "48%",
    backgroundColor: "#FFF",
    paddingVertical: normalize(20),
    borderRadius: normalize(20),
    borderWidth: 1,
    borderColor: "#EBE7E0",
    alignItems: "center",
    justifyContent: "center",
  },
  eventCardActive: { backgroundColor: "#630d2d", borderColor: "#630d2d" },
  iconWrapper: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(25),
    backgroundColor: "#FDF7F8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: normalize(12),
  },
  iconWrapperActive: { backgroundColor: "rgba(255,255,255,0.15)" },
  eventCardText: {
    fontSize: normalize(15),
    color: "#1A1510",
    fontWeight: "600",
  },
  eventCardTextActive: { color: "#FFF" },

  calendarContainer: {
    backgroundColor: "#FFF",
    borderRadius: normalize(20),
    padding: normalize(20),
    borderWidth: 1,
    borderColor: "#EBE7E0",
    marginBottom: normalize(10),
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: normalize(20),
  },
  calNavBtn: {
    padding: normalize(5),
    backgroundColor: "#FDF7F8",
    borderRadius: normalize(8),
  },
  calendarMonthYear: {
    fontSize: normalize(16),
    fontFamily: "PlayfairDisplay_700Bold",
    color: "#630d2d",
  },
  weekDaysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: normalize(10),
  },
  weekDayText: {
    width: `${100 / 7}%`,
    textAlign: "center",
    fontSize: normalize(13),
    color: "#888",
    fontWeight: "600",
  },
  daysGrid: { flexDirection: "row", flexWrap: "wrap" },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: normalize(5),
  },
  dayCellSelected: { backgroundColor: "#630d2d", borderRadius: normalize(20) },
  dayText: { fontSize: normalize(15), color: "#1A1510", fontWeight: "500" },
  dayTextToday: { color: "#ff4d6d", fontWeight: "700" },
  dayTextSelected: { color: "#FFF", fontWeight: "700" },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: normalize(16),
    borderWidth: 1,
    borderColor: "#EBE7E0",
    paddingHorizontal: normalize(16),
    height: normalize(60),
  },
  inputIcon: { marginRight: normalize(12) },
  input: { flex: 1, fontSize: normalize(16), color: "#1A1510", height: "100%" },

  sliderContainer: {
    backgroundColor: "#FFF",
    padding: normalize(24),
    borderRadius: normalize(20),
    borderWidth: 1,
    borderColor: "#EBE7E0",
    alignItems: "center",
    marginBottom: normalize(10),
  },
  sliderValueText: {
    fontSize: normalize(28),
    fontFamily: "PlayfairDisplay_700Bold",
    color: "#630d2d",
    marginBottom: normalize(10),
  },
  sliderTrackWrapper: {
    width: TRACK_WIDTH,
    height: normalize(24),
    justifyContent: "center",
    marginVertical: normalize(16),
  },

  sliderTrackBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    height: normalize(2),
    backgroundColor: "#EBE7E0",
    borderRadius: normalize(1),
  },
  sliderTrackFill: {
    position: "absolute",
    left: 0,
    height: normalize(2),
    backgroundColor: "#630d2d",
    borderRadius: normalize(1),
  },

  sliderTick: {
    position: "absolute",
    width: normalize(4),
    height: normalize(4),
    borderRadius: normalize(2),
    backgroundColor: "#D1CDCE",
    top: normalize(10),
    marginLeft: normalize(-2),
  },

  sliderThumb: {
    position: "absolute",
    width: normalize(28),
    height: normalize(28),
    borderRadius: normalize(14),
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#EBE7E0",
    justifyContent: "center",
    alignItems: "center",
    top: normalize(-2),
    marginLeft: normalize(-14),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  sliderThumbInner: {
    width: normalize(10),
    height: normalize(10),
    borderRadius: normalize(5),
    backgroundColor: "#630d2d",
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  sliderLabelText: {
    color: "#888",
    fontSize: normalize(12),
    fontWeight: "600",
  },

  budgetCard: {
    width: "48%",
    backgroundColor: "#FFF",
    paddingVertical: normalize(20),
    borderRadius: normalize(16),
    borderWidth: 1,
    borderColor: "#EBE7E0",
    alignItems: "center",
    justifyContent: "center",
  },
  budgetCardActive: { backgroundColor: "#630d2d", borderColor: "#630d2d" },
  budgetCardTitle: {
    fontSize: normalize(16),
    fontWeight: "700",
    color: "#1A1510",
    marginBottom: normalize(4),
  },
  budgetCardTitleActive: { color: "#FFF" },
  budgetCardDesc: {
    fontSize: normalize(12),
    color: "#888",
    textAlign: "center",
  },
  budgetCardDescActive: { color: "rgba(255,255,255,0.7)" },

  serviceCard: {
    width: "48%",
    backgroundColor: "#FFF",
    padding: normalize(20),
    borderRadius: normalize(16),
    borderWidth: 1,
    borderColor: "#EBE7E0",
    alignItems: "center",
  },
  serviceCardActive: {
    borderColor: "#630d2d",
    backgroundColor: "rgba(99, 13, 45, 0.05)",
  },
  checkBadge: {
    position: "absolute",
    top: normalize(10),
    right: normalize(10),
    backgroundColor: "#630d2d",
    borderRadius: normalize(10),
    padding: normalize(4),
  },
  serviceText: {
    fontSize: normalize(13),
    color: "#4A4A4A",
    fontWeight: "600",
    textAlign: "center",
  },
  serviceTextActive: { color: "#630d2d" },

  inlineNextBtn: {
    backgroundColor: "#630d2d",
    height: normalize(60),
    borderRadius: normalize(16),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: normalize(15),
  },
  inlineNextBtnDisabled: { backgroundColor: "#C4B9BC" },
  inlineNextBtnText: {
    color: "#FFF",
    fontSize: normalize(16),
    fontWeight: "600",
  },
});

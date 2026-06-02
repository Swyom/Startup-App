import React, { useState } from "react";
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
  CheckCircle2,
  Circle,
  Calendar,
  ChevronRight,
  Sparkles,
  ArrowLeft,
} from "lucide-react-native";

const INITIAL_TASKS = [
  {
    id: "1",
    title: "Finalize bridal gown alteration sizing",
    category: "Attire",
    daysLeft: 90,
    completed: true,
  },
  {
    id: "2",
    title: "Confirm floral color palette with designer",
    category: "Decor",
    daysLeft: 60,
    completed: false,
  },
  {
    id: "3",
    title: "Order custom emerald velvet ring boxes",
    category: "Accessories",
    daysLeft: 45,
    completed: false,
  },
  {
    id: "4",
    title: "Send out premium stationery invitations",
    category: "Planning",
    daysLeft: 60,
    completed: false,
  },
  {
    id: "5",
    title: "Review centerpiece table mockups",
    category: "Decor",
    daysLeft: 30,
    completed: false,
  },
];

const CATEGORIES = ["All", "Planning", "Attire", "Decor", "Accessories"];

export default function ChecklistScreen({ navigation }) {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { width: windowWidth } = useWindowDimensions();

  const isLargeDevice = windowWidth > 450;
  const baseScale = windowWidth / 375;
  const normalize = (size, factor = 0.5) =>
    size + (baseScale * size - size) * factor;

  const dynamicPadding = isLargeDevice ? windowWidth * 0.08 : normalize(20);
  const dynamicCardGap = normalize(12);

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const progressPercent =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const filteredTasks = tasks.filter((task) =>
    selectedCategory === "All" ? true : task.category === selectedCategory,
  );

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
                Milestone Plan
              </Text>
              <Text
                style={[styles.headerSubtitle, { fontSize: normalize(11) }]}
              >
                Your curated journey breakdown
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
          <View style={styles.progressCard}>
            <View style={styles.progressHeaderRow}>
              <View>
                <Text
                  style={[styles.progressLabel, { fontSize: normalize(10) }]}
                >
                  TOTAL PROGRESS
                </Text>
                <Text
                  style={[styles.progressTitle, { fontSize: normalize(20) }]}
                >
                  {progressPercent}% Complete
                </Text>
              </View>
              <View style={styles.sparkleIconBadge}>
                <Sparkles
                  size={normalize(16)}
                  color="#E6C687"
                  strokeWidth={2}
                />
              </View>
            </View>

            {}
            <View style={styles.progressBarTrack}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progressPercent}%` },
                ]}
              />
            </View>

            <View style={styles.progressFooterRow}>
              <Text
                style={[styles.progressFooterText, { fontSize: normalize(11) }]}
              >
                {completedTasks} of {totalTasks} elements finalized
              </Text>
              <Text
                style={[
                  styles.progressCelebrationText,
                  { fontSize: normalize(11) },
                ]}
              >
                {progressPercent === 100 ? "Flawless!" : "Keep curating"}
              </Text>
            </View>
          </View>

          {}
          <View style={styles.filterPillWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterPillContainer}
              contentContainerStyle={styles.filterPillContent}
            >
              {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <TouchableOpacity
                    key={category}
                    activeOpacity={0.75}
                    onPress={() => setSelectedCategory(category)}
                    style={[
                      styles.filterPill,
                      isActive && styles.filterPillActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterPillText,
                        { fontSize: normalize(11) },
                        isActive && styles.filterPillTextActive,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {}
          <View style={styles.tasksContainer}>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.taskCard,
                    item.completed && styles.taskCardCompleted,
                    { marginBottom: dynamicCardGap },
                  ]}
                  activeOpacity={0.8}
                  onPress={() => toggleTaskCompletion(item.id)}
                >
                  <View style={styles.taskCardLeftContent}>
                    {}
                    <View style={styles.checkboxContainer}>
                      {item.completed ? (
                        <CheckCircle2
                          size={normalize(22)}
                          color="#630d2d"
                          strokeWidth={2.5}
                        />
                      ) : (
                        <Circle
                          size={normalize(22)}
                          color="#CCCCCC"
                          strokeWidth={1.5}
                        />
                      )}
                    </View>

                    <View style={styles.taskTextDataColumn}>
                      <Text
                        style={[
                          styles.taskCategoryTag,
                          { fontSize: normalize(9) },
                        ]}
                      >
                        {item.category}
                      </Text>
                      <Text
                        style={[
                          styles.taskTitleText,
                          { fontSize: normalize(14) },
                          item.completed && styles.taskTitleTextCompleted,
                        ]}
                        numberOfLines={2}
                      >
                        {item.title}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.taskCardRightContent}>
                    <View style={styles.daysBadge}>
                      <Calendar
                        size={normalize(11)}
                        color="#737373"
                        style={{ marginRight: 4 }}
                      />
                      <Text
                        style={[styles.daysText, { fontSize: normalize(10) }]}
                      >
                        {item.daysLeft}d left
                      </Text>
                    </View>
                    <ChevronRight size={normalize(14)} color="#A3A3A3" />
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.innerEmptyState}>
                <Text
                  style={[styles.innerEmptyText, { fontSize: normalize(13) }]}
                >
                  No active milestones found in this collection.
                </Text>
              </View>
            )}
          </View>
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

  progressCard: {
    backgroundColor: "#630d2d",
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: "#630d2d",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  progressHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  progressLabel: {
    color: "rgba(255, 255, 255, 0.45)",
    fontWeight: "700",
    letterSpacing: 1.2,
  },
  progressTitle: {
    color: "#FFFFFF",
    fontWeight: "700",
    marginTop: 4,
    letterSpacing: -0.2,
  },
  sparkleIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.16)",
    borderRadius: 3,
    marginVertical: 18,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#E6C687",
    borderRadius: 3,
  },
  progressFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressFooterText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "400",
  },
  progressCelebrationText: {
    color: "#E6C687",
    fontWeight: "600",
  },

  filterPillWrapper: {
    marginHorizontal: -20,
    marginBottom: 20,
  },
  filterPillContainer: {
    flexGrow: 0,
  },
  filterPillContent: {
    paddingHorizontal: 20,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 99,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ECECEC",
  },
  filterPillActive: {
    backgroundColor: "#171717",
    borderColor: "#171717",
  },
  filterPillText: {
    color: "#525252",
    fontWeight: "500",
  },
  filterPillTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  tasksContainer: {
    width: "100%",
  },
  taskCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ECECEC",
    alignItems: "center",
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.015,
        shadowRadius: 10,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  taskCardCompleted: {
    opacity: 0.6,
    backgroundColor: "#F7F7F7",
    borderColor: "#EAEAEA",
  },
  taskCardLeftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 8,
  },
  checkboxContainer: {
    marginRight: 14,
  },
  taskTextDataColumn: {
    flex: 1,
  },
  taskCategoryTag: {
    color: "#A0522D",
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  taskTitleText: {
    color: "#171717",
    fontWeight: "500",
    lineHeight: 19,
  },
  taskTitleTextCompleted: {
    textDecorationLine: "line-through",
    color: "#737373",
  },
  taskCardRightContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  daysBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 6,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  daysText: {
    color: "#525252",
    fontWeight: "600",
  },
  innerEmptyState: {
    paddingVertical: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  innerEmptyText: {
    color: "#737373",
    fontWeight: "400",
    textAlign: "center",
  },
});

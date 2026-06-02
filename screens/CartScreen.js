import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
  StyleSheet,
  Platform,
  Modal,
} from "react-native";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react-native";

const INITIAL_CART_ITEMS = [
  {
    id: "1",
    name: "Amara Revolved Bridal Gown",
    category: "Bridal Wear",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1594552072238-b8a33785b261?q=80&w=200&auto=format&fit=crop",
    quantity: 1,
  },
  {
    id: "2",
    name: "White Rose & Eucalyptus Centerpiece",
    category: "Floral & Decor",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=200&auto=format&fit=crop",
    quantity: 4,
  },
  {
    id: "3",
    name: "Premium Velvet Ring Box (Emerald)",
    category: "Accessories",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=200&auto=format&fit=crop",
    quantity: 1,
  },
];

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);
  const [alertVisible, setAlertVisible] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [isCheckoutAlert, setIsCheckoutAlert] = useState(false);

  const { width: windowWidth } = useWindowDimensions();

  const isLargeDevice = windowWidth > 450;
  const baseScale = windowWidth / 375;
  const normalize = (size, factor = 0.5) =>
    size + (baseScale * size - size) * factor;

  const dynamicPadding = isLargeDevice ? windowWidth * 0.08 : normalize(16);
  const dynamicCardGap = normalize(12);

  const updateQuantity = (id, action) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const newQty =
              action === "increase" ? item.quantity + 1 : item.quantity - 1;
            return newQty > 0 ? { ...item, quantity: newQty } : item;
          }
          return item;
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const requestRemoveItem = (id) => {
    setIsCheckoutAlert(false);
    setPendingDeleteId(id);
    setAlertVisible(true);
  };

  const confirmRemoveItem = () => {
    if (pendingDeleteId) {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== pendingDeleteId),
      );
      setPendingDeleteId(null);
    }
    setAlertVisible(false);
  };

  const triggerCheckoutAlert = () => {
    setIsCheckoutAlert(true);
    setAlertVisible(true);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const serviceFee = cartItems.length > 0 ? 25 : 0;
  const total = subtotal + serviceFee;

  return (
    <View style={styles.masterBackground}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={alertVisible}
        onRequestClose={() => setAlertVisible(false)}
      >
        <View style={styles.modalBackdropBlur}>
          <View
            style={[styles.modalCardContainer, { width: windowWidth * 0.84 }]}
          >
            <View
              style={[
                styles.modalIconWrapper,
                {
                  backgroundColor: isCheckoutAlert
                    ? "rgba(99, 13, 45, 0.08)"
                    : "rgba(239, 68, 68, 0.08)",
                },
              ]}
            >
              {isCheckoutAlert ? (
                <ShieldCheck
                  size={normalize(26)}
                  color="#630d2d"
                  strokeWidth={1.8}
                />
              ) : (
                <Trash2
                  size={normalize(24)}
                  color="#ef4444"
                  strokeWidth={1.8}
                />
              )}
            </View>

            <Text style={[styles.modalTitle, { fontSize: normalize(17) }]}>
              {isCheckoutAlert ? "Secure Checkout" : "Remove item from Bag?"}
            </Text>
            <Text
              style={[styles.modalDescription, { fontSize: normalize(13) }]}
            >
              {isCheckoutAlert
                ? "You are proceeding to our encrypted payment gateway to complete your milestone curation."
                : "This action will instantly delete this designer selection from your custom celebration list."}
            </Text>

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.modalSecondaryBtn}
                activeOpacity={0.7}
                onPress={() => setAlertVisible(false)}
              >
                <Text
                  style={[
                    styles.modalSecondaryBtnText,
                    { fontSize: normalize(13) },
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalPrimaryBtn,
                  { backgroundColor: isCheckoutAlert ? "#630d2d" : "#ef4444" },
                ]}
                activeOpacity={0.85}
                onPress={
                  isCheckoutAlert
                    ? () => setAlertVisible(false)
                    : confirmRemoveItem
                }
              >
                <Text
                  style={[
                    styles.modalPrimaryBtnText,
                    { fontSize: normalize(13) },
                  ]}
                >
                  {isCheckoutAlert ? "Proceed" : "Remove"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <ArrowLeft
                size={normalize(18)}
                color="#171717"
                strokeWidth={2.5}
              />
            </TouchableOpacity>
            <View>
              <Text style={[styles.headerTitle, { fontSize: normalize(18) }]}>
                Registry Bag
              </Text>
              <Text
                style={[styles.headerSubtitle, { fontSize: normalize(11) }]}
              >
                Curated Celebration Essentials
              </Text>
            </View>
          </View>
          <View style={styles.badge}>
            <Text style={[styles.badgeText, { fontSize: normalize(11) }]}>
              {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
            </Text>
          </View>
        </View>

        {cartItems.length > 0 ? (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingHorizontal: dynamicPadding,
                paddingBottom: Platform.OS === "ios" ? 40 : 24,
              },
            ]}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ marginBottom: dynamicCardGap }}>
              {cartItems.map((item) => (
                <View
                  key={item.id}
                  style={[styles.card, { marginBottom: dynamicCardGap }]}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />

                  <View style={styles.cardContent}>
                    <View>
                      <View style={styles.cardHeaderRow}>
                        <Text
                          style={[
                            styles.cardCategory,
                            { fontSize: normalize(9) },
                          ]}
                        >
                          {item.category}
                        </Text>
                        <TouchableOpacity
                          onPress={() => requestRemoveItem(item.id)}
                          style={styles.deleteButton}
                          activeOpacity={0.6}
                          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                        >
                          <Trash2
                            size={normalize(15)}
                            color="#A3A3A3"
                            strokeWidth={2}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text
                        style={[styles.cardTitle, { fontSize: normalize(14) }]}
                        numberOfLines={2}
                      >
                        {item.name}
                      </Text>
                    </View>

                    <View style={styles.cardActionRow}>
                      <Text
                        style={[styles.cardPrice, { fontSize: normalize(15) }]}
                      >
                        ${(item.price * item.quantity).toLocaleString()}
                      </Text>

                      <View style={styles.quantityPill}>
                        <TouchableOpacity
                          onPress={() => updateQuantity(item.id, "decrease")}
                          style={styles.quantityBtn}
                          activeOpacity={0.6}
                        >
                          <Minus
                            size={normalize(11)}
                            color="#171717"
                            strokeWidth={2.5}
                          />
                        </TouchableOpacity>

                        <Text
                          style={[
                            styles.quantityText,
                            { fontSize: normalize(12) },
                          ]}
                        >
                          {item.quantity}
                        </Text>

                        <TouchableOpacity
                          onPress={() => updateQuantity(item.id, "increase")}
                          style={styles.quantityBtn}
                          activeOpacity={0.6}
                        >
                          <Plus
                            size={normalize(11)}
                            color="#171717"
                            strokeWidth={2.5}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.drawerCard}>
              <View style={styles.pricingContainer}>
                <View style={styles.priceRow}>
                  <Text
                    style={[styles.priceLabel, { fontSize: normalize(11) }]}
                  >
                    Subtotal
                  </Text>
                  <Text
                    style={[styles.priceValue, { fontSize: normalize(13) }]}
                  >
                    ${subtotal.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.priceRow}>
                  <Text
                    style={[styles.priceLabel, { fontSize: normalize(11) }]}
                  >
                    Concierge & Shipping
                  </Text>
                  <Text
                    style={[styles.priceValue, { fontSize: normalize(13) }]}
                  >
                    {serviceFee === 0 ? "Complimentary" : `$${serviceFee}.00`}
                  </Text>
                </View>

                <View style={styles.separator} />

                <View style={styles.priceRow}>
                  <View>
                    <Text
                      style={[styles.totalLabel, { fontSize: normalize(15) }]}
                    >
                      Total Value
                    </Text>
                    <Text style={styles.totalSubtext}>
                      Taxes computed at payment gate
                    </Text>
                  </View>
                  <Text
                    style={[styles.totalValue, { fontSize: normalize(22) }]}
                  >
                    ${total.toLocaleString()}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.checkoutBtn}
                onPress={triggerCheckoutAlert}
                activeOpacity={0.9}
              >
                <Text
                  style={[styles.checkoutBtnText, { fontSize: normalize(12) }]}
                >
                  Proceed to Checkout
                </Text>
                <ArrowRight
                  size={normalize(14)}
                  color="#ffffff"
                  strokeWidth={2.5}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <ShoppingBag
                size={normalize(28)}
                color="#A3A3A3"
                strokeWidth={1.5}
              />
            </View>
            <Text style={[styles.emptyTitle, { fontSize: normalize(19) }]}>
              Your Registry is Empty
            </Text>
            <Text style={[styles.emptySubtitle, { fontSize: normalize(13) }]}>
              Begin curating your special milestones by exploring our refined
              boutique designs.
            </Text>
            <TouchableOpacity style={styles.emptyBtn} activeOpacity={0.8}>
              <Text style={[styles.emptyBtnText, { fontSize: normalize(12) }]}>
                Explore Collections
              </Text>
            </TouchableOpacity>
          </View>
        )}
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

  modalBackdropBlur: {
    flex: 1,
    backgroundColor: "rgba(23, 23, 23, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#171717",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.12,
        shadowRadius: 24,
      },
      android: {
        elevation: 16,
      },
    }),
  },
  modalIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontWeight: "700",
    color: "#171717",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  modalDescription: {
    color: "#737373",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 6,
    marginBottom: 24,
  },
  modalButtonRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  modalSecondaryBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalSecondaryBtnText: {
    color: "#525252",
    fontWeight: "600",
  },
  modalPrimaryBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  modalPrimaryBtnText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  header: {
    height: 68,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 8,
    marginLeft: -4,
    marginRight: 10,
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
  badge: {
    backgroundColor: "#171717",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
  },
  badgeText: {
    fontWeight: "600",
    color: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ECECEC",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.02,
        shadowRadius: 10,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  cardImage: {
    width: 95,
    height: 120,
    backgroundColor: "#F5F5F5",
  },
  cardContent: {
    flex: 1,
    padding: 14,
    justifyContent: "space-between",
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardCategory: {
    color: "#9a3412",
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  deleteButton: {
    padding: 2,
    marginTop: -2,
  },
  cardTitle: {
    color: "#171717",
    fontWeight: "500",
    lineHeight: 19,
    paddingRight: 12,
  },
  cardActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  cardPrice: {
    color: "#171717",
    fontWeight: "700",
  },
  quantityPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 99,
    padding: 3,
  },
  quantityBtn: {
    width: 24,
    height: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  quantityText: {
    color: "#171717",
    fontWeight: "600",
    marginHorizontal: 12,
  },
  drawerCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ECECEC",
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.03,
        shadowRadius: 16,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  pricingContainer: {
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  priceLabel: {
    color: "#737373",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  priceValue: {
    color: "#262626",
    fontWeight: "600",
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
    width: "100%",
    marginVertical: 14,
  },
  totalLabel: {
    color: "#171717",
    fontWeight: "700",
  },
  totalSubtext: {
    fontSize: 10,
    color: "#A3A3A3",
    fontWeight: "400",
    marginTop: 2,
  },
  totalValue: {
    color: "#171717",
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  checkoutBtn: {
    backgroundColor: "#171717",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 14,
  },
  checkoutBtnText: {
    color: "#FFFFFF",
    fontWeight: "600",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginRight: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    backgroundColor: "#FAFAFA",
  },
  emptyIconCircle: {
    width: 76,
    height: 76,
    backgroundColor: "#FFFFFF",
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  emptyTitle: {
    fontWeight: "700",
    color: "#171717",
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  emptySubtitle: {
    color: "#737373",
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 270,
  },
  emptyBtn: {
    marginTop: 24,
    backgroundColor: "#171717",
    paddingHorizontal: 26,
    paddingVertical: 14,
    borderRadius: 14,
  },
  emptyBtnText: {
    color: "#FFFFFF",
    fontWeight: "600",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
});

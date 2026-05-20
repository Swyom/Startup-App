import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Dimensions, 
  Animated 
} from 'react-native';
import { useFonts, PlayfairDisplay_700Bold, PlayfairDisplay_600SemiBold } from '@expo-google-fonts/playfair-display';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { Star, ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const scaleFont = (size) => (width / 375) * size;

export default function HomeScreen({ navigation }) {
  // 1. Setup Animation for the luxury entrance
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(20)).current;

  // 2. Load Luxury Fonts
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_600SemiBold,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(slideUp, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  const vendors = [
    { 
      id: '1', 
      name: 'Elegant Floral Designs', 
      category: 'Florist', 
      rating: 4.8, 
      image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=500' 
    },
    { 
      id: '2', 
      name: 'Golden Light Photo', 
      category: 'Photographer', 
      rating: 5.0, 
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=500' 
    },
    { 
      id: '3', 
      name: 'Classic Catering Co.', 
      category: 'Catering', 
      rating: 4.6, 
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=500' 
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* HERO SECTION - Animated entrance */}
        <Animated.View style={[styles.heroSection, { opacity: fadeAnim, transform: [{ translateY: slideUp }] }]}>
          <Text style={styles.welcomeText}>Hello, Bride-to-be</Text>
          <Text style={styles.headerTitle}>Find Your Perfect{"\n"}Vendors</Text>
        </Animated.View>

        {/* SECTION HEADER */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for you</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        
        {/* VENDOR LIST */}
        <View style={styles.vendorList}>
          {vendors.map(vendor => (
            <TouchableOpacity 
              key={vendor.id} 
              style={styles.vendorCard}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('VendorProfile', { vendor })}
            >
              <Image source={{ uri: vendor.image }} style={styles.cardImage} />
              
              <View style={styles.cardInfoRow}>
                <View style={styles.vendorMainInfo}>
                  <Text style={styles.vendorName}>{vendor.name}</Text>
                  <View style={styles.metaRow}>
                    <Text style={styles.vendorCategory}>{vendor.category}</Text>
                    <View style={styles.separatorDot} />
                    <Star size={12} color="#630d2d" fill="#630d2d" />
                    <Text style={styles.ratingText}>{vendor.rating}</Text>
                  </View>
                </View>
                
                <View style={styles.iconCircle}>
                  <ChevronRight size={18} color="#630d2d" strokeWidth={3} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Space for the bottom floating dock */}
        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // High-end off-white
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 24,
  },
  heroSection: {
    marginBottom: 35,
  },
  welcomeText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: '#A0A0A0',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    marginBottom: 10,
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: scaleFont(34),
    color: '#2D2D2D',
    lineHeight: scaleFont(42),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 20,
    color: '#630d2d',
  },
  viewAll: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: '#A0A0A0',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  vendorList: {
    gap: 24,
  },
  vendorCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    overflow: 'hidden',
    // Luxury Shadow
    shadowColor: '#630d2d',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  cardImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#F0F0F0',
  },
  cardInfoRow: {
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vendorMainInfo: {
    flex: 1,
  },
  vendorName: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 19,
    color: '#2D2D2D',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vendorCategory: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#777',
  },
  separatorDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#D0D0D0',
    marginHorizontal: 10,
  },
  ratingText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: '#2D2D2D',
    marginLeft: 4,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9F0F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
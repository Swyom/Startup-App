import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

const PACKAGES = [
  { id: '1', title: 'Velvet Royal Package', price: '₹5,00,000', features: 'Decor + Catering + Photography' },
  { id: '2', title: 'Minimalist Chic', price: '₹2,50,000', features: 'Decor + Catering' },
];

export default function EventPackages() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Recommended For You</Text>
      <FlatList 
        data={PACKAGES}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.pkgTitle}>{item.title}</Text>
            <Text style={styles.pkgPrice}>{item.price}</Text>
            <Text style={styles.pkgFeatures}>{item.features}</Text>
            <TouchableOpacity style={styles.viewBtn}>
              <Text style={styles.viewBtnText}>View Details</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF7F8', padding: 20 },
  title: { fontSize: 24, fontFamily: 'PlayfairDisplay_700Bold', color: '#630d2d', marginBottom: 20 },
  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 16, marginBottom: 15, borderWidth: 1, borderColor: '#EBE7E0' },
  pkgTitle: { fontSize: 18, fontFamily: 'PlayfairDisplay_700Bold', color: '#630d2d' },
  pkgPrice: { fontSize: 16, color: '#630d2d', marginVertical: 5 },
  pkgFeatures: { color: '#888', marginBottom: 15 },
  viewBtn: { backgroundColor: '#FDF7F8', padding: 12, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#630d2d' },
  viewBtnText: { color: '#630d2d', fontWeight: 'bold' }
});
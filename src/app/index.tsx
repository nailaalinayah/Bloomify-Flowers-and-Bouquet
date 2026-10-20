
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { flowers, formatRupiah } from '../data/flowers';
import { useShop } from '../context/ShopContext';

const categories = ['Semua', 'Mawar', 'Sunflower', 'Pink', 'Putih'];

export default function HomeScreen() {
  //useState input pencarian dan kategori aktif.
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');

  const { favorites, toggleFavorite, cart } = useShop();

  //useEffect berjalan saat nilai pencarian/kategori berubah.
  useEffect(() => {
    console.log('Pencarian:', search);
    console.log('Kategori aktif:', category);
  }, [search, category]);

  const filteredFlowers = flowers.filter((flower) => {
    const matchSearch = flower.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === 'Semua' || flower.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>Bloomify 🌷</Text>
          <Text style={styles.subtitle}>Flowers for every moment</Text>
        </View>

        <Pressable
          style={styles.topButton}
          onPress={() => router.push('/cart')}
        >
          <Text style={styles.topButtonText}>🛒 {cart.length}</Text>
        </Pressable>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Bunga indah,</Text>
        <Text style={styles.heroTitle}>untuk cerita indahmu.</Text>
        <Text style={styles.heroText}>
          Temukan buket favoritmu di Bloomify.
        </Text>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Cari buket bunga..."
        placeholderTextColor="#A98A99"
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.quickLinks}>
        <Pressable
          style={styles.quickButton}
          onPress={() => router.push('/favorites')}
        >
          <Text style={styles.quickText}>
            ♡ Favorit ({favorites.length})
          </Text>
        </Pressable>

        <Pressable
          style={styles.quickButton}
          onPress={() => router.push('/cart')}
        >
          <Text style={styles.quickText}>🛒 Keranjang</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Kategori</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
      >
        {categories.map((item) => (
          <Pressable
            key={item}
            style={[
              styles.categoryButton,
              category === item && styles.categoryActive,
            ]}
            onPress={() => setCategory(item)}
          >
            <Text
              style={[
                styles.categoryText,
                category === item && styles.categoryTextActive,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Pilihan Buket</Text>

      <View style={styles.productList}>
        {filteredFlowers.map((flower) => (
          <View key={flower.id} style={styles.card}>
            <Pressable
              onPress={() =>
                router.push(`/product/${flower.id}`)
              }
            >
              <Image
                source={{ uri: flower.image }}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{flower.name}</Text>
                <Text style={styles.productCategory}>
                  {flower.category}
                </Text>
                <Text style={styles.price}>
                  {formatRupiah(flower.price)}
                </Text>
              </View>
            </Pressable>

            <View style={styles.cardButtons}>
              <Pressable
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(flower.id)}
              >
                <Text style={styles.favoriteText}>
                  {favorites.includes(flower.id) ? '♥' : '♡'}
                </Text>
              </Pressable>

              <Pressable
                style={styles.detailButton}
                onPress={() =>
                  router.push(`/product/${flower.id}`)
                }
              >
                <Text style={styles.detailButtonText}>
                  Lihat Detail
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      {filteredFlowers.length === 0 && (
        <Text style={styles.emptyText}>
          Buket tidak ditemukan. Coba kata kunci lain.
        </Text>
      )}

      <Text style={styles.footer}>
        Bloomify — made with love 🌸
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9FC',
    paddingHorizontal: 18,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#A34E73',
  },
  subtitle: {
    color: '#927583',
    marginTop: 3,
  },
  topButton: {
    backgroundColor: '#F9DFEA',
    padding: 12,
    borderRadius: 15,
  },
  topButtonText: {
    color: '#914769',
    fontWeight: 'bold',
  },
  hero: {
    backgroundColor: '#F8DDE9',
    borderRadius: 22,
    padding: 22,
    marginBottom: 18,
  },
  heroTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#884260',
  },
  heroText: {
    marginTop: 10,
    color: '#815D6D',
  },
  search: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0D5E1',
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 13,
    marginBottom: 14,
    color: '#633D50',
  },
  quickLinks: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  quickButton: {
    flex: 1,
    backgroundColor: '#F5E7EE',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  quickText: {
    color: '#8C4765',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#87435F',
    marginBottom: 12,
  },
  categoryList: {
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#F5E7EE',
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryActive: {
    backgroundColor: '#B95F85',
  },
  categoryText: {
    color: '#8D5870',
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3E2EA',
    paddingBottom: 10,
  },
  productImage: {
    width: '100%',
    height: 135,
    backgroundColor: '#F6EAF0',
  },
  productInfo: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  productName: {
    color: '#603B4E',
    fontWeight: 'bold',
    fontSize: 14,
  },
  productCategory: {
    color: '#A17F90',
    fontSize: 12,
    marginTop: 4,
  },
  price: {
    color: '#B4517B',
    fontWeight: 'bold',
    marginTop: 7,
  },
  cardButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    marginTop: 10,
  },
  favoriteButton: {
    backgroundColor: '#F9E8F0',
    borderRadius: 9,
    padding: 8,
  },
  favoriteText: {
    color: '#B4517B',
    fontSize: 17,
  },
  detailButton: {
    flex: 1,
    backgroundColor: '#B95F85',
    paddingVertical: 10,
    borderRadius: 9,
    alignItems: 'center',
  },
  detailButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#927583',
    textAlign: 'center',
    marginTop: 25,
  },
  footer: {
    textAlign: 'center',
    color: '#A17F90',
    paddingVertical: 28,
  },
});

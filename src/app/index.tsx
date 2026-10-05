
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './BloomifyStyles';

// Tipe data produk bunga
interface Flower {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

// Daftar produk (Array of Objects)
const flowers: Flower[] = [
  {
    id: 1,
    name: 'Rose Bouquet',
    category: 'Mawar',
    price: 150000,
    description: 'Buket mawar romantis',
    image:
      'https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=600',
  },
  {
    id: 2,
    name: 'Sunflower Bouquet',
    category: 'Sunflower',
    price: 120000,
    description: 'Buket bunga ceria',
    image:
      'https://images.unsplash.com/photo-1597848212624-e6c2c2f0b3f5?w=600',
  },
  {
    id: 3,
    name: "Baby's Breath",
    category: 'Baby Breath',
    price: 100000,
    description: 'Buket minimalis dan elegan',
    image:
      'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=600',
  },
  {
    id: 4,
    name: 'Tulip Bouquet',
    category: 'Tulip',
    price: 135000,
    description: 'Buket tulip yang anggun',
    image:
      'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=600',
  },
  {
    id: 5,
    name: 'Lavender Bouquet',
    category: 'Lainnya',
    price: 110000,
    description: 'Buket bunga menenangkan',
    image:
      'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=600',
  },
  {
    id: 6,
    name: 'Mixed Bouquet',
    category: 'Lainnya',
    price: 145000,
    description: 'Kombinasi bunga pilihan',
    image:
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600',
  },
];

const categories = [
  'Semua',
  'Mawar',
  'Tulip',
  'Sunflower',
  'Baby Breath',
  'Lainnya',
];

// Custom function untuk membuat kartu produk
function ProductCard({ item }: { item: Flower }) {
  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        Alert.alert(
          item.name,
          `${item.description}\nHarga: Rp ${item.price.toLocaleString('id-ID')}`,
          [
            { text: 'Tutup', style: 'cancel' },
            {
              text: 'Pilih Bunga',
              onPress: () =>
                Alert.alert(
                  'Bloomify',
                  `${item.name} berhasil dipilih!`
                ),
            },
          ]
        )
      }
    >
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        resizeMode="cover"
      />

      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>

        <Text style={styles.productDescription}>
          {item.description}
        </Text>

        <Text style={styles.price}>
          Rp {item.price.toLocaleString('id-ID')}
        </Text>

        <View style={styles.detailButton}>
          <Text style={styles.detailButtonText}>
            Lihat Detail
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default function BloomifyHome() {
  const [selectedCategory, setSelectedCategory] =
    useState('Semua');

  const [search, setSearch] = useState('');

  // Filter produk berdasarkan kategori dan pencarian
  const filteredFlowers = flowers.filter((flower) => {
    const matchCategory =
      selectedCategory === 'Semua' ||
      flower.category === selectedCategory;

    const matchSearch = flower.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>✿ Bloomify</Text>
          <Text style={styles.subtitle}>
            Flowers & Bouquet
          </Text>
        </View>

        <Ionicons
          name="flower-outline"
          size={30}
          color="#D96F8C"
        />
      </View>

      {/* Hero section */}
      <View style={styles.hero}>
        <Text style={styles.greeting}>
          Halo, Bloomy! 🌷
        </Text>

        <Text style={styles.description}>
          Temukan bunga terbaik untuk setiap momen
          spesialmu di Bloomify. Buket cantik, kualitas
          terbaik, selalu untukmu.
        </Text>
      </View>

      {/* Kolom pencarian */}
      <View style={styles.searchBox}>
        <Ionicons
          name="search-outline"
          size={21}
          color="#D96F8C"
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Cari bunga atau buket..."
          placeholderTextColor="#B49AA3"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Kategori bunga */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Kategori Bunga
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
      >
        {categories.map((category) => (
          <Pressable
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category &&
                styles.categoryActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category &&
                  styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Produk bunga */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Pilihan Spesial untukmu 💐
        </Text>

        <View style={styles.productGrid}>
          {filteredFlowers.length > 0 ? (
            filteredFlowers.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))
          ) : (
            <Text style={styles.emptyText}>
              Bunga tidak ditemukan 🌷
            </Text>
          )}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text
          style={{
            color: '#D96F8C',
            fontSize: 14,
            fontWeight: 'bold',
          }}
        >
          Made with love by Bloomify ♡
        </Text>

        <Text style={styles.subtitle}>
          Every flower tells a story.
        </Text>
      </View>
    </ScrollView>
  );
}

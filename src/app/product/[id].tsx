
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { flowers, formatRupiah } from '../../data/flowers';
import { useShop } from '../../context/ShopContext';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [quantity, setQuantity] = useState(1);

  const { favorites, toggleFavorite, addToCart } = useShop();

  const [selectedFlowerId, setSelectedFlowerId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const parsedId = Number(id);
    const found = flowers.find((item) => item.id === parsedId);

    setSelectedFlowerId(found ? found.id : null);
    setQuantity(1);
  }, [id]);

  const flower = flowers.find(
    (item) => item.id === selectedFlowerId
  );

  if (!flower) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Produk tidak ditemukan</Text>
        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Kembali</Text>
        </Pressable>
      </View>
    );
  }

  const isFavorite = favorites.includes(flower.id);

  const handleAddToCart = () => {
    addToCart(flower.id, quantity);
    Alert.alert('Berhasil', 'Buket sudah ditambahkan ke keranjang.');
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: flower.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.category}>{flower.category}</Text>
        <Text style={styles.title}>{flower.name}</Text>
        <Text style={styles.price}>{formatRupiah(flower.price)}</Text>
        <Text style={styles.description}>{flower.description}</Text>

        <Text style={styles.label}>Jumlah buket</Text>

        <View style={styles.quantityRow}>
          <Pressable
            style={styles.quantityButton}
            onPress={() => setQuantity((old) => Math.max(1, old - 1))}
          >
            <Text style={styles.quantityText}>−</Text>
          </Pressable>

          <Text style={styles.quantityNumber}>{quantity}</Text>

          <Pressable
            style={styles.quantityButton}
            onPress={() => setQuantity((old) => old + 1)}
          >
            <Text style={styles.quantityText}>+</Text>
          </Pressable>
        </View>

        <Text style={styles.total}>
          Total: {formatRupiah(flower.price * quantity)}
        </Text>

        <Pressable style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Tambah ke Keranjang</Text>
        </Pressable>

        <Pressable
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(flower.id)}
        >
          <Text style={styles.favoriteText}>
            {isFavorite ? '♥ Hapus dari Favorit' : '♡ Tambah ke Favorit'}
          </Text>
        </Pressable>

        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>Kembali ke halaman sebelumnya</Text>
        </Pressable>

        <Pressable
          style={styles.cartButton}
          onPress={() => router.push('/cart')}
        >
          <Text style={styles.buttonText}>Lihat Keranjang</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9FC',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#F6EAF0',
  },
  content: {
    padding: 20,
  },
  category: {
    color: '#A45B7C',
    marginBottom: 7,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#82415E',
  },
  price: {
    fontSize: 20,
    color: '#B4517B',
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    color: '#806879',
    lineHeight: 23,
    marginTop: 14,
  },
  label: {
    color: '#82415E',
    fontWeight: 'bold',
    marginTop: 25,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 12,
  },
  quantityButton: {
    backgroundColor: '#F3DCE7',
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 24,
    color: '#914769',
  },
  quantityNumber: {
    fontSize: 20,
    color: '#82415E',
    fontWeight: 'bold',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#82415E',
    marginTop: 20,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#B95F85',
    borderRadius: 13,
    padding: 15,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  favoriteButton: {
    backgroundColor: '#F5E7EE',
    borderRadius: 13,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  favoriteText: {
    color: '#984B6E',
    fontWeight: 'bold',
  },
  backButton: {
    padding: 14,
    alignItems: 'center',
  },
  backText: {
    color: '#914769',
  },
  cartButton: {
    backgroundColor: '#8D4968',
    borderRadius: 13,
    padding: 15,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF9FC',
  },
});

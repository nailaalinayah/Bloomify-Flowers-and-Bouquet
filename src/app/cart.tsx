
import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { flowers, formatRupiah } from '../data/flowers';
import { useShop } from '../context/ShopContext';

export default function CartScreen() {
  const { cart, updateQuantity, removeFromCart } = useShop();

  const cartItems = cart
    .map((item) => ({
      ...item,
      flower: flowers.find((flower) => flower.id === item.flowerId),
    }))
    .filter((item) => item.flower !== undefined);

  const total = cartItems.reduce(
    (sum, item) => sum + item.flower!.price * item.quantity,
    0
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Keranjang Belanja 🛒</Text>

      {cartItems.length === 0 ? (
        <View>
          <Text style={styles.empty}>
            Keranjangmu masih kosong.
          </Text>

          <Pressable
            style={styles.button}
            onPress={() => router.replace('/')}
          >
            <Text style={styles.buttonText}>Cari Buket</Text>
          </Pressable>
        </View>
      ) : (
        <>
          {cartItems.map((item) => (
            <View style={styles.card} key={item.flowerId}>
              <Image
                source={{ uri: item.flower!.image }}
                style={styles.image}
              />

              <View style={styles.info}>
                <Text style={styles.name}>
                  {item.flower!.name}
                </Text>

                <Text style={styles.price}>
                  {formatRupiah(item.flower!.price)}
                </Text>

                <View style={styles.quantityRow}>
                  <Pressable
                    style={styles.quantityButton}
                    onPress={() =>
                      updateQuantity(
                        item.flowerId,
                        item.quantity - 1
                      )
                    }
                  >
                    <Text style={styles.quantityText}>−</Text>
                  </Pressable>

                  <Text style={styles.quantity}>
                    {item.quantity}
                  </Text>

                  <Pressable
                    style={styles.quantityButton}
                    onPress={() =>
                      updateQuantity(
                        item.flowerId,
                        item.quantity + 1
                      )
                    }
                  >
                    <Text style={styles.quantityText}>+</Text>
                  </Pressable>
                </View>

                <Pressable
                  style={styles.removeButton}
                  onPress={() =>
                    Alert.alert(
                      'Hapus item',
                      `Hapus ${item.flower!.name} dari keranjang?`,
                      [
                        { text: 'Batal', style: 'cancel' },
                        {
                          text: 'Hapus',
                          style: 'destructive',
                          onPress: () => removeFromCart(item.flowerId),
                        },
                      ]
                    )
                  }
                >
                  <Text style={styles.removeText}>Hapus item</Text>
                </Pressable>
              </View>
            </View>
          ))}

          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total belanja</Text>
            <Text style={styles.totalPrice}>
              {formatRupiah(total)}
            </Text>
          </View>

          <Pressable
            style={styles.button}
            onPress={() => router.push('/checkout')}
          >
            <Text style={styles.buttonText}>Lanjut Checkout</Text>
          </Pressable>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: '#FFF9FC',
  },
  heading: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#87435F',
    marginBottom: 18,
  },
  empty: {
    color: '#927583',
    marginVertical: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: '#F3E2EA',
  },
  image: {
    width: 105,
    height: 125,
    borderRadius: 12,
    backgroundColor: '#F6EAF0',
  },
  info: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    color: '#603B4E',
    fontSize: 14,
  },
  price: {
    color: '#B4517B',
    fontWeight: 'bold',
    marginVertical: 7,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  quantityButton: {
    backgroundColor: '#F3DCE7',
    borderRadius: 8,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: '#914769',
    fontSize: 20,
  },
  quantity: {
    color: '#82415E',
    fontWeight: 'bold',
  },
  removeButton: {
    alignSelf: 'flex-start',
    paddingTop: 8,
  },
  removeText: {
    color: '#B4517B',
    fontSize: 12,
  },
  totalBox: {
    backgroundColor: '#F8E5ED',
    borderRadius: 14,
    padding: 16,
    marginTop: 8,
    marginBottom: 15,
  },
  totalLabel: {
    color: '#82415E',
  },
  totalPrice: {
    color: '#A34E73',
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#B95F85',
    padding: 15,
    borderRadius: 13,
    alignItems: 'center',
    marginBottom: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

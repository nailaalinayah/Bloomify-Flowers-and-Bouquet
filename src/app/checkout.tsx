import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useShop } from "../context/ShopContext";
import { formatRupiah } from "../data/flowers";

export default function CheckoutScreen() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const { flowers, cart, clearCart } = useShop();

  const total = cart.reduce((sum, item) => {
    const flower = flowers.find((f) => f.id === item.flowerId);
    return sum + (flower ? flower.price * item.quantity : 0);
  }, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert("Keranjang kosong", "Tambahkan buket terlebih dahulu.");
      return;
    }

    if (!name.trim() || !address.trim()) {
      Alert.alert(
        "Data belum lengkap",
        "Isi nama penerima dan alamat pengiriman.",
      );
      return;
    }

    clearCart();
    router.replace("/success");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Checkout 🌷</Text>
      <Text style={styles.description}>
        Lengkapi data penerima untuk menyelesaikan pesanan.
      </Text>

      <Text style={styles.label}>Nama penerima</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan nama"
        placeholderTextColor="#A98A99"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Alamat pengiriman</Text>
      <TextInput
        style={[styles.input, styles.addressInput]}
        placeholder="Masukkan alamat lengkap"
        placeholderTextColor="#A98A99"
        value={address}
        onChangeText={setAddress}
        multiline
        textAlignVertical="top"
      />

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Ringkasan Pesanan</Text>

        {cart.map((item) => {
          const flower = flowers.find((f) => f.id === item.flowerId);

          if (!flower) return null;

          return (
            <View key={item.flowerId} style={styles.summaryRow}>
              <Text style={styles.summaryText}>
                {flower.name} x {item.quantity}
              </Text>
              <Text style={styles.summaryText}>
                {formatRupiah(flower.price * item.quantity)}
              </Text>
            </View>
          );
        })}

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>{formatRupiah(total)}</Text>
        </View>
      </View>

      <Pressable style={styles.button} onPress={handleCheckout}>
        <Text style={styles.buttonText}>Konfirmasi Pesanan</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF9FC",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#87435F",
  },
  description: {
    color: "#927583",
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 20,
  },
  label: {
    color: "#82415E",
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#F0D5E1",
    borderWidth: 1,
    borderRadius: 12,
    padding: 13,
    color: "#633D50",
  },
  addressInput: {
    minHeight: 100,
  },
  summary: {
    backgroundColor: "#F8E5ED",
    borderRadius: 15,
    padding: 15,
    marginTop: 25,
  },
  summaryTitle: {
    color: "#82415E",
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginVertical: 6,
  },
  summaryText: {
    color: "#806879",
    flexShrink: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "#E8C8D7",
    marginVertical: 10,
  },
  totalLabel: {
    color: "#82415E",
    fontWeight: "bold",
  },
  totalPrice: {
    color: "#A34E73",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#B95F85",
    borderRadius: 13,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

import { router } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useShop } from "../context/ShopContext";
import { formatRupiah } from "../data/flowers";

export default function FavoritesScreen() {
  const { flowers, favorites, toggleFavorite } = useShop();

  const favoriteFlowers = flowers.filter((flower) =>
    favorites.includes(flower.id),
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Buket Favoritmu ♡</Text>

      {favoriteFlowers.length === 0 ? (
        <Text style={styles.empty}>
          Belum ada buket favorit. Pilih bunga dari halaman utama, ya!
        </Text>
      ) : (
        favoriteFlowers.map((flower) => (
          <View style={styles.card} key={flower.id}>
            <Image source={{ uri: flower.image }} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.name}>{flower.name}</Text>
              <Text style={styles.price}>{formatRupiah(flower.price)}</Text>

              <Pressable
                style={styles.button}
                onPress={() => router.push(`/product/${flower.id}`)}
              >
                <Text style={styles.buttonText}>Lihat Detail</Text>
              </Pressable>

              <Pressable
                style={styles.remove}
                onPress={() => toggleFavorite(flower.id)}
              >
                <Text style={styles.removeText}>Hapus Favorit</Text>
              </Pressable>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#FFF9FC",
  },
  heading: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#87435F",
    marginBottom: 18,
  },
  empty: {
    color: "#927583",
    lineHeight: 23,
    marginTop: 15,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginBottom: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: "#F3E2EA",
  },
  image: {
    width: 110,
    height: 130,
    borderRadius: 12,
    backgroundColor: "#F6EAF0",
  },
  info: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: "center",
  },
  name: {
    color: "#603B4E",
    fontWeight: "bold",
    fontSize: 15,
  },
  price: {
    color: "#B4517B",
    fontWeight: "bold",
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#B95F85",
    borderRadius: 9,
    padding: 9,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  remove: {
    padding: 7,
    alignItems: "center",
  },
  removeText: {
    color: "#984B6E",
    fontSize: 12,
  },
});

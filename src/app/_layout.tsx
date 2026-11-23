
import { Stack } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ShopProvider } from '../context/ShopContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ShopProvider>
        <RootNavigator />
      </ShopProvider>
    </AuthProvider>
  );
}

function RootNavigator() {
  const { loading, session } = useAuth();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#B95F85" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#FFF0F5' },
        headerTintColor: '#8B4565',
        headerTitleStyle: { fontWeight: 'bold' },
        contentStyle: { backgroundColor: '#FFF9FC' },
      }}
    >
      <Stack.Protected guard={Boolean(session)}>
        <Stack.Screen name="index" options={{ title: 'Bloomify', headerShown: false }} />
        <Stack.Screen name="explore" options={{ title: 'Explore' }} />
        <Stack.Screen name="product/[id]" options={{ title: 'Detail Produk' }} />
        <Stack.Screen name="favorites" options={{ title: 'Bunga Favorit' }} />
        <Stack.Screen name="cart" options={{ title: 'Keranjang' }} />
        <Stack.Screen name="checkout" options={{ title: 'Checkout' }} />
        <Stack.Screen name="BloomifyStyles" options={{ headerShown: false }} />
        <Stack.Screen
          name="success"
          options={{ title: 'Pesanan Berhasil', headerBackVisible: false }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="auth" options={{ title: 'Masuk', headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF9FC',
  },
});

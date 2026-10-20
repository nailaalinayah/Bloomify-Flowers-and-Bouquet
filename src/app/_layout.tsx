
import { Stack } from 'expo-router';
import { ShopProvider } from '../context/ShopContext';

export default function RootLayout() {
  return (
    <ShopProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#FFF0F5' },
          headerTintColor: '#8B4565',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#FFF9FC' },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Bloomify',
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="product/[id]"
          options={{ title: 'Detail Produk' }}
        />

        <Stack.Screen
          name="favorites"
          options={{ title: 'Bunga Favorit' }}
        />

        <Stack.Screen
          name="cart"
          options={{ title: 'Keranjang' }}
        />

        <Stack.Screen
          name="checkout"
          options={{ title: 'Checkout' }}
        />

        <Stack.Screen
          name="success"
          options={{
            title: 'Pesanan Berhasil',
            headerBackVisible: false,
          }}
        />
      </Stack>
    </ShopProvider>
  );
}

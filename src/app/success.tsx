
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function SuccessScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🌷</Text>
      <Text style={styles.title}>Pesanan Berhasil!</Text>
      <Text style={styles.description}>
        Terima kasih sudah memilih Bloomify.
        Pesananmu berhasil dibuat dalam simulasi ini.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.replace('/')}
      >
        <Text style={styles.buttonText}>Kembali ke Beranda</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9FC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },
  emoji: {
    fontSize: 65,
    marginBottom: 18,
  },
  title: {
    color: '#87435F',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    color: '#927583',
    textAlign: 'center',
    lineHeight: 23,
    marginTop: 12,
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#B95F85',
    borderRadius: 13,
    paddingVertical: 15,
    paddingHorizontal: 22,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

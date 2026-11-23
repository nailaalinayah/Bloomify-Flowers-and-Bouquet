import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const secureStorage = {
  async getItem(key: string) {
    const manifest = await SecureStore.getItemAsync(`${key}.manifest`);

    if (!manifest) return null;

    const chunkCount = Number(manifest);
    if (!Number.isInteger(chunkCount) || chunkCount < 1) {
      throw new Error("Stored authentication session is invalid.");
    }

    const chunks: string[] = [];
    for (let index = 0; index < chunkCount; index += 1) {
      const chunk = await SecureStore.getItemAsync(`${key}.${index}`);
      if (chunk === null) {
        throw new Error("Stored authentication session is incomplete.");
      }
      chunks.push(chunk);
    }

    return chunks.join("");
  },
  async setItem(key: string, value: string) {
    const chunkSize = 400;
    const chunks: string[] = [];
    const previousManifest = await SecureStore.getItemAsync(`${key}.manifest`);
    const previousChunkCount = Number(previousManifest);

    let start = 0;
    while (start < value.length) {
      let end = Math.min(start + chunkSize, value.length);
      const lastCodeUnit = value.charCodeAt(end - 1);
      if (lastCodeUnit >= 0xd800 && lastCodeUnit <= 0xdbff) end -= 1;
      chunks.push(value.slice(start, end));
      start = end;
    }
    if (chunks.length === 0) chunks.push("");

    await SecureStore.deleteItemAsync(`${key}.manifest`);
    for (let index = 0; index < chunks.length; index += 1) {
      await SecureStore.setItemAsync(`${key}.${index}`, chunks[index]);
    }
    await SecureStore.setItemAsync(`${key}.manifest`, String(chunks.length));

    if (Number.isInteger(previousChunkCount) && previousChunkCount > chunks.length) {
      for (let index = chunks.length; index < previousChunkCount; index += 1) {
        await SecureStore.deleteItemAsync(`${key}.${index}`);
      }
    }
  },
  async removeItem(key: string) {
    const manifest = await SecureStore.getItemAsync(`${key}.manifest`);
    const chunkCount = Number(manifest);

    await SecureStore.deleteItemAsync(`${key}.manifest`);
    if (Number.isInteger(chunkCount) && chunkCount > 0) {
      for (let index = 0; index < chunkCount; index += 1) {
        await SecureStore.deleteItemAsync(`${key}.${index}`);
      }
    }
  },
};

const webStorage = {
  async getItem(key: string) {
    if (typeof window === "undefined") return null;
    return AsyncStorage.getItem(key);
  },
  async setItem(key: string, value: string) {
    if (typeof window === "undefined") return;
    await AsyncStorage.setItem(key, value);
  },
  async removeItem(key: string) {
    if (typeof window === "undefined") return;
    await AsyncStorage.removeItem(key);
  },
};

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: {
          autoRefreshToken: true,
          detectSessionInUrl: false,
          persistSession: true,
          storage: Platform.OS === "web" ? webStorage : secureStorage,
        },
      })
    : null;

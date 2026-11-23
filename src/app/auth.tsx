import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";

export default function AuthScreen() {
  const { configured, signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const handleSubmit = async () => {
    setError("");
    setNotice("");
    setSubmitting(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      if (isSignUp) {
        const hasSession = await signUp(normalizedEmail, password);
        if (!hasSession) {
          setNotice(
            "Akun dibuat. Konfirmasi melalui email, lalu kembali dan masuk.",
          );
        }
      } else {
        await signIn(normalizedEmail, password);
      }
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Autentikasi gagal. Silakan coba lagi.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.logo}>Bloomify 🌷</Text>
        <Text style={styles.heading}>
          {isSignUp ? "Buat akun baru" : "Selamat datang kembali"}
        </Text>
        <Text style={styles.description}>
          {isSignUp
            ? "Daftar untuk mulai menikmati Bloomify."
            : "Masuk untuk melanjutkan ke Bloomify."}
        </Text>

        {!configured && (
          <Text style={styles.error}>
            Supabase belum dikonfigurasi. Isi EXPO_PUBLIC_SUPABASE_URL dan
            EXPO_PUBLIC_SUPABASE_ANON_KEY di .env.local, lalu mulai ulang Expo.
          </Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A98A99"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          editable={!submitting}
        />
        <TextInput
          style={styles.input}
          placeholder="Kata sandi"
          placeholderTextColor="#A98A99"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoComplete={isSignUp ? "new-password" : "current-password"}
          textContentType={isSignUp ? "newPassword" : "password"}
          editable={!submitting}
        />

        {error !== "" && <Text style={styles.error}>{error}</Text>}
        {notice !== "" && <Text style={styles.notice}>{notice}</Text>}

        <Pressable
          style={[
            styles.submitButton,
            (!configured || submitting) && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={!configured || submitting || !email.trim() || !password}
        >
          {submitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.submitText}>
              {isSignUp ? "Daftar" : "Masuk"}
            </Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => {
            setIsSignUp((current) => !current);
            setError("");
            setNotice("");
          }}
          disabled={submitting}
        >
          <Text style={styles.switchText}>
            {isSignUp
              ? "Sudah punya akun? Masuk"
              : "Belum punya akun? Daftar"}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    padding: 22,
    backgroundColor: "#FFF9FC",
  },
  card: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 24,
    borderWidth: 1,
    borderColor: "#F3E2EA",
  },
  logo: {
    color: "#A34E73",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  heading: {
    color: "#603B4E",
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 22,
  },
  description: {
    color: "#927583",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 22,
  },
  input: {
    backgroundColor: "#FFF9FC",
    borderWidth: 1,
    borderColor: "#F0D5E1",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    color: "#633D50",
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: "#B95F85",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginTop: 4,
  },
  disabledButton: {
    opacity: 0.55,
  },
  submitText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  switchText: {
    color: "#984B6E",
    textAlign: "center",
    padding: 12,
    marginTop: 6,
  },
  error: {
    color: "#A52D4E",
    marginBottom: 12,
    lineHeight: 20,
  },
  notice: {
    color: "#49734C",
    marginBottom: 12,
    lineHeight: 20,
  },
});

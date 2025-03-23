import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, StatusBar, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import Config from '../../../config';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  const onSignIn = async () => {
    if (!email || !password) {
      ToastAndroid.show('Please Enter Email & Password', ToastAndroid.LONG);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${Config.BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        ToastAndroid.show(errorData.message || "Sign in failed", ToastAndroid.LONG);
        throw new Error(errorData.message || 'Authentication failed');
      }
      const data = await response.json();
      const token = data.token;
      AsyncStorage.setItem('token', token);
      router.replace('/home');
    } catch (error) {
      console.error('Login error:', error);
      ToastAndroid.show(error.message || "Sign in failed", ToastAndroid.LONG);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Let's Sign You In</Text>
          <Text style={styles.subtitleText}>Welcome Back</Text>
          <Text style={styles.subtitleText}>You've been missed!</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              onChangeText={(value) => setEmail(value)}
              placeholder="Enter Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              onChangeText={(value) => setPassword(value)}
              onSubmitEditing={onSignIn}
              returnKeyType="go"
              placeholder="Enter Password"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={onSignIn} 
          style={styles.signInButton}
          disabled={isLoading}
        >
          {isLoading ? (
            <Text style={styles.buttonText}>Signing in...</Text>
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          onPress={() => router.replace('auth/sign-up')}
          style={styles.createAccountButton}
        >
          <Text style={styles.createAccountButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#78C7C7',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 25,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  titleContainer: {
    marginBottom: 40,
  },
  titleText: {
    fontFamily: 'outfit-bold',
    fontSize: 32,
    color: 'white',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitleText: {
    fontFamily: 'outfit',
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#333',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 5,
    marginBottom: 30,
  },
  forgotPasswordText: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: 'white',
  },
  signInButton: {
    backgroundColor: 'white',
    borderRadius: 15,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: '#4ABDAC',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  dividerText: {
    fontFamily: 'outfit',
    color: 'white',
    paddingHorizontal: 10,
  },
  createAccountButton: {
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
    borderRadius: 15,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountButtonText: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: 'white',
  },
})
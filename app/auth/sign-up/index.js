import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ToastAndroid, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import Config from '../../../config';

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, []);

  const OnCreateAccount = async() => {
    if(!email || !password || !fullName || !phoneNumber) {
      Alert.alert('Missing Information', 'Please Enter All Details');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${Config.BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          username: fullName,
          phoneNumber: phoneNumber
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      router.replace('auth/sign-in');
    } catch (error) {
      console.error('Register error:', error);
      ToastAndroid.show(error.message || "Sign up failed", ToastAndroid.LONG);
    } finally {
      setIsLoading(false);
    }
  }

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
          <Text style={styles.titleText}>Create New Account</Text>
          <Text style={styles.subtitleText}>Join our community</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter Full Name"
              placeholderTextColor="#999"
              onChangeText={(value) => setFullName(value)}
            />
          </View>
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
          <Text style={styles.inputLabel}>Phone Number</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="call-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              onChangeText={(value) => setPhoneNumber(value)}
              placeholder="Enter Phone Number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
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
              placeholder="Enter Password"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <TouchableOpacity 
          onPress={OnCreateAccount} 
          style={styles.createAccountButton}
          disabled={isLoading}
        >
          {isLoading ? (
            <Text style={styles.buttonText}>Creating account...</Text>
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        <View style={styles.signInLinkContainer}>
          <Text style={styles.signInText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.replace('auth/sign-in')}>
            <Text style={styles.signInLinkText}>Sign In</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 30,
  },
  titleText: {
    fontFamily: 'outfit-bold',
    fontSize: 32,
    color: 'white',
    marginBottom: 10,
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
    marginBottom: 16,
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
  createAccountButton: {
    backgroundColor: '#78866B',
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
    marginTop: 24,
  },
  buttonText: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: 'white',
  },
  signInLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    alignItems: 'center',
  },
  signInText: {
    fontFamily: 'outfit',
    color: 'white',
    fontSize: 16,
  },
  signInLinkText: {
    fontFamily: 'outfit-bold',
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
    textDecorationLine: 'underline',
  }
})
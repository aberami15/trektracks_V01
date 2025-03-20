import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import Config from '../../../config';



export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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
    }
  };


  return (
    <View style={{
      padding: 25,
      paddingTop: 40,
      backgroundColor: 'white',
      height: '100%'
    }}>

      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
      </TouchableOpacity>

      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 30,
        marginTop: 30

      }}>Let's Sign You In</Text>

      <Text style={{
        fontFamily: 'outfit',
        fontSize: 30,
        color: 'gray',
        marginTop: 20
      }}>Welcome Back</Text>

      <Text style={{
        fontFamily: 'outfit',
        fontSize: 30,
        color: 'gray',
        marginTop: 10
      }}>You've been missed!</Text>


      <View style={{
        marginTop: 50
      }}>

        <Text style={{ fontFamily: 'outfit' }}>Email</Text>

        <TextInput
          style={styles.input}
          onChangeText={(value) => setEmail(value)}
          placeholder='Enter Email' />

      </View>

      <View style={{
        marginTop: 20
      }}>
        <Text style={{
          fontFamily: 'outfit'
        }}> Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(value) => setPassword(value)}
          onSubmitEditing={onSignIn}
          returnKeyType="go"
          placeholder='Enter Password' />

      </View>


      <TouchableOpacity onPress={onSignIn} style={{
        padding: 20,
        backgroundColor: 'black',
        borderRadius: 15,
        marginTop: 50
      }}>
        <Text style={{
          color: 'white',
          textAlign: 'center'
        }}>Sign In</Text>
      </TouchableOpacity>



      <TouchableOpacity
        onPress={() => router.replace('auth/sign-up')}
        style={{
          padding: 20,
          backgroundColor: 'white',
          borderRadius: 15,
          marginTop: 20,
          borderWidth: 1
        }}>
        <Text style={{
          color: 'black',
          textAlign: 'center'
        }}>Create Account</Text>
      </TouchableOpacity>

    </View>


  )
}

const styles = StyleSheet.create({

  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'gray',
    fontFamily: 'outfit'
  }
})
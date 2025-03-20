import { View, Text, StyleSheet, TouchableOpacity, Alert, ToastAndroid} from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import Config from '../../../config';

export default function SignUp() {
  const navigation= useNavigation();
  const router=useRouter();
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [fullName, setFullName]=useState('');
  const [phoneNumber, setPhoneNumber]=useState('');

  useEffect(()=>{
    navigation.setOptions({
      headerShown:false
    })
  },[]);

  const OnCreateAccount = async() => {
    if(!email || !password || !fullName || !phoneNumber) {
      Alert.alert('Missing Information', 'Please Enter All Details');
      return;
    }
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
          const errorData =await response.json();
          throw new Error(errorData.message || 'Registration failed');
        }
        router.replace('/home');
      } catch (error) {
        console.error('Register error:', error);
        ToastAndroid.show(error.message || "Sign up failed", ToastAndroid.LONG);
      }
  }

  return (
    <View
    style={{
      padding:25,
      paddingTop:40,
      backgroundColor:'white',
      height:'100%'
    }}>

      <TouchableOpacity onPress={()=>router.back()}>
        <Ionicons name="arrow-back-circle-outline" size={30} color="black" />
      </TouchableOpacity>

      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30,
        marginTop:30
      }}>Create New Account</Text>

      {/* enter full name */}
      <View style={{
        marginTop:50
      }}>
        <Text style={{
          fontFamily:'outfit'
        }}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter Full Name'
          onChangeText={(value)=>setFullName(value)}
        />
      </View>

      {/* email field */}
      <View style={{
        marginTop:20
      }}>
        <Text style={{
          fontFamily:'outfit'
        }}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value)=>setEmail(value)}
          placeholder='Enter Email'
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      {/* phone number field - new addition */}
      <View style={{
        marginTop:20
      }}>
        <Text style={{
          fontFamily:'outfit'
        }}>Phone Number</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value)=>setPhoneNumber(value)}
          placeholder='Enter Phone Number'
          keyboardType="phone-pad"
        />
      </View>
    
      {/* password field */}
      <View style={{
        marginTop:20
      }}>
        <Text style={{
          fontFamily:'outfit'
        }}>Password</Text>
        <TextInput 
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(value)=>setPassword(value)}
          placeholder='Enter Password'
        />
      </View>

      {/* Create Account Button */}
      <TouchableOpacity
        onPress={OnCreateAccount}
        style={{
          padding:20,
          backgroundColor:'black',
          borderRadius:15,
          marginTop:40
        }}>
        <Text style={{
          color:'white',
          textAlign:'center',
          fontFamily:'outfit-medium'
        }}>Create Account</Text>
      </TouchableOpacity>
      
      {/* Sign in Button */}
      <TouchableOpacity
        onPress={()=>router.replace('auth/sign-in')}
        style={{
          padding:20,
          backgroundColor:'white',
          borderRadius:15,
          marginTop:20,
          borderWidth:1
        }}>
        <Text style={{
          color:'black',
          textAlign:'center',
          fontFamily:'outfit'
        }}>Sign in</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input:{
    padding:15,
    borderWidth:1,
    borderRadius:15,
    borderColor:'gray',
    fontFamily:'outfit'
  }
})
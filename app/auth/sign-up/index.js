import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from './../../../configs/FirebaseConfig';
import { useState } from 'react';


export default function SignUp() {
  const navigation= useNavigation();
  const router=useRouter();

  
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [fullName,setFullName]=useState();



   useEffect(()=>{
      navigation.setOptions({
        headerShown:false
      })
    },[]);

    const OnCreateAccount=()=>{

      if(!email&&!email&&!password){

        ToastAndroid.show('Please Enter All Details',ToastAndroid.BOTTOM);
          return ;
        
      }

      console.log(email,password)
      createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("--",error,errorCode);
    // ..
  });
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

        <View style={{
              marginTop:20
            }}>
              <Text style={{
                fontFamily:'outfit'
              }}>Email</Text>
              <TextInput
              style={styles.input}
              onChangeText={(value)=>setEmail(value)}
               placeholder='Enter Email'/>
              
        </View>
      
        <View style={{
              marginTop:20
            }}>
              <Text style={{
                fontFamily:'outfit'
              }}> Password</Text>
              <TextInput 
              secureTextEntry={true}
              style={styles.input}
              onChangeText={(value)=>setPassword(value)}
              placeholder='Enter Password'/>
              
        </View>

        {/* {Create Account Button} */}
              <TouchableOpacity
                  onPress={OnCreateAccount}
              style={{
                padding:20,
                backgroundColor:'black',
                borderRadius:15,
                marginTop:50
              }}>
                <Text style={{
                  color:'white',
                  textAlign:'center'
                }}>Create Account</Text>
              </TouchableOpacity>
        
              
                {/* {Sign in Button} */}
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
                  textAlign:'center'
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
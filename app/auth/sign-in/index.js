import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { TextInput } from 'react-native';

export default function SignIn() {
  const navigation= useNavigation();
  const router=useRouter();

  useEffect(()=>{
    navigation.setOptions({
      headerShown:false
    })
  },[])

  return (
    <View style={{
      padding:25,
      marginTop:25,
      backgroundColor:'white',
      height:'100%'
    }}>
     <Text style={{
      fontFamily:'outfit-bold',
      fontSize:30
     }}>Let's Sign You In</Text> 

    <Text style={{
      fontFamily:'outfit',
      fontSize:30,
      color:'gray',
      marginTop:20
     }}>Welcome Back</Text> 

    <Text style={{
      fontFamily:'outfit',
      fontSize:30,
      color:'gray',
      marginTop:10
     }}>You've been missed!</Text>

      <View style={{
        marginTop:50
      }}>
        <Text style={{
          fontFamily:'outfit'
        }}>Email</Text>
        <TextInput
        style={styles.input}
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
        placeholder='Enter Password'/>
        
      </View>

        {/* {Sign in Button} */}
      <TouchableOpacity
          onPress={()=>router.replace('')}
      style={{
        padding:20,
        backgroundColor:'black',
        borderRadius:15,
        marginTop:50
      }}>
        <Text style={{
          color:'white',
          textAlign:'center'
        }}>Sign In</Text>
      </TouchableOpacity>

      
        {/* {Create Account Button} */}
        <TouchableOpacity
          onPress={()=>router.replace('auth/sign-up')}
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
        }}>Create Account</Text>
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

import { View, Text,Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'


export default function Login() {

    const router = useRouter();

  return (
    <View>
      <Image source={require('./../assets/images/splashScreen.jpg')}
      style={{
        width:'415',
        height:650
        
      }}/>

      <View style={styles.container}>
        <Text style={{
          fontSize:30,
          fontFamily:'outfit-bold',
          textAlign:'center',
          marginTop:10,
          color:'white',

        }}>TrekTracks</Text>

        <Text style={{
          fontFamily:'outfit',
          fontSize:17,
          textAlign:'center',
          marginTop:20,
          color:'white'
        }}>A comprehensive travel planning solution for SriLanka. With us you can know Sri Lanka bettter.
</Text>
      
<TouchableOpacity style={styles.button}
            onPress={()=>router.push('/Review')}
        >
          <Text style={{
            textAlign:'center',
            fontFamily:'outfit',
            fontSize:17,
            color:'white'
          }}>Reviews</Text>
        </TouchableOpacity>

<TouchableOpacity style={styles.button}
            onPress={()=>router.push('auth/sign-in')}
        >
          <Text style={{
            textAlign:'center',
            fontFamily:'outfit',
            fontSize:17,
            color:'white'
          }}>Get Started</Text>
        </TouchableOpacity>
        

      </View>


    </View>
  )
}




const styles = StyleSheet.create({
  container:{
    backgroundColor:'teal',
    marginTop:-20,
    borderTopRightRadius:30,
    borderTopLeftRadius:30,
    height:'60%',
    padding:25
    
  },
  button:{
    padding:15,
    backgroundColor:'black',
    borderRadius:99,
marginTop:5,
    
  }
})

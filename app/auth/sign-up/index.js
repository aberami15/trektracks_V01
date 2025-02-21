import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { TextInput } from 'react-native';

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <ScrollView 
      contentContainerStyle={{ 
        flexGrow: 1,
        backgroundColor: '#F0FFF0'
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Text style={styles.header}>Create New Account</Text>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.input} placeholder='Enter Full Name' />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder='Enter Email' />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput 
            secureTextEntry={true}
            style={styles.input}
            placeholder='Enter Password'
          />
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.replace('auth/sign-in')}
          >
            <Text style={styles.buttonTextPrimary}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.replace('')}
          >
            <Text style={styles.buttonTextSecondary}>Sign in</Text>
          </TouchableOpacity>

          {/* Visible Profile Button */}
          <TouchableOpacity
  onPress={() => router.push('/profile')} // Updated path
  style={styles.profileButton}
>
  <Text style={styles.buttonTextPrimary}>View Profile</Text>
</TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 50,
    minHeight: '100%',
    paddingBottom: 40 // Added bottom padding
  },
  header: {
    fontFamily: 'outfit-bold',
    fontSize: 30,
    marginBottom: 40
  },
  inputContainer: {
    marginBottom: 25
  },
  label: {
    fontFamily: 'outfit',
    marginBottom: 8,
    fontSize: 16
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'gray',
    fontFamily: 'outfit'
  },
  buttonGroup: {
    marginTop: 30
  },
  primaryButton: {
    backgroundColor: 'black',
    padding: 18,
    borderRadius: 15,
    marginBottom: 15
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 18,
    borderRadius: 15,
    marginBottom: 15
  },
  profileButton: {
    backgroundColor: '#031f2a',
    padding: 18,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 2, // Added border
    borderColor: '#fff' // White border for contrast
  },
  buttonTextPrimary: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'outfit',
    fontSize: 16
  },
  buttonTextSecondary: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'outfit',
    fontSize: 16
  }
});
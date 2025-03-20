import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import AIPlanDisplay from '../../components/AIPlanDisplay';
import Footer from '../footer';

export default function AIPlanPage() {
  const navigation = useNavigation();
  
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <View style={styles.container}>
      <AIPlanDisplay />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  }
});
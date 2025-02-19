import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons'; // Importing search icon
import Categories from './categ/categories.js'

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="space-y-6">
        
        {/* Header Section with Title and Profile Image */}
        <View 
          style={{
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            paddingHorizontal: wp(5), 
            marginBottom: 10
          }}
        >
          <Text 
            style={{ 
              fontSize: wp(7), 
              fontWeight: 'bold', 
              color: '#333', 
              fontFamily: 'Avenir', 
              letterSpacing: 1, 
              textTransform: 'capitalize' ,
              marginTop: hp(1.7) // Moves text 5mm down
            }}
          >
            Trektracks!
          </Text>
          <TouchableOpacity>
            <Image 
              source={require('../assets/images/profile.png')} 
              style={{ 
                height: wp(10), 
                width: wp(10), 
                borderRadius: wp(5), 
                resizeMode: 'contain', 
                marginTop: hp(1.5) 
              }} 
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View 
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#E5E7EB', // Muted gray color
            borderRadius: 20,
            paddingHorizontal: wp(8),
            marginHorizontal: wp(5),
            marginTop: hp(1.2) 
          }}
        >
          <Ionicons name="search" size={20} color="#777" style={{ marginRight: 10 }} />
          <TextInput 
            placeholder="Search destinations, activities..."
            placeholderTextColor="#777"
            style={{
              flex: 1,
              fontSize: wp(4),
              paddingVertical: hp(1.5),
              color: '#333'
            }}
          />
        </View>

        {/* Catergories */}
        <View className='mb-4'>
            <Categories/>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

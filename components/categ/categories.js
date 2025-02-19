import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Categories() {
  return (
    <View style={{ marginBottom: hp(2) }}>
      
      {/* Header Row for Categories Title and "See all" Button */}
      <View 
        style={{
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          paddingHorizontal: wp(5),
          marginTop: hp(3) // Increased value to move it lower
        }}
      >
        <Text style={{ fontSize: wp(4), fontWeight: '600', color: '#555' }}>
          Categories
        </Text>
        <TouchableOpacity>
          <Text style={{ fontSize: wp(4), color: '#007AFF' }}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Scrollable Category List */}
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
      >
        {/* Category items will go here */}
      </ScrollView>

    </View>
  );
}

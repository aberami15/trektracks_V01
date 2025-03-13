import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default function GenerateTrip() {
  return (
    <View style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: '100%'
    }}>
      <Text style = {{
        fontFamily: 'outfit-bold',
        fontSize: 40,
        textAlign: 'center'
      }}>Please Wait....</Text>
    </View>
  )
}
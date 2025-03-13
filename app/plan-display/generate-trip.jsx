import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default function GenerateTrip() {
  return (
    <View style={{
        padding: 25,
        paddingTop: '70%',
        backgroundColor: Colors.WHITE,
        height: '100%'
    }}>
      <Text style = {{
        fontFamily: 'outfit-bold',
        fontSize: 40,
        textAlign: 'center'
      }}>Hold on!</Text>

<Text style = {{
        fontFamily: 'outfit-medium',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 5
      }}>We're crafting the perfect plan for you.</Text>

    </View>
  )
}
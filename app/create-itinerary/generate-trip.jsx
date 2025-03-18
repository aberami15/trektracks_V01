import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default function GenerateTrip() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + "." : "."));
    }, 500); // Changes every 500ms

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height:'100%'
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 35,
        textAlign: 'center',
        marginTop: '30%'
      }}>
        Hold On!
      </Text>

      <Text style={{
        fontFamily: 'outfit-medium',
        fontSize: 20,
        textAlign: 'center'
      }}>
        We’re curating the best travel experience for you{dots}
      </Text>
    </View>
  )
}

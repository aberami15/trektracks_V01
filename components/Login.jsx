import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { Video } from 'expo-av'

export default function Login() {
  const router = useRouter();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  // Add useEffect to ensure video plays when component mounts
  useEffect(() => {
    // Function to play the video
    const playVideo = async () => {
      if (video.current) {
        try {
          // Set volume to 0 first to ensure it's muted
          await video.current.setVolumeAsync(0);
          await video.current.playAsync();
        } catch (error) {
          console.log("Autoplay error:", error);
          // For web, we'll need user interaction, so we can handle this gracefully
        }
      }
    };

    // Call the function
    playVideo();

    // Cleanup function
    return () => {
      if (video.current) {
        video.current.pauseAsync();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        source={require('./../assets/videos/SplashScreenVideo.mp4')}
        style={styles.backgroundVideo}
        resizeMode="cover"
        isLooping
        shouldPlay={true}
        isMuted={true} 
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />

      <View style={styles.overlay}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>TrekTracks</Text>

          <Text style={styles.description}>
            A comprehensive travel planning solution for SriLanka. With us you can know Sri Lanka better.
          </Text>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.push('auth/sign-in')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // Semi-transparent overlay for better text visibility
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  contentContainer: {
    
    padding: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 10,
  },
  description: {
    fontFamily: 'outfit',
    fontSize: 17,
    textAlign: 'center',
    color: 'white',
    marginBottom: 25,
  },
  button: {
    padding: 15,
    backgroundColor: 'black',
    borderRadius: 99,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'outfit',
    fontSize: 17,
    color: 'white',
  }
});
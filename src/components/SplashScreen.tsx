import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ResizeMode, Video } from 'expo-av'
import { SplashScreen } from 'expo-router'

const InitialSplashScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync()
    }, 4000)
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Video
        source={require('../../assets/splash.mp4')}
        style={{ flex: 1 }}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
      />
    </View>
  )
}

export default InitialSplashScreen

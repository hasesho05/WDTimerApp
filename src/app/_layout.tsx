import { StyleSheet, View } from 'react-native'
import { useCallback } from 'react'
import { Stack, SplashScreen } from 'expo-router'
import { useFonts } from 'expo-font'
import PoppinsBlack from '../../assets/fonts/Poppins-Black.ttf'
import PoppinsBold from '../../assets/fonts/Poppins-Bold.ttf'
import PoppinsExtraBold from '../../assets/fonts/Poppins-ExtraBold.ttf'
import PoppinsExtraLight from '../../assets/fonts/Poppins-ExtraLight.ttf'
import PoppinsLight from '../../assets/fonts/Poppins-Light.ttf'
import PoppinsMedium from '../../assets/fonts/Poppins-Medium.ttf'
import PoppinsRegular from '../../assets/fonts/Poppins-Regular.ttf'
import PoppinsSemiBold from '../../assets/fonts/Poppins-SemiBold.ttf'
import PoppinsThin from '../../assets/fonts/Poppins-Thin.ttf'
import InitialSplashScreen from '../components/SplashScreen'
import Toast from 'react-native-toast-message'

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': PoppinsBlack,
    'Poppins-Bold': PoppinsBold,
    'Poppins-ExtraBold': PoppinsExtraBold,
    'Poppins-ExtraLight': PoppinsExtraLight,
    'Poppins-Light': PoppinsLight,
    'Poppins-Medium': PoppinsMedium,
    'Poppins-Regular': PoppinsRegular,
    'Poppins-SemiBold': PoppinsSemiBold,
    'Poppins-Thin': PoppinsThin,
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (error) {
    console.error('Failed to load fonts:', error)
    return null
  }

  if (!fontsLoaded) {
    return <InitialSplashScreen />
  }

  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'WD計測タイマー',
            headerStyle: { backgroundColor: '#f4511e' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="(list-details)"
          options={{
            title: 'リストの詳細',
            headerStyle: { backgroundColor: '#f4511e' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="(settings)"
          options={{
            title: '設定',
            headerStyle: { backgroundColor: '#f4511e' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
      </Stack>
    </>
  )
}

export default RootLayout

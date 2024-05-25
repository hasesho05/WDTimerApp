import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
  Button,
  FlatList,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import AsyncStorage from '@react-native-async-storage/async-storage'
import useTimer from '../hooks/useTimer'
import { useNavigation } from '@react-navigation/native'
import { router } from 'expo-router'
import TimerScreen from '../components/TimerScreen'

const { width } = Dimensions.get('window')

const Settings: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('')
  const [tasks, setTasks] = useState<any[]>([])
  const navigation = useNavigation()

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString())
    }

    updateCurrentTime()
    const interval = setInterval(updateCurrentTime, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('@tasks')
        if (storedTasks !== null) {
          setTasks(JSON.parse(storedTasks))
        } else {
          const defaultTasks = [
            { title: 'モデルウィングの審査', duration: 1 },
            { title: 'カッティングの準備', duration: 7 },
            { title: 'カッティング試験', duration: 20 },
            { title: 'モデルウィッグの顔面拭き取り', duration: 1 },
            { title: '仕上がり審査', duration: 1 },
          ]
          setTasks(defaultTasks)
          await AsyncStorage.setItem('@tasks', JSON.stringify(defaultTasks))
        }
      } catch (error) {
        console.error('Failed to load settings', error)
      }
    }

    loadSettings()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <TimerScreen />
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDuration}>{item.duration} 分</Text>
            {/* <Button title="Start" onPress={() => handleStartTask(item)} /> */}
          </View>
        )}
      />
      <Button title="Settings" onPress={() => router.push('/settings')} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  currentTime: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 18,
  },
  taskDuration: {
    fontSize: 18,
  },
})

export default Settings

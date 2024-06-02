import React, { useEffect, useReducer, useRef, useState } from 'react'
import {
  Pressable,
  Dimensions,
  Modal,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native'
import { View, AnimatePresence, Text } from 'moti'
import { icons } from '../../constants'
import { Audio } from 'expo-av'
import { MyList, Task } from '../types'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

function FullScreenShape({
  onClose,
  tasks,
}: {
  onClose: () => void
  tasks: Task[]
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
  const [isInitialCountdownPlaying, setIsInitialCountdownPlaying] =
    useState(false)
  const [initialCountdownRemainingTime, setInitialCountdownRemainingTime] =
    useState(5)
  const [taskRemainingTime, setTaskRemainingTime] = useState(tasks[0].duration)
  const soundRefs = useRef<Audio.Sound[]>([])

  useEffect(() => {
    const loadSounds = async () => {
      const soundFiles = [
        require('../../assets/sounds/1second.mp3'),
        require('../../assets/sounds/2second.mp3'),
        require('../../assets/sounds/3second.mp3'),
        require('../../assets/sounds/4second.mp3'),
        require('../../assets/sounds/5second.mp3'),
        require('../../assets/sounds/startWorking.mp3'),
        require('../../assets/sounds/remaining10.mp3'),
        require('../../assets/sounds/stopWorking.mp3'),
      ]

      const loadedSounds = await Promise.all(
        soundFiles.map((file) => Audio.Sound.createAsync(file))
      )
      soundRefs.current = loadedSounds.map((soundObj) => soundObj.sound)
    }

    loadSounds()

    return () => {
      soundRefs.current.forEach((sound) => sound.unloadAsync())
    }
  }, [])

  const playSound = async (index: number) => {
    if (soundRefs.current[index]) {
      await soundRefs.current[index].replayAsync()
    }
  }

  const handlePlayPause = () => {
    if (isInitialCountdownPlaying) {
      setIsInitialCountdownPlaying(!isInitialCountdownPlaying)
    } else {
      setIsPlaying(!isPlaying)
    }
  }

  const handleCancel = () => {
    Alert.alert(
      'ホームに戻りますか？',
      'この操作は取り消せません。',
      [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setIsPlaying(false)
            setIsInitialCountdownPlaying(false)
            setInitialCountdownRemainingTime(5)
            setTaskRemainingTime(tasks[currentTaskIndex].duration)
            onClose()
          },
        },
      ],
      { cancelable: false }
    )
  }

  const handleComplete = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex((prevIndex) => prevIndex + 1)
      setIsPlaying(false)
      setIsInitialCountdownPlaying(true)
      setInitialCountdownRemainingTime(5)
      setTaskRemainingTime(tasks[currentTaskIndex + 1].duration)
    } else {
      setIsPlaying(false)
    }
  }

  const handleInitialCountdownComplete = () => {
    setIsInitialCountdownPlaying(false)
    setIsPlaying(true)
  }

  const startInitialCountdown = async () => {
    for (let i = initialCountdownRemainingTime - 1; i >= 0; i--) {
      if (!isInitialCountdownPlaying) return
      await playSound(i)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setInitialCountdownRemainingTime(i)
    }
    await playSound(5)
    handleInitialCountdownComplete()
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }

  const totalRemainingTime = tasks
    .slice(currentTaskIndex)
    .reduce((total, task) => total + task.duration, 0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isInitialCountdownPlaying) {
      startInitialCountdown()
    } else if (isPlaying) {
      interval = setInterval(() => {
        setTaskRemainingTime((prev) => {
          if (prev === 0) {
            clearInterval(interval as NodeJS.Timeout)
            handleComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isInitialCountdownPlaying, isPlaying])

  useEffect(() => {
    if (taskRemainingTime === 10) {
      playSound(6) // remaining10.mp3
    }
    if (taskRemainingTime === 1) {
      playSound(7) // stopWorking.mp3
    }
  }, [taskRemainingTime])

  return (
    <SafeAreaView className="flex-1">
      <View
        from={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        exitTransition={{ type: 'timing', duration: 200 }}
        className={`flex-1 justify-center items-center ${
          isInitialCountdownPlaying ? 'bg-gray-200' : 'bg-orange-100'
        }`}
      >
        <Text
          className="text-lg font-bold mb-5 w-3/4 truncate text-primary font-psemibold"
          numberOfLines={1}
        >
          {currentTaskIndex < tasks.length - 1
            ? `Next: ${tasks[currentTaskIndex + 1].name}`
            : '最後のタスクです。'}
        </Text>
        {isInitialCountdownPlaying ? (
          <CountdownCircleTimer
            key="initialCountdown"
            isPlaying={isInitialCountdownPlaying}
            duration={initialCountdownRemainingTime}
            colors="#000"
            onComplete={handleInitialCountdownComplete}
            size={300}
            strokeWidth={10}
          >
            {({ remainingTime }) => (
              <View className="items-center">
                <Text className="text-sm font-bold my-2 w-3/4  truncate font-psemibold">
                  準備時間
                </Text>
                <Text className="text-6xl text-primary font-bold">
                  {formatTime(remainingTime)}
                </Text>
                <View className="flex-row items-center justify-center gap-2">
                  <Image
                    source={icons.timer}
                    className="w-[20px] h-[20px]"
                    resizeMode="contain"
                  />
                  <Text className="text-md mt-1s">
                    {formatTime(totalRemainingTime)}
                  </Text>
                </View>
              </View>
            )}
          </CountdownCircleTimer>
        ) : (
          <CountdownCircleTimer
            key="mainCountdown"
            isPlaying={isPlaying}
            duration={tasks[currentTaskIndex].duration}
            initialRemainingTime={taskRemainingTime}
            colors={['#B8CC6E', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            onComplete={handleComplete}
            size={300}
            strokeWidth={10}
          >
            {({ remainingTime }) => (
              <View className="items-center">
                <Text
                  className="text-sm font-bold my-2 w-3/4  truncate font-psemibold"
                  numberOfLines={1}
                >
                  {tasks[currentTaskIndex].name}
                </Text>
                <Text className="text-6xl font-bold text-primary">
                  {formatTime(remainingTime)}
                </Text>
                <View className="flex-row items-center justify-center gap-2 mt-1 font-psemibold">
                  <Image
                    source={icons.timer}
                    className="w-[20px] h-[20px]"
                    resizeMode="contain"
                  />
                  <Text className="text-md">
                    {formatTime(totalRemainingTime)}
                  </Text>
                </View>
              </View>
            )}
          </CountdownCircleTimer>
        )}

        <View className="flex-row justify-around w-full absolute bottom-20">
          <TouchableOpacity
            className="mt-3 justify-center items-center border-b h-10"
            onPress={handleCancel}
          >
            <Text className="text-lg font-bold text-gray-600 font-psemibold">
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[60px] h-[60px] rounded-full bg-gray-300 justify-center items-center"
            onPress={handlePlayPause}
          >
            <Image
              source={
                isPlaying || isInitialCountdownPlaying
                  ? icons.pause
                  : icons.play
              }
              className="w-[30px] h-[30px] tint-color-gray-800"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

type TimerScreenProps = { selectedList: MyList | undefined }

const TimerScreen: React.FC<TimerScreenProps> = ({ selectedList }) => {
  const [isVisible, toggleVisibility] = useReducer((state) => !state, false)

  return (
    <>
      <Pressable
        onPress={toggleVisibility}
        className="mb-0 z-10 justify-center items-center w-[100px] h-[100px] rounded-full"
      >
        <Image
          source={icons.playOrange}
          className="w-[120px] h-[120px] tint-white"
        />
      </Pressable>
      <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => toggleVisibility()}
      >
        <AnimatePresence>
          {isVisible && selectedList && (
            <FullScreenShape
              onClose={() => toggleVisibility()}
              tasks={selectedList.tasks}
            />
          )}
        </AnimatePresence>
      </Modal>
    </>
  )
}

export default TimerScreen

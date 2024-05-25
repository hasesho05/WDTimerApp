import { useState, useEffect } from 'react'
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useTimer = () => {
  const [time, setTime] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [countdownBeforeStart, setCountdownBeforeStart] = useState<number>(0)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [tasks, setTasks] = useState<any>([])
  const [currentTask, setCurrentTask] = useState<any>(null)

  const animatedValue = useSharedValue(1)

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

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isRunning && time > 0 && !isPaused) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0 && isRunning) {
      setIsRunning(false)
      setShowModal(true)
    }

    return () => clearInterval(timer)
  }, [isRunning, time, isPaused])

  useEffect(() => {
    if (time > 0) {
      const totalSeconds = currentTask ? currentTask.duration * 60 : 0
      animatedValue.value = withTiming(time / totalSeconds, {
        duration: 500,
        easing: Easing.linear,
      })
    }
  }, [time, currentTask, animatedValue])

  const startTimer = (task: any) => {
    setCountdownBeforeStart(5)
    setShowModal(false)
    setCurrentTask(task)
    const interval = setInterval(() => {
      setCountdownBeforeStart((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(interval)
          const totalSeconds = task.duration * 60
          setTime(totalSeconds)
          animatedValue.value = 1
          setIsRunning(true)
          setIsPaused(false)
        }
        return prevCountdown - 1
      })
    }, 1000)
  }

  const stopTimer = () => {
    setIsPaused(true)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setIsPaused(false)
    setTime(0)
    setCountdownBeforeStart(0)
  }

  const resumeTimer = () => {
    setIsPaused(false)
  }

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
    const secs = time % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return {
    time,
    isRunning,
    countdownBeforeStart,
    showModal,
    startTimer,
    stopTimer,
    resetTimer,
    resumeTimer,
    formatTime,
    setShowModal,
    tasks,
  }
}

export default useTimer

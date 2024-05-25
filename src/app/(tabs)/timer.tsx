import { Canvas, vec } from '@shopify/react-native-skia'
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native'
import { Ring } from '../../components/Ring'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton'
import useTimer from '../../hooks/useTimer'
import { useSharedValue } from 'react-native-reanimated'

const { width, height } = Dimensions.get('window')
const center = vec(width / 2, height / 2)

const TimerApp = () => {
  const animatedValue = useSharedValue(1)
  const isPaused = false

  const {
    time,
    isRunning,

    countdownBeforeStart,
    setShowModal,
    showModal,
    startTimer,
    stopTimer,
    resetTimer,
    resumeTimer,
    formatTime,
  } = useTimer()

  return (
    <SafeAreaView className="flex-1 justify-center items-center p-5 bg-primary">
      <View
        style={{
          width: width - 40,
          height: width - 40,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {countdownBeforeStart > 0 ? (
          <Text className="text-3xl text-white font-bold text-center">
            開始まで...{countdownBeforeStart}秒前
          </Text>
        ) : (
          <>
            <Canvas
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
            >
              <Ring
                ring={{
                  totalProgress: animatedValue.value,
                  colors: ['#FF9C01'],
                  background: 'transparent',
                  size: width - 40,
                }}
                center={vec(width / 2 - 20, width / 2 - 20)}
                strokeWidth={40}
              />
            </Canvas>
            <Text className="text-3xl text-white font-bold text-center">
              {formatTime(time)}
            </Text>
          </>
        )}
      </View>
      {isRunning ? (
        isPaused ? (
          <View className="flex-row justify-between w-full mt-7">
            <CustomButton
              title="Resume"
              handlePress={resumeTimer}
              isLoading={false}
              containerStyles="w-1/2"
            />
            <CustomButton
              title="Reset"
              handlePress={resetTimer}
              isLoading={false}
              containerStyles="w-1/2"
            />
          </View>
        ) : (
          <CustomButton
            title="Stop"
            handlePress={stopTimer}
            isLoading={false}
            containerStyles="w-full mt-7"
          />
        )
      ) : (
        <CustomButton
          title="Start"
          handlePress={() => {}}
          isLoading={false}
          containerStyles="w-full mt-7"
        />
      )}
      <Modal
        transparent={true}
        animationType="slide"
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              次のタイマーを選択してください
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                startTimer(20)
              }}
            >
              <Text style={styles.modalButtonText}>ワインディング20分</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                startTimer(25)
              }}
            >
              <Text style={styles.modalButtonText}>オールウェーブ25分</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FF9C01',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default TimerApp

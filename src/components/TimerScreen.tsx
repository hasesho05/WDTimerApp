import React, { useReducer } from 'react'
import {
  StyleSheet,
  Pressable,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native'
import { View, AnimatePresence, Text } from 'moti'

const { width, height } = Dimensions.get('window')

function FullScreenShape({ onClose }) {
  return (
    <View
      from={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      exitTransition={{ type: 'timing', duration: 200 }}
      style={styles.fullScreenShape}
    >
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  )
}

export default function TimerScreen() {
  const [isVisible, toggleVisibility] = useReducer((state) => !state, false)

  return (
    <Pressable onPress={toggleVisibility} style={styles.container}>
      <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => toggleVisibility()}
      >
        <AnimatePresence>
          {isVisible && <FullScreenShape onClose={() => toggleVisibility()} />}
        </AnimatePresence>
      </Modal>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  fullScreenShape: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: 'blue',
  },
  container: {
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9c1aff',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 5, // adds shadow for Android
    shadowColor: '#000', // adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  closeButtonText: {
    color: '#333',
    fontSize: 24,
    lineHeight: 30, // Ensures the text is centered in the button
  },
})

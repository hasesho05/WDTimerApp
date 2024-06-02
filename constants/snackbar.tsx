import { StyleSheet } from 'react-native'
import { BaseToast } from 'react-native-toast-message'

const toastConfig = {
  baseToast: () => (
    <BaseToast
      style={styles.baseToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
}

const styles = StyleSheet.create({
  baseToast: {
    borderLeftColor: 'orange',
    backgroundColor: 'rgba(255, 165, 0, 0.8)',
    borderRadius: 8,
    marginBottom: 20,
    elevation: 10,
    zIndex: 9999,
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  text2: {
    fontSize: 14,
    color: 'white',
  },
})

export default toastConfig

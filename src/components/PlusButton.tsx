import React from 'react'
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { MotiTransitionProp } from 'moti'
import { motifySvg } from 'moti/svg'
import { Line, Svg } from 'react-native-svg'

interface PlusButtonProps {
  mode: 'x' | 'plus'
  color?: string
  size?: number
  onPress?: (event: GestureResponderEvent) => void
}

const MotiLine = motifySvg(Line)()

const transition: MotiTransitionProp = {
  type: 'timing',
}

const PlusButton: React.FC<PlusButtonProps> = ({
  mode,
  color = 'black',
  size = 24,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <MotiLine
          x1="12"
          x2="12"
          y1="4"
          y2="20"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            rotation: mode === 'x' ? 45 : 0,
          }}
          origin={[12, 12]}
          transition={transition}
        />
        <MotiLine
          x1="4"
          x2="20"
          y1="12"
          y2="12"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            scaleX: mode === 'x' ? 0.1 : 1,
            opacity: mode === 'x' ? 0 : 1,
          }}
          origin={[12, 12]}
          transition={transition}
        />
        <MotiLine
          x1="12"
          x2="12"
          y1="4"
          y2="20"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            rotation: mode === 'x' ? -45 : 0,
          }}
          origin={[12, 12]}
          transition={transition}
        />
      </Svg>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  } as ViewStyle,
})

export default PlusButton

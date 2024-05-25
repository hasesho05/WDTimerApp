import {
  Circle,
  Group,
  Path,
  Skia,
  SweepGradient,
  type Vector,
  PathOp,
  Shader,
  Fill,
} from '@shopify/react-native-skia'
import React, { useEffect, useMemo } from 'react'
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const fromCircle = (center: Vector, r: number) => {
  'worklet'
  return Skia.XYWHRect(center.x - r, center.y - r, r * 2, r * 2)
}

interface Ring {
  colors: string[]
  background: string
  size: number
  totalProgress: number
}

interface RingProps {
  ring: Ring
  center: Vector
  strokeWidth: number
}

export const Ring = ({
  center,
  strokeWidth,
  ring: { size, background, totalProgress, colors },
}: RingProps) => {
  const trim = useSharedValue(0)
  const r = size / 2 - strokeWidth / 2
  const clip = useMemo(() => {
    const outerCircle = Skia.Path.Make()
    outerCircle.addCircle(center.x, center.y, size / 2)
    const innerCircle = Skia.Path.Make()
    innerCircle.addCircle(center.x, center.y, size / 2 - strokeWidth)
    return Skia.Path.MakeFromOp(outerCircle, innerCircle, PathOp.Difference)!
  }, [center.x, center.y, size, strokeWidth])
  const fullPath = useMemo(() => {
    const path = Skia.Path.Make()
    const fullRevolutions = Math.floor(totalProgress)
    for (let i = 0; i < fullRevolutions; i++) {
      path.addCircle(center.x, center.y, r)
    }
    path.addArc(fromCircle(center, r), 0, 360 * (totalProgress % 1))
    return path
  }, [center, r, totalProgress])
  const path = useDerivedValue(() => {
    if (trim.value < 1) {
      return fullPath.copy().trim(0, trim.value, false)!
    }
    return fullPath
  })

  useEffect(() => {
    trim.value = withTiming(1, { duration: 500 })
  }, [trim, totalProgress])

  return (
    <Group transform={[{ rotate: -Math.PI / 2 }]} origin={center}>
      <Group clip={clip}>
        <Fill color={background} />
        <Path
          path={path}
          strokeWidth={strokeWidth}
          style="stroke"
          color={colors[0]}
        >
          <SweepGradient colors={colors} c={center} />
        </Path>
      </Group>
    </Group>
  )
}

import React from 'react'
import { View, Text } from 'react-native'
import { Task } from '../types'

interface HomeTaskItemProps {
  task: Task
}

const HomeTaskItem: React.FC<HomeTaskItemProps> = ({ task }) => {
  const formatDuration = (duration: number): string => {
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`
  }

  return (
    <View className="w-full flex-row items-center justify-between py-3 px-2 rounded-lg border border-gray-200 bg-orange-200 mb-4">
      <Text
        className="text-base font-medium  w-3/4 truncate text-primary font-psemibold"
        numberOfLines={1}
      >
        {task.name}
      </Text>
      <Text className="text-sm font-medium text-gray-600 text-ellipsis">
        {formatDuration(task.duration)}
      </Text>
    </View>
  )
}

export default HomeTaskItem

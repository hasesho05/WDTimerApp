import React from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import TextInputWithLabel from './TextInputWithLabel'
import { Task } from '../types'

interface TaskItemProps {
  task: Task
  onUpdateTask: (taskId: number, updatedTask: Task) => void
  onDeleteTask: (taskId: number) => void
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onUpdateTask,
  onDeleteTask,
}) => {
  console.log(task)

  return (
    <View
      key={task.id}
      className="flex-row items-center p-4 border-b border-gray-200"
    >
      <View className="flex-1 flex-row items-center">
        <TextInput
          value={task.name}
          onChangeText={(text) =>
            onUpdateTask(task.id, {
              name: text,
              duration: task.duration,
              id: task.id,
            })
          }
          style={{ flex: 1 }}
        />
        <TextInput
          value={task.duration.toString()}
          onChangeText={(text) =>
            onUpdateTask(task.id, {
              id: task.id,
              name: task.name,
              duration: parseInt(text, 10) || 0,
            })
          }
          style={{ width: 64, marginLeft: 16 }}
        />
      </View>
      <TouchableOpacity
        onPress={() => onDeleteTask(task.id)}
        className="ml-4 p-2 bg-red-200 rounded"
      >
        <Text>削除</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TaskItem

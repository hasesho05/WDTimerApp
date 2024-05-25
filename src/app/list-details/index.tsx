import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { MyList } from '../../types'

const ListDetails: React.FC = () => {
  const { list } = useLocalSearchParams()
  const selectedList: MyList = JSON.parse(list as string)
  const router = useRouter()

  return (
    <View className="flex-1 p-5">
      <TouchableOpacity
        className="self-start p-2.5"
        onPress={() => router.back()}
      >
        <Text>キャンセル</Text>
      </TouchableOpacity>
      <Text className="mb-3.5 text-center text-xl">
        リスト: {selectedList.title}
      </Text>
      {selectedList.tasks.map((task, index) => (
        <Text key={index} className="mb-2.5 text-base">
          {task.name} - {task.duration}分
        </Text>
      ))}
    </View>
  )
}

export default ListDetails

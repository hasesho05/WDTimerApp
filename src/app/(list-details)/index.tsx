import React, { useState } from 'react'
import {
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  Dimensions,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { MyList } from '../../types'
import { MotiView, AnimatePresence, View } from 'moti'

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import TaskItem from '../../components/TaskItem'
import useMyListStore from '../../stores/useMyListStore'
import EmojiSelector from 'react-native-emoji-selector'
import Modal from 'react-native-modal'
import Toast from 'react-native-toast-message'
import toastConfig from '../../../constants/snackbar'

const { height } = Dimensions.get('window')

const ListDetails: React.FC = () => {
  const { myList } = useLocalSearchParams()
  const initialList: MyList = JSON.parse(myList as string)
  const [selectedList, setSelectedList] = useState<MyList>(initialList)
  const router = useRouter()
  const { updateList } = useMyListStore()
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)

  const handleSelectEmoji = (emoji: string) => {
    setSelectedList((prevList) => ({ ...prevList, icon: emoji }))
    setIsEmojiPickerOpen(false)
  }

  const handleAddTask = () => {
    const newTask = { id: Date.now(), name: '', duration: 0 }
    setSelectedList((prevList) => ({
      ...prevList,
      tasks: [...prevList.tasks, newTask],
    }))
  }

  const handleUpdateTask = (
    taskId: number,
    updatedTask: Partial<MyList['tasks'][0]>
  ) => {
    setSelectedList((prevList) => {
      const updatedTasks = prevList.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
      return { ...prevList, tasks: updatedTasks }
    })
  }

  const handleDeleteTask = (taskId: number) => {
    setSelectedList((prevList) => {
      const updatedTasks = prevList.tasks.filter((task) => task.id !== taskId)
      return { ...prevList, tasks: updatedTasks }
    })
  }

  const handleSaveList = () => {
    try {
      updateList(selectedList.id, selectedList)
      Toast.show({
        text1: `リストが保存されました 🙌`,
      })
      router.back()
    } catch (error) {
      console.error('Failed to save list', error)
      Alert.alert('Error', 'Failed to save list')
    }
  }

  return (
    <GestureHandlerRootView className="flex-1 bg-orange-100">
      <MotiView
        className="flex-1 p-5"
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <TouchableOpacity
          onPress={() => setIsEmojiPickerOpen(true)}
          className="mx-auto mb-6"
        >
          <Text style={{ fontSize: 80 }}>{selectedList.icon || '📝'}</Text>
        </TouchableOpacity>
        <TextInput
          value={selectedList.title}
          onChangeText={(text) =>
            setSelectedList((prevList) => ({ ...prevList, title: text }))
          }
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 16,
            color: '#333',
          }}
          placeholder="リストのタイトルを入力..."
          placeholderTextColor="#999"
        />
        <AnimatePresence>
          <View className="max-h-72 overflow-scroll">
            {selectedList.tasks.map((task) => (
              <MotiView
                key={task.id}
                from={{ opacity: 0, translateY: 50 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateX: -100 }}
                transition={{ type: 'timing', duration: 300 }}
              >
                <TaskItem
                  task={task}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                />
              </MotiView>
            ))}
          </View>
        </AnimatePresence>
        <View className="flex-row justify-end gap-2 mt-2">
          <TouchableOpacity
            className="self-center p-2.5 bg-orange-200 rounded mt-4 border-2 border-orange-300"
            onPress={handleAddTask}
          >
            <Text>タスクを追加</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="self-center p-2.5 bg-orange-200 rounded mt-4 border-2 border-orange-300"
            onPress={handleSaveList}
          >
            <Text>保存</Text>
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={isEmojiPickerOpen}
          onBackdropPress={() => setIsEmojiPickerOpen(false)}
          style={{ justifyContent: 'flex-end', margin: 0 }}
        >
          <MotiView
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              height: height * 0.5,
            }}
          >
            <EmojiSelector
              onEmojiSelected={handleSelectEmoji}
              columns={6}
              showTabs={false}
              showSearchBar={false}
              showHistory={false}
            />
          </MotiView>
        </Modal>
      </MotiView>
      <Toast config={toastConfig} position={'bottom'} visibilityTime={3000} />
    </GestureHandlerRootView>
  )
}

export default ListDetails

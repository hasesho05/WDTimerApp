import React, { useState } from 'react'
import {
  FlatList,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import TimerScreen from '../components/TimerScreen'
import useMyListStore from '../stores/useMyListStore'
import HomeTaskItem from '../components/HomeTaskItem'
import CustomButton from '../components/CustomButton'
import Modal from 'react-native-modal'
import { Image, MotiView } from 'moti'
import Toast from 'react-native-toast-message'
import toastConfig from '../../constants/snackbar'
import { icons } from '../../constants'

const { height } = Dimensions.get('window')

const Home: React.FC = () => {
  const { myLists, selectedListId, setSelectedListId } = useMyListStore()
  const [isPickerVisible, setIsPickerVisible] = useState(false)

  const selectedList = myLists.find((list) => list.id === selectedListId)

  const togglePicker = () => {
    setIsPickerVisible(!isPickerVisible)
  }

  const handleListSelect = (listId: number) => {
    setSelectedListId(listId)
    setIsPickerVisible(false)
  }

  return (
    <SafeAreaView className="flex-1 items-center p-5 bg-orange-100">
      <FlatList
        data={selectedList?.tasks || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <HomeTaskItem task={item} />}
        contentContainerStyle={{
          width: '100%',
          paddingHorizontal: 20,
          marginTop: 20,
          flexGrow: 1,
          justifyContent: 'flex-start',
        }}
        ListHeaderComponent={
          <View className="items-center mb-6">
            <TimerScreen selectedList={selectedList} />
            <TouchableOpacity
              onPress={togglePicker}
              className="mt-6 border-2 border-orange-200 h-10 items-center justify-center rounded-lg w-full"
            >
              <Text className="text-base  text-primary font-psemibold">
                {selectedList
                  ? `${selectedList.icon ?? '📝'}  ${selectedList.title}`
                  : 'Select a list'}
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
      <TouchableOpacity
        className="ml-auto"
        onPress={() => router.push('/(settings)')}
      >
        <Image source={icons.settings} className="w-[60px] h-[60px]" />
      </TouchableOpacity>
      <Modal isVisible={isPickerVisible} className="justify-end m-0">
        <MotiView
          className="p-2 bg-white rounded-t-3xl"
          style={{ height: height * 0.5 }}
        >
          <Text className="p-2 text-ellipsis text-lg font-bold text-primary font-psemibold">
            リストを選択してください
          </Text>
          <FlatList
            data={myLists}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleListSelect(item.id)}
                className="p-4 border-b border-gray-300"
              >
                <Text className="text-base text-gray-800 font-psemibold ">
                  {item.icon ?? '📝'}
                  {`  `} {item.title}
                </Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={togglePicker}>
            <Text className="font-bold ml-auto mr-4 mb-4 text-lg text-gray-400 font-psemibold ">
              Cancel
            </Text>
          </TouchableOpacity>
        </MotiView>
      </Modal>
      <Toast config={toastConfig} position={'bottom'} visibilityTime={3000} />
    </SafeAreaView>
  )
}

export default Home

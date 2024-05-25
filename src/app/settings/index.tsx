import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ActionMenu from '../../components/ActionMenu'
import { MyList } from '../../types'
import { useRouter } from 'expo-router'

const Settings: React.FC = () => {
  const [myLists, setMyLists] = useState<MyList[]>([])
  const router = useRouter()

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedLists = await AsyncStorage.getItem('@mylist')
        if (storedLists !== null) {
          setMyLists(JSON.parse(storedLists))
        }
      } catch (error) {
        console.error('Failed to load settings', error)
      }
    }
    loadSettings()
  }, [])

  const addNewList = async () => {
    const newList: MyList = {
      title: '新しいリスト',
      tasks: [
        { name: '新しいタスク1', duration: 10 },
        { name: '新しいタスク2', duration: 20 },
      ],
    }
    try {
      await AsyncStorage.setItem(
        '@mylist',
        JSON.stringify([...myLists, newList])
      )
      setMyLists((currentLists) => [...currentLists, newList])
    } catch (error) {
      console.error('Failed to add new list to AsyncStorage', error)
    }
  }

  const handleSelectList = (myList: MyList) => {
    router.push({
      pathname: '/list-details',
      params: { list: JSON.stringify(myList) },
    })
  }

  return (
    <View className="flex-1 p-5">
      <FlatList
        data={myLists}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="p-2.5 my-2 bg-purple-200 rounded"
            onPress={() => handleSelectList(item)}
          >
            <Text className="text-lg">{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <ActionMenu onAddNewList={addNewList} />
    </View>
  )
}

export default Settings

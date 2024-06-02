import React from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native'
import { Menu, MenuItem } from 'react-native-material-menu'
import { MyList } from '../../types'
import { useRouter } from 'expo-router'
import useMyListStore from '../../stores/useMyListStore'
import CustomButton from '../../components/CustomButton'
import { icons } from '../../../constants'
import Toast from 'react-native-toast-message'
import toastConfig from '../../../constants/snackbar'

const Settings: React.FC = () => {
  const router = useRouter()
  const { myLists, addList, clearLists, deleteList } = useMyListStore()
  const [visibleMenuId, setVisibleMenuId] = React.useState<number | null>(null)
  const showMenu = (listId: number) => setVisibleMenuId(listId)
  const hideMenu = () => setVisibleMenuId(null)
  const menuRef = React.useRef<Menu>(null)

  const handleAddNewList = () => {
    const newList: MyList = {
      id: Date.now(),
      title: '新しいリスト',
      tasks: [
        { name: '新しいタスク1', duration: 10, id: Date.now() },
        { name: '新しいタスク2', duration: 20, id: Date.now() + 1 },
      ],
    }
    addList(newList)
    Toast.show({
      text1: `リストが追加されました  🙌`,
    })
  }

  const handleSelectList = (myList: MyList) => {
    router.push({
      pathname: '/(list-details)',
      params: { myList: JSON.stringify(myList) },
    })
  }

  const handleDuplicate = (list: MyList) => {
    try {
      const newList: MyList = {
        ...list,
        id: Date.now(),
        title: `${list.title} のコピー`,
      }
      addList(newList)
      setVisibleMenuId(null)
      Toast.show({
        text1: `リストの複製に成功しました  🙌`,
      })
    } catch (error) {
      console.error('リストの複製に失敗しました', error)
      Toast.show({ text1: 'リストの複製に失敗しました' })
    }
  }

  const handleDelete = (listId: number) => {
    try {
      deleteList(listId)
      setVisibleMenuId(null)
      Toast.show({
        text1: `リストの削除に成功しました  🙌`,
      })
    } catch (error) {
      console.error('リストの削除に失敗しました', error)
      Toast.show({ text1: 'リストの削除に失敗しました' })
    }
  }

  return (
    <View className="flex-1 p-5 bg-orange-100">
      <FlatList
        data={myLists}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="p-2.5 my-2 px-5 bg-orange-200 rounded flex-row items-center justify-between"
            onPress={() => handleSelectList(item)}
          >
            <View className="flex-row">
              <Image
                source={icons.rightArrow}
                className="w-4 h-4 my-auto mr-4"
              />
              <Text className="text-lg mr-1">{item.icon || '📝'}</Text>
              <Text
                className="text-lg font-bold w-3/4 truncate"
                numberOfLines={1}
              >
                {item.title}
              </Text>
            </View>
            <Menu
              ref={menuRef}
              visible={visibleMenuId === item.id}
              anchor={
                <TouchableOpacity onPress={() => showMenu(item.id)}>
                  <Image source={icons.menu} className="w-6 h-6" />
                </TouchableOpacity>
              }
              onRequestClose={hideMenu}
            >
              <MenuItem onPress={() => handleDuplicate(item)}>
                <View className="flex-row justify-center items-center gap-2 pr-2">
                  <Image
                    source={icons.duplicate}
                    className="h-5 w-5"
                    resizeMode="contain"
                  />
                  <Text className=" text-primary font-psemibold">複製する</Text>
                </View>
              </MenuItem>
              <MenuItem onPress={() => handleDelete(item.id)}>
                <View className="flex-row justify-center items-center gap-2 pr-2">
                  <Image
                    source={icons.deleteIcon}
                    className="h-5 w-5"
                    resizeMode="contain"
                  />
                  <Text className=" text-red-500 font-psemibold">削除する</Text>
                </View>
              </MenuItem>
            </Menu>
          </TouchableOpacity>
        )}
      />

      <CustomButton title="リストを追加する" handlePress={handleAddNewList} />
      <Toast config={toastConfig} position={'bottom'} visibilityTime={3000} />
    </View>
  )
}

export default Settings

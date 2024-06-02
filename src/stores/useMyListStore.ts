import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MyList } from '../types'

interface MyListStore {
  myLists: MyList[]
  selectedListId: number | null
  addList: (list: MyList) => void
  updateList: (listId: number, updatedList: Partial<MyList>) => void
  deleteList: (listId: number) => void
  clearLists: () => void
  setSelectedListId: (listId: number | null) => void
}
const useMyListStore = create<MyListStore>()(
  persist(
    (set) => ({
      myLists: [
        {
          id: 1,
          title: '第一課題 カッティング',
          tasks: [
            { duration: 10, id: 1716729514647, name: 'モデルウィッグの審査' },
            { duration: 20, id: 1716729514648, name: 'カッティングの準備' },
            {
              duration: 10,
              id: 1716826763729,
              name: 'モデルウィッグの顔面拭き取り',
            },
            { duration: 10, id: 1716828246470, name: '仕上がり審査' },
          ],
        },
        {
          id: 2,
          title: '第二課題 オールウェーブ',
          tasks: [
            { duration: 10, id: 1716729514647, name: 'セッティング' },
            { duration: 20, id: 1716729514648, name: 'オールウェーブ試験' },
            {
              duration: 10,
              id: 1716826763729,
              name: 'モデルウィッグの顔面拭き取り',
            },
            { duration: 10, id: 1716828246470, name: '仕上がり審査' },
          ],
        },
      ],
      selectedListId: null,
      addList: (list: MyList) => {
        set((state) => ({ myLists: [...state.myLists, list] }))
      },
      updateList: (listId: number, updatedList: Partial<MyList>) => {
        set((state) => ({
          myLists: state.myLists.map((list) =>
            list.id === listId ? { ...list, ...updatedList } : list
          ),
        }))
      },
      deleteList: (listId: number) => {
        set((state) => ({
          myLists: state.myLists.filter((list) => list.id !== listId),
        }))
      },
      clearLists: () => {
        set({ myLists: [] })
      },
      setSelectedListId: (listId: number | null) => {
        set({ selectedListId: listId })
      },
    }),
    {
      name: 'my-list-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
export default useMyListStore

import React, { forwardRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import { MyList } from '../types'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'

interface ListBottomSheetProps {
  selectedList: MyList | null
  snapPoints: string[]
  ref: React.RefObject<BottomSheetMethods>
}

const ListBottomSheet = forwardRef<BottomSheetMethods, ListBottomSheetProps>(
  ({ selectedList, snapPoints, ref }) => {
    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        style={styles.sheet}
      >
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => ref?.current?.close()}
        >
          <Text>キャンセル</Text>
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          {selectedList && (
            <>
              <Text style={styles.modalText}>リスト: {selectedList.title}</Text>
              {selectedList.tasks.map((task, index) => (
                <Text key={index} style={styles.taskDetail}>
                  {task.name} - {task.duration}分
                </Text>
              ))}
            </>
          )}
        </View>
      </BottomSheet>
    )
  }
)

const styles = StyleSheet.create({
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentContainer: {
    zIndex: 100,
    padding: 16,
    backgroundColor: 'white',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
  },
  taskDetail: {
    fontSize: 16,
    marginBottom: 10,
  },
  cancelButton: {
    alignSelf: 'flex-start',
    padding: 10,
  },
})

export default ListBottomSheet

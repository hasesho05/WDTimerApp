import { Text, View, StyleSheet, Pressable } from 'react-native'
import { AnimatePresence, MotiView } from 'moti'
import { useState } from 'react'

interface Props {
  onAddNewList: () => void // この型定義を追加
}

type Action = {
  type: string
  color: string
  emoji: string
  border: string
  action: () => void
}

export default function ActionMenu({ onAddNewList }: Props) {
  // Propsを追加
  const [expanded, setExpanded] = useState(false)
  const actions: Action[] = [
    {
      type: 'Add',
      color: '#1A73E8',
      emoji: '➕',
      border: '#2F4EB2',
      action: onAddNewList,
    }, // 新しいリスト追加ボタン
    // 他のボタンもここに追加
  ]

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setExpanded(!expanded)}
        style={[
          styles.button,
          {
            backgroundColor: expanded ? '#2F4EB2' : '#10243E',
            borderColor: '#2F4EB2',
          },
        ]}
      >
        <MotiView
          style={{ position: 'absolute' }}
          animate={{ scale: expanded ? 1.5 : 1 }}
          transition={{
            duration: 150,
            type: 'timing',
          }}
        >
          <Text>🎁</Text>
        </MotiView>
      </Pressable>
      <AnimatePresence>
        {expanded && (
          <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
            {actions.map((action, i) => (
              <ActionButton key={i.toString()} action={action} index={i} />
            ))}
          </View>
        )}
      </AnimatePresence>
    </View>
  )
}

function ActionButton({ action, index }: { action: Action; index: number }) {
  return (
    <MotiView
      transition={{ delay: index * 100, damping: 15, mass: 1 }}
      from={{
        opacity: 0,
        translateX: 0,
      }}
      animate={{
        opacity: 1,
        translateX: -65 * (index + 1),
      }}
      exit={{
        opacity: 0,
        translateX: 0,
      }}
    >
      <Pressable
        onPress={action.action}
        style={[
          styles.button,
          {
            backgroundColor: action.color,
            shadowColor: action.color,
            borderColor: action.border,
          },
        ]}
      >
        <Text style={{ fontSize: 18 }}>{action.emoji}</Text>
      </Pressable>
    </MotiView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 20,
    zIndex: 1,
    // backgroundColor: '#111',
    padding: 8,
  },
  button: {
    borderRadius: 100,
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    right: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 1,
    borderWidth: 2,
  },
})

const actions = [
  {
    type: 'Send',
    color: '#341A34',
    emoji: '👨🏻‍🚒',
    border: '#692D6F',
  },
  {
    type: 'Scan',
    color: '#16301D',
    emoji: '📸',
    border: '#2F6E3B',
  },

  {
    type: 'Activity',
    color: '#3B1813',
    emoji: '🌊',
    border: '#7F2315',
  },
]

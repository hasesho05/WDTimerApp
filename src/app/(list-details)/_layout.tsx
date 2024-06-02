import { Stack } from 'expo-router'

const ListDetailLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default ListDetailLayout

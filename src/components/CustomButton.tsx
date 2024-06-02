import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'

interface CustomButtonProps {
  title: string
  handlePress: () => void
  containerStyles?: string
  textStyles?: string
  isLoading?: boolean
}

const CustomButton = ({
  title,
  handlePress,
  containerStyles = '',
  textStyles = '',
  isLoading = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[50px] flex flex-row justify-center items-center px-2 ${containerStyles} ${
        isLoading ? 'opacity-50' : ''
      }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  )
}

export default CustomButton

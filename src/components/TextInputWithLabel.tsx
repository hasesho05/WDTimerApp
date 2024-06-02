import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native'

interface TextInputWithLabelProps {
  label: string
  value: string
  onChangeText: (text: string) => void
  required?: boolean
  placeholder?: string
  style?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
  labelStyle?: StyleProp<TextStyle>
  requiredStyle?: StyleProp<TextStyle>
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad'
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  autoCorrect?: boolean
  autoFocus?: boolean
  editable?: boolean
  maxLength?: number
  multiline?: boolean
  numberOfLines?: number
  secureTextEntry?: boolean
  textContentType?:
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode'
}

const TextInputWithLabel: React.FC<TextInputWithLabelProps> = ({
  label,
  value,
  onChangeText,
  required = false,
  placeholder = '',
  style,
  inputStyle,
  labelStyle,
  requiredStyle,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = true,
  autoFocus = false,
  editable = true,
  maxLength,
  multiline = false,
  numberOfLines = 1,
  secureTextEntry = false,
  textContentType = 'none',
}) => {
  return (
    <View style={[{ position: 'relative' }, style]}>
      <Text
        style={[
          {
            position: 'absolute',
            left: 8,
            top: 4,
            fontSize: 12,
            color: '#6B7280',
          },
          labelStyle,
        ]}
      >
        {label}
        {required && <Text style={[{ marginLeft: 5 }, requiredStyle]}>*</Text>}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[
          {
            paddingTop: 24,
            paddingBottom: 8,
            paddingHorizontal: 8,
            borderWidth: 1,
            borderColor: '#D1D5DB',
            borderRadius: 4,
          },
          inputStyle,
        ]}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        autoFocus={autoFocus}
        editable={editable}
        maxLength={maxLength}
        multiline={multiline}
        numberOfLines={numberOfLines}
        secureTextEntry={secureTextEntry}
        textContentType={textContentType}
      />
    </View>
  )
}

export default TextInputWithLabel

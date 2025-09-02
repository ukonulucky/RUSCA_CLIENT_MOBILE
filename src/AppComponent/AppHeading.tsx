import { View, Text } from 'react-native'
import React from 'react'

const AppHeading = ({ appText, textStyle, containerStyle }: {
    appText: string,
    textStyle: string,
    containerStyle: string
}) => {
  return (
      <View className={ `${containerStyle}`}>
          <Text className={ `${textStyle}`}>{ appText } </Text>
    </View>
  )
}

export default AppHeading
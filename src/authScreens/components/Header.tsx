import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Header = ({ navigation }: any) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack()
        }}
        className="w-10 h-10 bg-white rounded-lg border border-neutral-300 border-opacity-50 items-center justify-center"
      >
        <Image
          source={require('../../../assets/images/back.png')}
          className="w-[17.6px] h-[17.6px]"
        />
      </TouchableOpacity>
    </View>
  )
}

export default Header

import { View, Text } from 'react-native'
import React from 'react'
import LoaderAnimation from './LoaderAnimation'

const AppLoaderScreen = () => {
  return (
      <View className='flex-1 items-center justify-center absolute left-0 right-0 top-0 bottom-0 z-10'
          style={{
        backgroundColor: "rgba(78,78,78,0.3)"
      }}
      >
    <LoaderAnimation />
    </View>
  )
}

export default AppLoaderScreen
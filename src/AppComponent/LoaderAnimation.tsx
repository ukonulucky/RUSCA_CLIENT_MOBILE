import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const LoaderAnimation = () => {
  return (
    <View>
          <LottieView
            
        source={require('../../assets/LottieAnimation/LottieLoader.json')}
        autoPlay
        loop
        style={{
          width: 200,
          height: 200
        }}
              
      />
    </View>
  )
}

export default LoaderAnimation
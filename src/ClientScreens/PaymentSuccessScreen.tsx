import { View, Text, Image, Button } from 'react-native'
import React from 'react'
import { groupStackParamList } from 'utils/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

const PaymentSuccessScreen = ({ navigation }: NativeStackScreenProps<groupStackParamList>) => {
  return (
    <View className="flex-1 bg-green-100 items-center justify-center p-6">
      {/* Title */}
      <Text className="text-3xl font-semibold text-green-800 mb-6">Payment Successful</Text>

      {/* Image (Assuming you have a success image file) */}
      <Image
        source={require('../../assets/images/success.png')} // Replace with your image source
        className="w-48 h-48 mb-6"
        resizeMode="contain"
      />

      {/* Confirmation Message */}
      <Text className="text-lg text-green-700 mb-6">
        Your payment has been processed successfully.
      </Text>

      {/* Button */}
      <Button
        title="Go to Dashboard"
        onPress={() => navigation.navigate("groupDetailsScreen")}
      />
    </View>
  )
}

export default PaymentSuccessScreen
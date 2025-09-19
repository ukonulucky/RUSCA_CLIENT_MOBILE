import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import React from "react";
import { groupStackParamList } from "utils/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const PaymentSuccessScreen = ({
  navigation,
}: NativeStackScreenProps<groupStackParamList>) => {
  return (
    <View className="flex-1 bg-green-100 items-center justify-center p-6">
      {/* Title */}
      <Text className="text-3xl font-semibold text-green-800 mb-6">
        Payment Successful
      </Text>

      {/* Image (Assuming you have a success image file) */}
      <Image
        source={require("../../assets/images/success.png")} // Replace with your image source
        className="w-48 h-48 mb-6"
        resizeMode="contain"
      />

      {/* Confirmation Message */}
      <Text className="text-lg text-green-700 mb-6">
        Your payment has been processed successfully.
      </Text>
      <TouchableOpacity
        className="bg-blue-700 py-4 px-10 rounded-full mb-4 w-3/4"
        onPress={() => navigation.navigate("groupListScreen")}
      >
        <Text className="text-white text-lg font-bold text-center">
          Go to Dashboard
        </Text>
      </TouchableOpacity>
      {/* Button */}
    </View>
  );
};

export default PaymentSuccessScreen;

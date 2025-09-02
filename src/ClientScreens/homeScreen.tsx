import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // This is to keep the gradient effect

import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const navigation = useNavigation()
  return (
    <LinearGradient
      colors={['#FF7A00', '#D92B88']} // Gradient background from orange to magenta
      className="flex-1"
    >
      {/* Background Image */}
      <ImageBackground
        source={require('../../assets/images/home-background.png')} // Replace with your image
        className="flex-1 justify-center items-center"
      >
        <View className="flex-1 justify-end items-center px-5">
         
      
          <View className="w-full items-center">
            <TouchableOpacity
              className="bg-pink-700 py-4 px-10 rounded-full mb-4 w-3/4"
              onPress={() => navigation.navigate('Activity')}
            >
              <Text className="text-white text-lg font-bold text-center">
                EXPLORE ACTIVITY
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-pink-700 py-4 px-10 rounded-full mb-4 w-3/4"
              onPress={() => navigation.navigate('Wallet')}
            >
              <Text className="text-white text-lg font-bold text-center">
                MANAGE WALLET
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-pink-700 py-4 px-10 rounded-full mb-4 w-3/4"
              onPress={() => navigation.navigate('Group')}
            >
              <Text className="text-white text-lg font-bold text-center">
                JOIN A GROUP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}

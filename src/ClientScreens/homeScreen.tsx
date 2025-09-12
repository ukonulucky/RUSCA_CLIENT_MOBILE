
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // This is to keep the gradient effect

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { bottomTabNavigationParamList } from 'utils/types';
import { useAppSelector } from 'redux/store/store';

export default function HomeScreen({
  navigation
}: NativeStackScreenProps<bottomTabNavigationParamList>) {
  const { role } = useAppSelector(state => state.authReducer.userProfile.userData!)
  const isUserAdmin = role === "admin" ? true : false
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
              onPress={() => { 
                isUserAdmin ? navigation.navigate('Members') : navigation.navigate('History')
              }}
            >
              <Text className="text-white text-lg font-bold text-center">
                { 
                  isUserAdmin ? "Activate Members" : "Payment History"
                }
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-pink-700 py-4 px-10 rounded-full mb-4 w-3/4"
              onPress={() => navigation.navigate('Group')}
            >
              <Text className="text-white text-lg font-bold text-center">
                { 
                  isUserAdmin ? "Create A Group" :"Join A Group"
                }
               
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}

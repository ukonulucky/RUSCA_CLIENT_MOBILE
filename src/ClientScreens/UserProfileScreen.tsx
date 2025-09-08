import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'redux/store/store';

const UserProfileScreen = () => {
  
  const {
    email,
    fullname,
    phone,
    role,
    token
   } = useAppSelector((state) => state.authReducer.userProfile.userData!);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    ; // This will clear the user profile and token
   // navigation.navigate('Login'); // Navigate back to the login screen
  };

  if (!token) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">User not logged in!</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-6">
      <Text className="text-2xl font-bold mb-4">User Profile</Text>
      <Text className="text-lg">Name: {fullname}</Text>
      <Text className="text-lg">Email: {email}</Text>
      <Text className="text-lg">Role: {role}</Text>
      <Text className="text-lg">Phone number: {phone}</Text>

     
      <TouchableOpacity
        onPress={handleLogout}
      className="mt-8 w-full rounded-xl px-4 py-3 items-center justify-center bg-blue-700  text-white text-lg text-bold">
        <Text className='text-white text-14'>
          Logout
       </Text>
      </TouchableOpacity>

    </View>
  );
};

export default UserProfileScreen;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from 'redux/store/store';
import { logOutUserApi } from 'apiServices/authApi/authApi';
import { toastError } from 'utils/useFulFunc';
import { AxiosError } from 'axios';
import { logInLogOutAction, userLoggedInAndLoggedOutAction } from 'redux/slices/authSlice';
import { saveMemberAction } from 'redux/slices/memberSlice';
import { clearGroupStateAction } from 'redux/slices/groupSlice';

const UserProfileScreen = () => {
  
  const {
    email,
    fullname,
    phone,
    role,
    token
   } = useAppSelector((state) => state.authReducer.userProfile.userData!);
  const dispatch = useAppDispatch();

  const [loader, setLoader] = useState(false)

 
  // logOutUserApi
  const handleLogout =  async () => {
 try {
       setLoader(!loader);
       /* make api call for user signIn */
       const { message, error
       } = await logOutUserApi(token);
       
       logInLogOutAction
   dispatch(userLoggedInAndLoggedOutAction(null))
   dispatch(logInLogOutAction(false))
   dispatch(saveMemberAction(null))
   dispatch(saveMemberAction(null))
    dispatch(clearGroupStateAction())
  
       const toastData = {
           type: 'success',
           message: message,
           heading: 'Logout Password',
           headingColor: 'green',
           messageColor: 'green'
         }
         toastError(toastData)
       setLoader(!loader)
      
     } catch (error) {
       setLoader(!loader)
       if ( error instanceof AxiosError && error.response) {
         const  errorMessage = error?.response.data.message || error.message
         const toastData = {
           type: 'error',
           message: errorMessage,
           heading: 'Logout',
           headingColor: 'red',
           messageColor: 'red'
         }
         toastError(toastData)
       } else { 
         console.log("error", error)
         const toastData = {
           type: 'error',
           message: "Unknown Error",
           heading: 'Logout',
           headingColor: 'red',
           messageColor: 'red'
         }
         toastError(toastData)
       }
     } finally {
       setLoader(false);
     
     }
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

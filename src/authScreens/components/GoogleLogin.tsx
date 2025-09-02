import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google'
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env';


WebBrowser.maybeCompleteAuthSession();

const GoogleLogin = () => {



 /*  ANDROID_CLIENT_ID=your_android_client_id
IOS_CLIENT_ID=your_ios_client_id
WEB_CLIENT_ID=your_web_client_id */
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
      /*   expoClientId: EXPO_CLIENT_ID, */
      });
      
    
    
    const handleGoogleAuth = async () => { 
        try {
            if (response?.type == "success") { 
                console.log("this is the google response", response)
                const { authentication } = response;
            }
            
        } catch (error: any) {
            console.log(error.message)
        }
    }
    useEffect(() => {
    handleGoogleAuth()
      
      }, [response]);
      



  return (
          <TouchableOpacity
            className="w-full h-[67px] px-8 py-2.5 bg-neutral-50  rounded-[19px] justify-center items-center inline-flex  border border-blue-950 flex-row  space-x-2"
            activeOpacity={0.7}
            onPress={() => {
              promptAsync()
            }}
          >
            <Image
              source={require('../../../assets/images/google.png')}
              className="w-[25.5px] h-[25.5px]"
            />
            <Text className="text-blue-950 text-sm font-medium font-['Aeonik-Medium'] leading-tight">
              Sign In With Google
            </Text>
          </TouchableOpacity>
    
  )
}

export default GoogleLogin


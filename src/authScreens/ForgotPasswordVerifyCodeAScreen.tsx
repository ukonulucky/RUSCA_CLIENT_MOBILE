import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useRoute } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import AppLoader from "../AppComponent/AppLoader";


import Header from './components/Header'

import TextOTP from './components/TextOTP'


import {
  verifyUserPasswordResetTokenApi
} from '../../apiServices/authApi/authApi'
import { authStackParamList, verifyForgetCodeRouteType } from '../../utils/types'
import { AxiosError } from 'axios'
import { toastError } from '../../utils/useFulFunc'
import { OnBoardingButton } from '../AppComponent/OnboardingButton'



const ForgetPasswordVarifyCodeScreen = ({
  navigation
}: NativeStackScreenProps<authStackParamList>) => {
  
  const [otp, setOtp] = useState('')
  const [showOtpError, setShowOtpError] = useState(false)
  const [otpClicked, setOtpClicked] = useState(false)



  /* to show or hide the loader screen */
  const [loader, setLoader] = useState(false)


  /* obtain params */

  const { params: { userEmail : email } } = useRoute<verifyForgetCodeRouteType>()

   

  
verifyUserPasswordResetTokenApi
  const handleSubmit = async () => {
    try {
      if (otp.length !== 5) {
        setOtpClicked(true)
        return
      }
      setOtpClicked(false)
      setShowOtpError(false)
      setOtpClicked(true)
      setLoader(true)
    
     
      /* make api call for user signIn */
             const { message, error
             } = await verifyUserPasswordResetTokenApi({
               email,
               token: otp
             });
             
      
             if (error ) { 
              const toastData = {
                type: 'warn',
                message: message,
                heading: 'Verify OTP',
                headingColor: 'green',
                messageColor: 'green'
              }
              toastError(toastData)
               setLoader(!loader)
               return
             }
        
             const toastData = {
                 type: 'success',
                 message: message,
                 heading: 'Verify Token',
                 headingColor: 'green',
                 messageColor: 'green'
               }
               toastError(toastData)
      setLoader(!loader)
      navigation.navigate("newPasswordScreen", {
        email,
        token: otp
      })
            
    } catch (error) {
           setLoader(!loader)
           if ( error instanceof AxiosError && error.response) {
             const  errorMessage = error?.response.data.message || error.message
             const toastData = {
               type: 'error',
               message: errorMessage,
               heading: 'Verify OTP',
               headingColor: 'red',
               messageColor: 'red'
             }
             toastError(toastData)
           } else { 
             console.log("error", error)
             const toastData = {
               type: 'error',
               message: "Unknown Error",
               heading: 'Verify OTP',
               headingColor: 'red',
               messageColor: 'red'
             }
             toastError(toastData)
           }
         } finally {
           setLoader(false);
         
         }
  }

  /* useEffect to control the display  of otp error */
  useEffect(() => {
    if (otp.length === 5) {
      setShowOtpError(false)
      return
    }
    if (otp.length !== 5 && otpClicked) {
      setShowOtpError(true)
      return
    }
    otpClicked && setShowOtpError(true)
  }, [otp, otpClicked])

  return (
    <SafeAreaView className="flex-1 bg-white px-[20px] py-2">
      {/* loader section starts */}
      {loader && <AppLoader />}
      {/* loader section ends */}
      <View className="mt-[8px]">
        <Header navigation={navigation} />
        {/* forgot password section starts */}

        <View className="mt-[24px]">
          <Text className="text-start  text-neutral-900 text-xl font-medium font-['Aeonik-Medium'] leading-7">
            Verify Code
          </Text>
          <Text className="w-full text-zinc-600 text-xs font-normal font-['Aeonik-Regular'] leading-tight mt-1">
            Please enter the code we just sent to {email}
          </Text>
         
        </View>

        {/* forgot password section ends */}



        <View className="mt-[32px]">
          <TextOTP otp={otp} setOtp={setOtp} />
          {showOtpError && (
            <View className="mt-2 h-6 justify-center items-center">
              <Text className='text-red-500 font-ligt font-["Aeonik-Regular"] leading-4 text-normal'>
                Five digit OTP pin is required
              </Text>
            </View>
          )}
        </View>

        {/* app button starts */}

        <View className="w-full  items-center">
          <OnBoardingButton
            buttonContainerStyles="w-full h-[67px] mt-[32px] px-8 py-2.5 bg-blue-950 rounded-[19px] justify-center items-center"
            buttonTextStyle="text-center text-white text-base font-medium font-['Aeonik-Medium'] leading-tight"
            buttonText="Verify Code"
            onPress={
              handleSubmit
              /*  navigation.navigate('newPasswordScreen') */
            }
          />

      
        </View>

        {/* app button ends */}
      </View>
    </SafeAreaView>
  )
}

export default ForgetPasswordVarifyCodeScreen

import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from './components/Header'
import TextOTP from './components/TextOTP'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useRoute } from '@react-navigation/native'
import {
  sendVerificationEmailApi,
  verifyEmailApi
} from '../../apiServices/authApi/authApi'
import { useMutation } from '@tanstack/react-query'
import { toastError } from '../../utils/useFulFunc'
import { authStackParamList, verifyCodeRouteType } from '../../utils/types'
import { AxiosError } from 'axios'
import AppLoaderScreen from '../AppComponent/AppLoader'
import { OnBoardingButton } from '../AppComponent/OnboardingButton'
import CountDownTimer from './components/CountDownTimer'


/* 
import CountDown from 'react-native-countdown-fixed'
 */

/* 
@types/react-native-countdown-fixed
*/

const VerifyCodeScreen = ({
  navigation
}: NativeStackScreenProps<authStackParamList>) => {
  const [otp, setOtp] = useState('')
  const [showOtpError, setShowOtpError] = useState(false)
  const [otpClicked, setOtpClicked] = useState(false)
  /* start call to the server to validate token obtained from mail */
  const [startApiCall, setStartApiCall] = useState(false)

  /* start call to the server to send mail to the user registered mail which contains the token */
  const [startEmailVerificationApi, setStartEmailVerificationApi] =
    useState(false)

  /* to show or hide the loader screen */
  const [loader, setLoader] = useState(false)

  /* controll sending of new mail to users mail which contains their token */
  const [resentMail, setResentMail] = useState(false)

  /* a count down timer for controlling when to active a new mail sending */
  const [resumeCounter, setResumeCounter] = useState(false)
  const [counterKey, setCounterKey] = useState(1)
 


  /* obtain params */

  const { params: { userEmail: email, token } } = useRoute<verifyCodeRouteType>()

  /* start   useMutation*/

  const sendEmailVerificationMutation = useMutation({
    mutationKey: ['sendVerificationEmaiKey'],
    mutationFn: sendVerificationEmailApi
  })

  const {
    data: userResponse,
    error,
    isError,
    isPending,
    isSuccess
  } = sendEmailVerificationMutation

  /* make a call to the server demanding for email sending to user for verification */

  useEffect(() => {
    if (isError && startEmailVerificationApi) {
      console.log('error ran in verifyCode', error)
      setLoader(false)
      let errorMessage
      if (error instanceof AxiosError && error?.response) {
        errorMessage = error?.response.data.message
      } else {
        errorMessage = error?.message
      }

      /*  const errorMessage = error?.response.date.message || error?.data */

    
      toastError({
        type: 'error',
        message: errorMessage,
        heading: 'Email Verification',
        headingColor: 'red',
        messageColor: 'red'
      })
      setLoader(false)
      setStartEmailVerificationApi(false)

      return
    }

    if (isPending && startEmailVerificationApi) {
      setLoader(true)
    }

    if (isSuccess && startEmailVerificationApi) {
      setResumeCounter(false)
      setCounterKey(counterKey + 1)
      const toastData = {
        type: 'success',
        message: userResponse.message,
        heading: 'Email Verification',
        headingColor: 'green',
        messageColor: 'green'
      }
      toastError(toastData)
      setLoader(false)
      setStartEmailVerificationApi(false)
    }
  }, [isError, isPending, isSuccess, startEmailVerificationApi])


  console.log("resendEmail:", resentMail)
  /* make apicall to send email verification */
  useEffect(() => {
    (async () => {
      try {
        console.log("code has ren here")
        setStartEmailVerificationApi(true)
        console.log("this is the token", token)
        await sendEmailVerificationMutation.mutateAsync(token)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [resentMail])

  /* mutation to send four digit token for verification */

  const sendTokenForVerification = useMutation({
    mutationKey: ['token-validation'],
    mutationFn: verifyEmailApi
  })

  const {
    data: tokenVerificationData,
    error: tokenVerificationError,
    isError: tokeVerificationIsError,
    isPending: tokeVerificationIsPending,
    isSuccess: tokenVerificationIsSuccess
  } = sendTokenForVerification

  useEffect(() => {
    if (tokeVerificationIsError && startApiCall) {
      console.log('error ran in verifyCode', tokenVerificationError)
      setLoader(false)
      let errorMessage
      if (tokenVerificationError instanceof AxiosError && tokenVerificationError?.response) {
        errorMessage = tokenVerificationError?.response.data.message
      } else {
        errorMessage = tokenVerificationError?.message
      }

      /*  const errorMessage = error?.response.date.message || error?.data */
      toastError({
        type: 'error',
        message: errorMessage,
        heading: 'Email Token Verification',
        headingColor: 'red',
        messageColor: 'red'
      })
      setLoader(false)
      setStartApiCall(false)

      return
    }

    if (tokeVerificationIsPending && startApiCall) {
      setLoader(true)
    }

    if (tokenVerificationIsSuccess && startApiCall) {
      setLoader(false)
      setStartApiCall(false)
      navigation.navigate('emailVerifiedSuccessScreen')
    }
  }, [
    startApiCall,
    tokeVerificationIsPending,
    tokeVerificationIsError,
    tokenVerificationIsSuccess
  ])

 


  const handleSubmit = async () => {
    try {
      if (otp.length !==  5) { 
        setOtpClicked(true)
        return
      }
      setOtpClicked(false)
      
      setShowOtpError(false)
      setOtpClicked(true)
      setLoader(true)
      setStartApiCall(!startApiCall)
      await sendTokenForVerification.mutateAsync({
        token: "123456",
        jwtToken: token
      })
    } catch (error: any) {
      console.log(error.message)
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
      {loader && <AppLoaderScreen />}

      {/* loader section ends */}
      <View className="mt-[8px]">
        <Header navigation={navigation} />
        {/* forgot password section starts */}

        <View className="mt-[24px]">
          <Text className="text-start  text-neutral-900 text-xl font-medium font-['Aeonik-Medium'] leading-7">
            Verify Code
          </Text>
          <Text className="w-full text-zinc-600 text-xs font-normal font-['Aeonik-Regular'] leading-tight mt-1">
            Please enter the code we just sent to  {email}
          </Text>
         
        </View>

        {/* forgot password section ends */}

        {/* otp section starts */}

        {/* otp  section ends */}

        <View className="mt-[32px]">
          <TextOTP otp={otp} setOtp={setOtp} />
          {
          showOtpError &&  <View className="mt-2 h-6 justify-center items-center">
          <Text className='text-red-500 font-ligt font-["Aeonik-Regular"] leading-4 text-normal'>
            Five digit otp is required
          </Text>
        </View>
          }
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

          <View className="flex-row items-center justify-center mt-2">
            <TouchableOpacity
              onPress={() => {
                if (resumeCounter) {
                  setResentMail(!resentMail)
                }
              }}
            >
              <Text
                className={`text-zinc-600 text-xs font-normal font-['Aeonik-Regular'] leading-tight ${
                  resumeCounter && 'text-blue-600'
                }`}
              >
                {resumeCounter ? 'Click to resend code ' : 'Resend code in'}
              </Text>
            </TouchableOpacity>
            <CountDownTimer
              key={counterKey}
              counterTime={30}
      
              resumeCounter={resumeCounter}
              setResumeCounter={setResumeCounter}
            />
          </View>
        </View>

        {/* app button ends */}
      </View>
    </SafeAreaView>
  )
}

export default VerifyCodeScreen

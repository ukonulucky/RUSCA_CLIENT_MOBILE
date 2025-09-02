import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Constants from 'expo-constants'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Header from './components/Header'
import { forgetPasswordValidationSchema } from '../../utils/YubValidation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import AppLoader from "../AppComponent/AppLoader";
import { useMutation } from '@tanstack/react-query'
import { toastError } from '../../utils/useFulFunc'
import { authStackParamList } from '../../utils/types'
import { sendUserEmailForPasswordResetApi } from '../../apiServices/authApi/authApi'
import { AxiosError } from 'axios'
import { OnBoardingButton } from '../AppComponent/OnboardingButton'

const ForgotPasswordScreen = ({
  navigation
}: NativeStackScreenProps<authStackParamList>) => {
  /* set the display of the loader */
  const [loader, setLoader] = useState(false)




  /* yup validation and react hook form */

  const formOptions = { resolver: yupResolver(forgetPasswordValidationSchema) }

  /* obtain the different state for the loginApi response */



  const [form, setForm] = useState<{
    email: string
  }>({
    email: ''
  })



  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm(formOptions)

  const onSubmit = async (data: { email: string }) => {
     try {
       setLoader(!loader);
       /* make api call for user signIn */
       const { message, error
       } = await sendUserEmailForPasswordResetApi(data);
       

       if (error ) { 
        const toastData = {
          type: 'warn',
          message: message,
          heading: 'Forgot Password',
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
           heading: 'Forgot Password',
           headingColor: 'green',
           messageColor: 'green'
         }
         toastError(toastData)
       setLoader(!loader)
       navigation.navigate("forgetPasswordVarifyCodeScreen", {
         userEmail: data.email
       })
     } catch (error) {
       setLoader(!loader)
       if ( error instanceof AxiosError && error.response) {
         const  errorMessage = error?.response.data.message || error.message
         const toastData = {
           type: 'error',
           message: errorMessage,
           heading: 'Login',
           headingColor: 'red',
           messageColor: 'red'
         }
         toastError(toastData)
       } else { 
         console.log("error", error)
         const toastData = {
           type: 'error',
           message: "Unknown Error",
           heading: 'Login',
           headingColor: 'red',
           messageColor: 'red'
         }
         toastError(toastData)
       }
     } finally {
       setLoader(false);
       setStartApiCall(false);
     }
   };

  return (
    <SafeAreaView className="flex-1 bg-white px-[20px] py-2">
      {/* loader section starts */}
      {loader && <AppLoader />}
      <View className="mt-[8px]">
        <Header navigation={navigation} />
        {/* forgot password section starts */}

        <View className="mt-[24px]">
          <Text className="text-start  text-neutral-900 text-xl font-medium font-['Aeonik-Medium'] leading-7">
            Forgot Password
          </Text>
          <Text className="w-full text-zinc-600 text-xs font-normal font-['Aeonik-Regular'] leading-tight mt-1">
            Enter your email, we will send a verification code to your email
          </Text>
        </View>

        {/* forgot password section ends */}

        {/* email section starts */}
        <View className="mt-[32px]">
          <View className="w-full ">
            <Text className="text-zinc-800 text-sm font-medium font-['Aeonik-Medium'] leading-tight">
              Email address
            </Text>
            <View className="w-full h-[65px] px-4  bg-white rounded-[19px] border border-gray-200 flex-row justify-center items-center mt-2">
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="E.g example@gmail.com"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    className="flex-1 text-zinc-600  font-bold w-full"
                    cursorColor={'gray'}
                    keyboardType="email-address"
                  />
                )}
                name={'email'}
              />
            </View>
          </View>
          <View className="mt-2 h-6">
            {errors.email && (
              <Text className='text-red-500 font-ligt font-["Aeonik-Regular"]'>
                {errors.email.message}
              </Text>
            )}
          </View>
        </View>

        {/* email section ends */}

        {/* app button starts */}

        <View className="w-full  items-center">
          <OnBoardingButton
            disabled={loader}
            buttonContainerStyles="w-full h-[67px] mt-[32px] px-8 py-2.5 bg-blue-950 rounded-[19px] justify-center items-center"
            buttonTextStyle="text-center text-white text-base font-medium font-['Aeonik-Medium'] leading-tight"
            buttonText="Send Verification Code"
            onPress={handleSubmit(onSubmit)}
          />
        </View>

        {/* app button ends */}
      </View>
    </SafeAreaView>
  )
}

export default ForgotPasswordScreen

import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Header from './components/Header'
import { newPasswordValidationSchema } from '../../utils/YubValidation'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { authStackParamList, newPasswordRouteType } from '../../utils/types'
import { useMutation } from '@tanstack/react-query'
import { resetUserPasswordApi } from '../../apiServices/authApi/authApi'
import { toastError } from '../../utils/useFulFunc'
import { useRoute } from '@react-navigation/native'
import { AxiosError } from 'axios'
import AppLoaderScreen from '../AppComponent/AppLoader'
import { OnBoardingButton } from '../AppComponent/OnboardingButton'


const NewPasswordScreen = ({
  navigation
}: NativeStackScreenProps<authStackParamList>) => {
  const [hidePassword, sethidePassword] = useState(false)

  const [hidePassword2, sethidePassword2] = useState(false)

  const [startApiCall, setStartApiCall] = useState(false)

  const [loader, setLoader] = useState(false)


  const { params: {email, token} } = useRoute<newPasswordRouteType>()
  /* yup validation and react hook form */

  const formOptions = { resolver: yupResolver(newPasswordValidationSchema) }

  const [form, setForm] = useState<{
    newPassword: string
    confirmNewPassword: string
  }>({
    newPassword: '',
    confirmNewPassword: ''
  })

  /* mutation to send five digit token for verification */
  
   const resetUserPassword = useMutation({
    mutationKey: ['resetUserPasswordApiKey'],
    mutationFn: resetUserPasswordApi
  })
  
  const {
    data: userResponse,
    error,
    isError,
    isPending,
    isSuccess
  } =  resetUserPassword

  /* make apicall to server  */


  
  useEffect(() => {
    if (isError && startApiCall) {
      setLoader(false)
      setStartApiCall(false)
      let errorMessage
      if ( error instanceof AxiosError && error?.response) {
        errorMessage = error?.response.data.message
      } else {
        errorMessage = error?.message
      }

      toastError({
        type: 'error',
        message: errorMessage,
        heading: 'Password Change',
        headingColor: 'red',
        messageColor: 'red'
      })
      setStartApiCall(false)
      setLoader(false)

      return
    }

    if (isPending && startApiCall) {
      setLoader(true)
    }

    if (isSuccess && startApiCall) {
      toastError({
        type: 'success',
        message: userResponse.message,
        heading: 'Password Change',
        headingColor: 'green',
        messageColor: 'green'
      })

      setLoader(false)
      setStartApiCall(false)
      
      navigation.navigate('passwordChangeSuccessScreen')
    }
  }, [isError, isPending, isSuccess, startApiCall])





  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm(formOptions)

  const onSubmit = async (data: { newPassword: string }) => {
    try {
      setStartApiCall(!startApiCall)
        await resetUserPassword.mutateAsync({
          email,
          token,
          password: data.newPassword
        })
    } catch (error: any) {
      console.log(error.message)
    }
  }






  return (
    <SafeAreaView className="flex-1 bg-white px-[20px] py-2">
        {/* loader section starts */}
        {loader && <AppLoaderScreen />}
      {/* loader section ends */}
      <View className="mt-[8px]">
        <Header navigation={ navigation } />
        {/* forgot password section starts */}

        <View className="mt-[24px]">
          <Text className="text-start  text-neutral-900 text-xl font-medium font-['Aeonik-Medium'] leading-7">
            New Password
          </Text>
          <Text className="w-full text-zinc-600 text-xs font-normal font-['Aeonik-Regular'] leading-tight mt-1">
            Create a new password that is safe and easy to remember
          </Text>
        </View>

        {/* newpassword section starts */}
        <View className="w-full mt-[15px]">
          <Text className="text-zinc-800 text-sm font-medium font-['Aeonik-Medium'] leading-tight">
            New Password
          </Text>
          <View className="w-full h-[65px] px-4  bg-white rounded-[19px] border border-gray-200 flex-row justify-center items-center mt-2">
            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Enter password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="flex-1 text-zinc-600  font-bold w-full"
                  cursorColor={'gray'}
                  secureTextEntry={hidePassword ? true : false}
                  inputMode="text"
                />
              )}
              name={'newPassword'}
            />

            <TouchableOpacity onPress={() => sethidePassword(!hidePassword)}>
              <Text className="text-blue-950 text-[13px] font-medium font-['Aeonik-Medium'] leading-tight">
                {hidePassword ? 'Show' : 'Hide'}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="">
            {errors.newPassword && (
              <View className="mt-2 h-6">
                <Text className='flex-1 text-red-500 mt-2 h-6 font-light w-full font-["Aeonik-Regular"]'>
                  {errors.newPassword.message}
                </Text>
              </View>
            )}
          </View>
        </View>
        {/* newpassword section ends */}

        {/* confirm newpassword section starts */}
        <View className="w-full mt-[15px]">
          <Text className="text-zinc-800 text-sm font-medium font-['Aeonik-Medium'] leading-tight">
            Confirm New Password
          </Text>
          <View className="w-full h-[65px] px-4  bg-white rounded-[19px] border border-gray-200 flex-row justify-center items-center mt-2">
            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Enter password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="flex-1 text-zinc-600  font-bold w-full"
                  cursorColor={'gray'}
                  secureTextEntry={hidePassword ? true : false}
                  inputMode="text"
                />
              )}
              name={'confirmPassword'}
            />

            <TouchableOpacity onPress={() => sethidePassword(!hidePassword2)}>
              <Text className="text-blue-950 text-[13px] font-medium font-['Aeonik-Medium'] leading-tight">
                {hidePassword2 ? 'Show' : 'Hide'}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="">
            {errors.confirmPassword && (
              <View className="mt-2 h-6">
                <Text className='flex-1 text-red-500 mt-2 h-6 font-light w-full font-["Aeonik-Regular"]'>
                  {errors.confirmPassword.message}
                </Text>
              </View>
            )}
          </View>
        </View>
        {/* confirm newpassword section ends */}

        {/* app button starts */}

        <View className="w-full  items-center">
          <OnBoardingButton
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

export default NewPasswordScreen

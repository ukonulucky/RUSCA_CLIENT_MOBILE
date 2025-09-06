import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validationSchemaSignUp } from "../../utils/YubValidation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppButton } from "../AppComponent/AppButton";
import PhoneNumberValidiation from "./components/PhoneNumberValidiation";
import { authStackParamList, signUpFormStateProp } from "../../utils/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CheckBox, Icon } from "react-native-elements";
import {  registerApi } from "../../apiServices/authApi/authApi";
import { toastError } from "../../utils/useFulFunc";
import AppLoader from "../AppComponent/AppLoader";

import { useAppDispatch } from "../../redux/store/store";
import { AxiosError } from "axios";

const SignUpScreen = ({
  navigation,
}: NativeStackScreenProps<authStackParamList>) => {



  /* set the display of the loader */
  const [loader, setLoader] = useState(false);


  const [hidePassword, sethidePassword] = useState(false);

  /* yup validation and react hook form */

  const formOptions = { resolver: yupResolver(validationSchemaSignUp) };

  /* phone number state  starts*/
  const [phoneValue, setPhoneValue] = useState<string>("");
  const [formattedValue, setFormattedValue] = useState<string>("");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(false);
  /* phone number state ends */

  const [isChecked, setIsChecked] = useState(false);

  /* check the box */
  const toggleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const [form, setForm] = useState<signUpFormStateProp>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: ""
  });


 
 const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  /* section to login the user into the app just after registration */
  const onSubmit = async (data: signUpFormStateProp) => {
  
    try {
      setLoader(!loader);
      /* make api call for user signIn */
      const { message } = await registerApi(data);
  
      // store user data to device storage
        const toastData = {
          type: 'success',
          message: message,
          heading: 'Register',
          headingColor: 'green',
          messageColor: 'green'
        }
        toastError(toastData)
      setLoader(!loader)
      setForm({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        role: ""
      })
      navigation.navigate("signInScreen")
    } catch (error) {
      setLoader(!loader)
      if ( error instanceof AxiosError && error.response) {
        const  errorMessage = error?.response.data.message || error.message
        const toastData = {
          type: 'error',
          message: errorMessage,
          heading: 'Register',
          headingColor: 'red',
          messageColor: 'red'
        }
        toastError(toastData)
       } else { 
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

    }
  };
 
  return (
    <SafeAreaView className="px-[20px] bg-white pb-4 flex-1">
      {/* loader section starts */}
      {loader && <AppLoader />}

      {/* loader section ends */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className=" bg-white mt-4 mb-[30px]">
          <Image
            source={require("../../assets/images/icon.png")}
            className="w-[100px] h-[100px]"
            resizeMode="contain"
          />
        </View>
        <View className="pb-4">
          <Text
            style={{
              fontFamily: "Aeonik-Medium",
            }}
            className="text-neutral-900 text-2xl font-medium leading-tight"
          >
            SignUp
          </Text>
          <Text className="text-zinc-600 text-sm font-medium font-['Aeonik-Medium'] leading-tight">
            Singup For A Rusca Account
          </Text>
        </View>

        {/* form section starts */}

        <KeyboardAwareScrollView>
          {/* full name start */}

          <View>
            <View className="w-full mt-[25px]">
              <Text className="text-zinc-800 text-sm font-medium font-['Aeonik-Medium'] leading-tight">
                Full Name
              </Text>
              <View className="w-full h-[65px] px-4  bg-white rounded-[19px] border border-gray-200 flex-row justify-center items-center mt-2">
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="E.g John Dove"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      className="flex-1 text-zinc-600  font-bold w-full"
                      cursorColor={"gray"}
                      keyboardType="default"
                    />
                  )}
                  name={"fullName"}
                />
              </View>
            </View>
            <View>
              {errors.fullName && (
                <View className="mt-2 h-6">
                  <Text className='text-red-500 font-ligt font-["Aeonik-Regular"]'>
                    {errors.fullName.message}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* full name */}
          {/* email section starts */}
          <View className="mt-[15px]">
            <View className="w-full ">
              <Text className="text-zinc-800 text-sm font-medium font-['Aeonik-Medium'] leading-tight">
                Email address
              </Text>
              <View className="w-full h-[65px] px-4  bg-white rounded-[19px] border border-gray-200 flex-row justify-center items-center mt-2">
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="E.g example@gmail.com"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      className="flex-1 text-zinc-600  font-bold w-full"
                      cursorColor={"gray"}
                      keyboardType="email-address"
                    />
                  )}
                  name={"email"}
                />
              </View>
            </View>
            <View>
              {errors.email && (
                <View className="mt-2 h-6">
                  <Text className='text-red-500 font-ligt font-["Aeonik-Regular"]'>
                    {errors.email.message}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* email section ends */}

          {/* phone number section starts */}

          <View className="mt-[15px]">
            <Text className="text-zinc-800 text-sm font-medium font-['Aeonik-Medium'] leading-tight">
              Phone number
            </Text>

            <View className="w-full mt-[15px]">
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <PhoneNumberValidiation
                    setPhoneValue={setPhoneValue}
                    setFormattedValue={setFormattedValue}
                    setIsPhoneNumberValid={setIsPhoneNumberValid}
                    phoneValue={phoneValue}
                    setForm={setForm}
                    form={form}
                    onChange={onChange}
                  />
                )}
                name={"phone"}
              />
            </View>
            <View className="w-full mt-2">
              {errors.phone ? (
                <View className="w-full mt-2 h-6">
                  <Text className='text-red-500 font-ligt font-["Aeonik-Regular"]'>
                    {errors.phone.message}
                  </Text>
                </View>
              ) : !isPhoneNumberValid && form.phone ? (
                <View>
                  <Text className='text-red-500 font-["Aeonik-Regular"]'>
                    Inavalid Phone number
                  </Text>
                </View>
              ) : (
                ""
              )}
            </View>
          </View>

          {/* phone number section ends */}

          {/* password section starts */}
          <View className="w-full mt-[15px]">
            <Text className="text-zinc-800 text-sm font-medium font-['Aeonik-Medium'] leading-tight">
              Password
            </Text>
            <View className="w-full h-[65px] px-4  bg-white rounded-[19px] border border-gray-200 flex-row justify-center items-center mt-2">
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Enter password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    className="flex-1 text-zinc-600  font-bold w-full"
                    cursorColor={"gray"}
                    secureTextEntry={hidePassword ? true : false}
                    inputMode="text"
                  />
                )}
                name={"password"}
              />

              <TouchableOpacity onPress={() => sethidePassword(!hidePassword)}>
                <Text className="text-blue-950 text-[13px] font-medium font-['Aeonik-Medium'] leading-tight">
                  {hidePassword ? "Show" : "Hide"}
                </Text>
              </TouchableOpacity>
            </View>

            <View className="mt-2 h-6">
              {errors.password && (
                <Text className='flex-1 text-red-500  font-light w-full font-["Aeonik-Regular"]'>
                  {errors.password.message}
                </Text>
              )}
            </View>
          </View>
          {/* password section ends */}
        </KeyboardAwareScrollView>

        <View className="flex-row items-start ">
          <View className="">
            <CheckBox
              containerStyle={[
                styles.checkBoxButton,
                styles.checkBoxWrapperStlye,
              ]}
              checked={isChecked}
              checkedIcon={
                <Icon
                  name="radio-button-checked"
                  type="material"
                  color="#1F205D"
                  size={20}
                />
              }
              uncheckedIcon={
                <Icon
                  name="radio-button-unchecked"
                  type="material"
                  color="grey"
                  size={20}
                />
              }
              onPress={toggleCheckBox}
            />
          </View>
          <View className="flex-row w-full flex-wrap flex-1">
            <Text className="text-zinc-600 text-[13px] font-medium font-['Aeonik-Regular'] leading-[20px]">
              By continuing you agree to the{" "}
            </Text>
            <TouchableOpacity onPress={() => console.log(`now`)}>
              <Text className="text-orange-500 text-[13px] font-medium font-['Aeonik-Medium'] leading-[20px]">
                Term of Service{" "}
              </Text>
            </TouchableOpacity>
            <Text className="text-zinc-600 text-[13px] font-medium font-['Aeonik-Regular'] leading-[20px]">
              and{" "}
            </Text>
            <TouchableOpacity>
              <Text className="text-orange-500 text-[13px] font-medium font-['Aeonik-Medium'] leading-[20px] ">
                Privacy Policy{" "}
              </Text>
            </TouchableOpacity>

            <Text className="text-zinc-600 text-[13px] font-medium font-['Aeonik-Regular'] leading-[20px]">
              of Rusca{" "}
            </Text>

            <Text className="text-zinc-600 text-[13px] font-medium font-['Aeonik-Regular'] leading-[20px]">
               Bank
            </Text>
          </View>
        </View>

        {/* button section starts */}

        <View className="w-full mt-8 items-center">
          <AppButton
            disabled={!isChecked}
            buttonContainerStyles={`w-full h-[67px] px-8 py-2.5 ${
              !isChecked ? "opacity-70 bg-blue-950" : "bg-blue-950"
            } rounded-[19px] justify-center items-center inline-flex`}
            buttonTextStyle="text-center text-white text-base font-medium font-['Aeonik-Medium'] leading-tight"
            buttonText="Create new account"
            onPress={handleSubmit(onSubmit)}
          />
        </View>

        {/* button section ends */}

        <View className="text-center justify-center flex-row mt-4 mb-6">
          <Text className="text-gray-500 text-sm font-medium font-['Aeonik-Medium'] leading-tight">
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("signInScreen")}>
            <Text className="text-blue-950 text-sm font-medium font-['Aeonik-Medium'] leading-tight">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
        {/* form section ends */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  checkBoxButton: {
    padding: 0,
  },
  checkBoxWrapperStlye: {
    alignItems: "center",
    padding: 0,
  },
});

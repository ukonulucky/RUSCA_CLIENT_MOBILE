import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validationSchemaSignIn } from "../../utils/YubValidation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppButton } from "../AppComponent/AppButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { authStackParamList } from "../../utils/types";
import { useAppDispatch } from "../../redux/store/store";
import AppLoader from "../AppComponent/AppLoader";
import { loginApi } from "../../apiServices/authApi/authApi";
import { toastError } from "../../utils/useFulFunc";

import { AxiosError } from "axios";
import {
  logInLogOutAction,
  userLoggedInAndLoggedOutAction,
} from "redux/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInScreen = ({
  navigation,
}: NativeStackScreenProps<authStackParamList>) => {
  /* set the display of the loader */
  const [loader, setLoader] = useState(false);

  const [hidePassword, sethidePassword] = useState(false);

  const dispatch = useAppDispatch();

  /* yup validation and react hook form */

  const formOptions = { resolver: yupResolver(validationSchemaSignIn) };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);
  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      setLoader(!loader);
      /* make api call for user signIn */
      const {
        message,
        token,
        user: { _id, email, fullName, role, phone, email_verified },
      } = await loginApi(data);
      if (!email_verified) {
        Alert.alert("Email Not Verified", "Please check your mail to verifiy.");
        const toastData = {
          type: "success",
          message: message,
          heading: "Login",
          headingColor: "green",
          messageColor: "green",
        };
        toastError(toastData);
        setLoader(!loader);
        return;
      }
      dispatch(
        userLoggedInAndLoggedOutAction({
          _id,
          email,
          fullname: fullName,
          phone,
          role,
          token,
        })
      );
      dispatch(logInLogOutAction(true));

      const toastData = {
        type: "success",
        message: message,
        heading: "Login",
        headingColor: "green",
        messageColor: "green",
      };
      toastError(toastData);
      setLoader(!loader);
    } catch (error) {
      setLoader(!loader);
      if (error instanceof AxiosError && error.response) {
        const errorMessage = error?.response.data.message || error.message;
        const toastData = {
          type: "error",
          message: errorMessage,
          heading: "Login",
          headingColor: "red",
          messageColor: "red",
        };
        toastError(toastData);
      } else {
        console.log("error", error);
        const toastData = {
          type: "error",
          message: "Unknown Error",
          heading: "Login",
          headingColor: "red",
          messageColor: "red",
        };
        toastError(toastData);
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <SafeAreaView className="px-[20px]  flex-1 r">
      {/* loader section starts */}
      {loader && <AppLoader />}
      {/* loader section ends */}
      {/* dialog box to display when the user email is not verified and give the user option to verify his email */}

      <View className="absolute top-[43px] left-[15px] bg-red-500 ">
        <Image
          source={require("../../assets/images/icon.png")}
          className="w-[100px] h-[100px]"
          resizeMode="contain"
        />
      </View>
      <View className="mt-[140px] pb-2 ">
        <Text
          style={{
            fontFamily: "Aeonik-Medium",
          }}
          className="text-neutral-900 text-2xl font-medium leading-tight"
        >
          Hello Again!
        </Text>
        <Text className="text-zinc-600 text-sm font-medium font-['Aeonik-Medium'] leading-tight">
          Sign In to your account{" "}
        </Text>
      </View>

      {/* form section starts */}

      <KeyboardAwareScrollView>
        {/* email section starts */}
        <View className="w-full mt-[32px]">
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
                  placeholder="E.g examplegmail.com"
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
              <Text className="flex-1 text-red-600  font-bold w-full">
                {errors.email.message}
              </Text>
            </View>
          )}
        </View>

        {/* email section ends */}

        {/* password section starts */}
        <View className="w-full mt-[25px]">
          <View className="flex-row justify-between">
            <Text className="text-zinc-800 text-sm font-medium font-['Aeonik-Medium'] leading-tight">
              Password
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("forgotPasswordScreen")}
            >
              <Text className="text-gray-500 text-sm font-medium font-['Aeonik-Medium'] leading-tight">
                Forgot password?{" "}
              </Text>
            </TouchableOpacity>
          </View>
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
        </View>
        <View>
          {errors.password && (
            <View className="mt-2 h-6">
              <Text className="flex-1 text-red-600  font-bold w-full">
                {errors.password.message}
              </Text>
            </View>
          )}
        </View>

        {/* password section ends */}

        {/* button section starts */}

        <View className="w-full mt-8 items-center">
          <AppButton
            disabled={loader}
            buttonContainerStyles="w-full h-[67px] px-8 py-2.5 bg-blue-950 rounded-[19px] justify-center items-center inline-flex"
            buttonTextStyle="text-center text-white text-base font-medium font-['Aeonik-Medium'] leading-tight"
            buttonText="Sign In"
            onPress={handleSubmit(onSubmit)}
          />
        </View>

        <View className="text-center flex-row items-center justify-center mt-4">
          <Text className="text-gray-500 text-sm font-medium font-['Aeonik-Medium'] leading-tight">
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("signUpScreen")}>
            <Text className="text-blue-950 text-sm font-medium font-['Aeonik-Medium'] leading-tight">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      {/* button section ends */}

      {/* form section ends */}
    </SafeAreaView>
  );
};

export default SignInScreen;

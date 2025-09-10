import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validationSchemaCreateGroup } from "../../utils/YubValidation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppButton } from "../AppComponent/AppButton";

import {
  createGroupFormStateProp,
  signUpFormStateProp,
} from "../../utils/types";
import { createGroupApi, registerApi } from "../../apiServices/authApi/authApi";
import { toastError } from "../../utils/useFulFunc";
import AppLoader from "../AppComponent/AppLoader";

import { AxiosError } from "axios";
import { useAppSelector } from "redux/store/store";

const CreateGroupScreen = () => {
  /* set the display of the loader */
  const [loader, setLoader] = useState(false);

  /* yup validation and react hook form */

  const formOptions = { resolver: yupResolver(validationSchemaCreateGroup) };

  const [form, setForm] = useState<createGroupFormStateProp>({
    groupName: "",
    monthlyContribution: "",
    numberOfMembers: "",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);
  const { _id, token } = useAppSelector(
    (state) => state.authReducer.userProfile.userData!
  );

  /* section to login the user into the app just after registration */
  const onSubmit = async (data: createGroupFormStateProp) => {
    try {
      setLoader(!loader);
      /* make api call for user signIn */
      const newData = { ...data, userId: _id, jwtToken: token };
      const { message } = await createGroupApi(newData);

      // store user data to device storage
      const toastData = {
        type: "success",
        message: message,
        heading: "Register",
        headingColor: "green",
        messageColor: "green",
      };
      toastError(toastData);
      setLoader(!loader);
      setForm({
        groupName: "",
        monthlyContribution: "",
        numberOfMembers: "",
      });
    } catch (error) {
      console.log("error", error)
      setLoader(!loader);
      if (error instanceof AxiosError && error.response) {
        const errorMessage = error?.response.data.message || error.message;
        const toastData = {
          type: "error",
          message: errorMessage,
          heading: "Create group",
          headingColor: "red",
          messageColor: "red",
        };
        toastError(toastData);
      } else {
        const toastData = {
          type: "error",
          message: "Unknown Error",
          heading: "Create group",
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
            Create Group
          </Text>
        </View>

        {/* form section starts */}

        <KeyboardAwareScrollView>
          {/* group name start */}
          <View>
            <View className="w-full mt-[25px]">
              <Text className="text-zinc-800 text-sm font-medium font-['Aeonik-Medium'] leading-tight">
                Group Name
              </Text>
              <View className="w-full h-[65px] px-4  bg-white rounded-[19px] border border-gray-200 flex-row justify-center items-center mt-2">
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Enter group name"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      className="flex-1 text-zinc-600  font-bold w-full"
                      cursorColor={"gray"}
                      keyboardType="default"
                    />
                  )}
                  name={"groupName"}
                />
              </View>
            </View>
            <View>
              {errors.groupName && (
                <View className="mt-2 h-6">
                  <Text className='text-red-500 font-ligt font-["Aeonik-Regular"]'>
                    {errors.groupName.message}
                  </Text>
                </View>
              )}
            </View>
          </View>
          {/* group name */}

          {/* Number of members section starts */}
          <View className="mt-[15px]">
            <View className="w-full ">
              <Text className="text-zinc-800 text-sm font-medium font-['Aeonik-Medium'] leading-tight">
                Number Of Members
              </Text>
              <View className="w-full h-[65px] px-4  bg-white rounded-[19px] border border-gray-200 flex-row justify-center items-center mt-2">
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Enter members number"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      className="flex-1 text-zinc-600  font-bold w-full"
                      cursorColor={"gray"}
                      keyboardType="number-pad"
                    />
                  )}
                  name={"numberOfMembers"}
                />
              </View>
            </View>
            <View>
              {errors.numberOfMembers && (
                <View className="mt-2 h-6">
                  <Text className='text-red-500 font-ligt font-["Aeonik-Regular"]'>
                    {errors.numberOfMembers.message}
                  </Text>
                </View>
              )}
            </View>
          </View>
          {/* Number of members section ends */}

          {/* montly contribution section starts */}
          <View className="w-full mt-[15px]">
            <Text className="text-zinc-800 text-sm font-medium font-['Aeonik-Medium'] leading-tight">
              Monthly Contribution
            </Text>
            <View className="w-full h-[65px] px-4  bg-white rounded-[19px] border border-gray-200 flex-row justify-center items-center mt-2">
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Enter amount"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    className="flex-1 text-zinc-600  font-bold w-full"
                    cursorColor={"gray"}
                    keyboardType="number-pad"
                  />
                )}
                name={"monthlyContribution"}
              />
            </View>

            <View className="mt-2 h-6">
              {errors.monthlyContribution && (
                <Text className='flex-1 text-red-500  font-light w-full font-["Aeonik-Regular"]'>
                  {errors.monthlyContribution.message}
                </Text>
              )}
            </View>
          </View>
          {/* montly contribution section ends */}
        </KeyboardAwareScrollView>

        {/* button section starts */}
        <View className="w-full mt-8 items-center">
          <AppButton
            buttonContainerStyles={`w-full h-[67px] px-8 py-2.5 bg-blue-950 rounded-[19px] justify-center items-center inline-flex`}
            buttonTextStyle="text-center text-white text-base font-medium font-['Aeonik-Medium'] leading-tight"
            buttonText="Create new group"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
        {/* button section ends */}

        {/* form section ends */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateGroupScreen;

const styles = StyleSheet.create({
  checkBoxButton: {
    padding: 0,
  },
  checkBoxWrapperStlye: {
    alignItems: "center",
    padding: 0,
  },
});

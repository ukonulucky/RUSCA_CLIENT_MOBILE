import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { authStackParamList } from "../../utils/types";
import { OnBoardingButton } from "../AppComponent/OnboardingButton";

const EmailVerifiedSuccessScreen = ({
  navigation,
}: NativeStackScreenProps<authStackParamList>) => {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center px-[20px]">
      <View className="justify-center items-center w-full">
        <View className="w-[140px] h-[140px] bg-green-50 rounded-full justify-center items-center">
          <Image
            source={require("../../assets/images/success.png")}
            className="w-[67.03px] h-[67.03px]"
          />
        </View>
        <View className="w-[279px] h-[76px] flex-col justify-center items-center gap-2 inline-flex mt-[37px]">
          <Text className="text-center text-neutral-900 text-xl font-medium font-['Aeonik-Medium'] leading-7">
            Email Verified
          </Text>
          <Text className="w-[279px] text-center text-zinc-600 text-xs font-normal font-['Aeonik-Regular'] leading-tight">
            Your email address has been verified successfully. Continue to you
            dashboard
          </Text>
        </View>
        <View className="w-full  items-center mt-[32px]">
          <OnBoardingButton
            buttonContainerStyles="w-full h-[67px]  px-8 py-2.5 bg-blue-950 rounded-[19px] justify-center items-center"
            buttonTextStyle="text-center text-white text-base font-medium font-['Aeonik-Medium'] leading-tight"
            buttonText="Okay, Proceed to Sign in"
            onPress={() => navigation.navigate("signInScreen")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmailVerifiedSuccessScreen;

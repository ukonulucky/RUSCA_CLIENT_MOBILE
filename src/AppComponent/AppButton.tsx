import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  OnBoardingButtonPropType,
  OnboardingProgressComponentPropTypes,
} from "../../utils/types";

export const OnboardingProgressComponent = ({
  active,
}: OnboardingProgressComponentPropTypes) => {
  return (
    <View
      className={`${
        !active
          ? `w-3.5 h-[5px] bg-gray-300 ml-2 rounded-[100px]`
          : `w-[30px] h-[5px] bg-orange-500 rounded-[100px] ml-2`
      }`}
    />
  );
};

export const AppButton = ({
  buttonTextStyle,
  buttonContainerStyles,
  buttonText,
  onPress,
  disabled = false,
}: OnBoardingButtonPropType) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      className={buttonContainerStyles}
      onPress={onPress}
    >
      <Text className={buttonTextStyle}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

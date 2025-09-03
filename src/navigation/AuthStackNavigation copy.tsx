import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../authScreens/SignInScreen";
import SignUpScreen from "../authScreens/SignUpScreen";
import { authStackParamList } from "../../utils/types";
import EmailVerifiedSuccessScreen from "../authScreens/EmailVerifiedSuccessScreen";
import ForgotPasswordScreen from "../authScreens/ForgotPasswordScreen";
import ForgetPasswordVarifyCodeScreen from "../authScreens/ForgotPasswordVerifyCodeAScreen";
import NewPasswordScreen from "../authScreens/NewPasswordScreen";
import PasswordChangeScreen from "../authScreens/PasswordChangeScreen";
import PasswordChangeSuccessScreen from "../authScreens/PasswordChangeSuccessScreen";
import VerifyCodeScreen from "../authScreens/VerifyCodeScreen";

const AuthStackNavigation = () => {
  const Stack = createNativeStackNavigator<authStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="signInScreen"
    >
      <Stack.Screen name="signInScreen" component={SignInScreen} />

      <Stack.Screen name="signUpScreen" component={SignUpScreen} />
      <Stack.Screen
        name="emailVerifiedSuccessScreen"
        component={EmailVerifiedSuccessScreen}
      />
      <Stack.Screen
        name="forgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name="forgetPasswordVarifyCodeScreen"
        component={ForgetPasswordVarifyCodeScreen}
      />
      <Stack.Screen name="newPasswordScreen" component={NewPasswordScreen} />
      <Stack.Screen
        name="passwordChangeScreen"
        component={PasswordChangeScreen}
      />
      <Stack.Screen
        name="passwordChangeSuccessScreen"
        component={PasswordChangeSuccessScreen}
      />
      <Stack.Screen name="verifyCodeScreen" component={VerifyCodeScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigation;

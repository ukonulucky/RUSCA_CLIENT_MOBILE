import React, { useCallback, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { Button } from "react-native-elements";
import { useStripe } from "@stripe/stripe-react-native";

import { allMembersWithContributionType, paymentType } from "utils/types";
import { useAppSelector } from "redux/store/store";

import { makePaymentApi } from "../../apiServices/paymentApi/paymentApi";
import { AxiosError } from "axios";
import { toastError } from "utils/useFulFunc";
import { useFocusEffect } from "@react-navigation/native";

const MakePayMent = ({ email, amount, name, groupId, navigation, status
 }: paymentType) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [startApiCall, setStartApiCAll] = useState(true);
  console.log("amount paid",email, amount, name )

  // check if user has already paid
  const userPaymentData = useAppSelector(state => state.memberReducer.membersWithContribution)
  

  const {
    _id: userId,
    fullname,
    token
  } = useAppSelector((state) => state.authReducer.userProfile.userData!);


  const selectedGroup = useAppSelector(state => state.groupReducer.selectedGroupId)
  const hasUserPeyed = userPaymentData.filter((data: any) => { 
    console.log("userId in loop", userId)
    console.log("id:", data.userId,"contribution array:", data.contribution)
         return data.userId === userId && data.groupId === selectedGroup
  }) as any[]

 console.log("userPaymentData",userPaymentData)
  console.log("hasUserPayed now dfomr payment:", hasUserPeyed)
 


  // iniciate payment from the server

  const InitiatePaymentFromServer = async (data: {
    amount: number;
    email: string;
    name: string;
    userId: string;
    groupId: string;
    fullName: string;
    jwtToken: string;
  }): Promise<{
    paymentIntentSecret: string;
    ephemeralKeySecret: string;
    customerId: string;
  }> => {

    const res = await makePaymentApi({
      ...data,
      amount: data.amount.toString(),
      jwtToken: data.jwtToken,
    });
    console.log("res sent", res);
    return res;
  };



  const InitiatePaymentFromClient = async () => {
    try {
      const result = await InitiatePaymentFromServer({
        amount,
        email,
        name,
        userId,
        groupId,
        fullName: fullname,
        jwtToken: token,
      });

      const { paymentIntentSecret, ephemeralKeySecret, customerId } = result!;

      const { error } = await initPaymentSheet({
        merchantDisplayName: "Rusca bank",
        customerId: customerId,
        paymentIntentClientSecret: paymentIntentSecret,
        customerEphemeralKeySecret: ephemeralKeySecret,
        allowsDelayedPaymentMethods: true,
      });
      if (!error) {
        setLoading(true);
        console.log("no error ");
      }
    } catch (error) {
       setLoading(!loading);
                if (error instanceof AxiosError && error.response) {
                  const errorMessage = error?.response.data.message || error.message;
                  const toastData = {
                    type: "error",
                    message: errorMessage,
                    heading: "Payment",
                    headingColor: "red",
                    messageColor: "red",
                  };
                  toastError(toastData);
                } else {
                  console.log("error", error);
                  const toastData = {
                    type: "error",
                    message: "Unknown Error",
                    heading: "Payment",
                    headingColor: "red",
                    messageColor: "red",
                  };
                  toastError(toastData);
                }
      Alert.alert("Payment Error", "Error processing payment");
    }
  };


  
  // Initialize Stripe Payment Configuration

  useFocusEffect(
    useCallback(() => {
      // This will run each time the screen is focused
      console.log('Screen is focused');
      if(hasUserPeyed[0].contribution?.length !== 0  || hasUserPeyed[0].status === "pending") return

      InitiatePaymentFromClient()

    }, []))
 

  // Function to handle payment
  const handlePayment = async () => {
    const { error, paymentOption } = await presentPaymentSheet();
    if (error) {
      console.error("Payment failed at present:", error);
      Alert.alert("Payment Error", "Error processing payment");
      setStartApiCAll(!startApiCall)
     
    } else {
      console.log("Payment successful!", paymentOption);
      navigation.navigate("paymentSuccessScreen")
    }
  };

  return (
    <View>
      <Button
        disabled={ 
          hasUserPeyed[0]?.status === "pending" ? true : hasUserPeyed[0].contribution?.length !== 0 ? true : false
        }
        title={ 
          hasUserPeyed[0].contribution?.length !== 0  ? "Payment Made" : hasUserPeyed[0]?.status === "pending" ? "Pending..Awaiting Admin Permision" : "Make Contribution"
        }
        onPress={() => handlePayment()}
        buttonStyle={{
          backgroundColor: "#3498db",
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}
        titleStyle={{
          color: "white",
          fontSize: 18,
          fontWeight: "bold",
        }}
      />
    </View>
  );
};

export default MakePayMent;

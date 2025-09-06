import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { Button } from "react-native-elements"
import { useStripe } from '@stripe/stripe-react-native';
import { makePaymentApi } from 'apiServices/userApi/userApi';
import { paymentType } from 'utils/types';



const MakePayMent = ({ 
  email, amount, name,userId, groupId
}:  paymentType) => {
  const { initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false)


  // iniciate payment from the server
  
  const InitiatePaymentFromServer = async ( data: {
    amount: number,
    email: string,
    name: string
    userId: string,
    groupId: string
  }): Promise<{
    paymentIntentSecret: string,
    ephemeralKeySecret: string,
    customerId: string
  }> => { 
console.log("data setnt", data)
  
  
    const res = await makePaymentApi({
      ...data, amount: data.amount.toString()
    })
    console.log("res sent",res)
    return res
  }

  const InitiatePaymentFromClient = async () => { 
    try {
     
  const result = await InitiatePaymentFromServer({
    amount,
    email,
    name,
    userId,
    groupId
  })

    
  const { 
    paymentIntentSecret,
    ephemeralKeySecret,
    customerId,
  } = result!
 
  const {  error   } = await initPaymentSheet({
    merchantDisplayName: "Rusca bank",
    customerId: customerId,
    paymentIntentClientSecret: paymentIntentSecret,
    customerEphemeralKeySecret: ephemeralKeySecret,
    allowsDelayedPaymentMethods: true,
    
  })
      if (!error) {
        
    setLoading(true)
    console.log("no error ")
    
  } 
    } catch (error) {
      console.log(error)
  setLoading(!loading)
  Alert.alert("Payment Error", "Error processing payment")
}
    
  }

  
  // Initialize Stripe Payment Configuration
 
  useEffect(() => {
    InitiatePaymentFromClient()
  }, [])




  // Function to handle payment
  const handlePayment = async () => {
    const { error, paymentOption} = await presentPaymentSheet();
    if (error) {
      console.error('Payment failed at present:', error);
      Alert.alert("Payment Error", "Error processing payment")
    } else {
      console.log('Payment successful!', paymentOption)
      Alert.alert("Payment Status", "Payment successful")
    }
  };

  return (
    <View>
      <Button            
    title="Make Contribution"
    onPress={() => handlePayment()}
        buttonStyle={{
                backgroundColor: '#3498db', 
                borderRadius: 10, 
                paddingVertical: 10, 
                paddingHorizontal: 20
              }}
              titleStyle={{
                color: 'white', 
                fontSize: 18, 
                fontWeight: 'bold'
              }}
  />
    </View>
  );
};

export default MakePayMent;

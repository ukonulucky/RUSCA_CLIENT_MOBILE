import React, { useEffect, useState } from 'react';
import { Button, Text, View, TextInput, Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import * as Linking from "expo-linking"


const MakePayMent = () => {
  const { initPaymentSheet, presentPaymentSheet} = useStripe();
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(false)



  // iniciate payment from the server
  
  const InitiatePaymentFromServer = async ( data: {
    amount: number,
    email: string,
    name: string
  }): Promise<{
    paymentIntentSecret: string,
    ephemeralKeySecret: string,
    customerId: string
  }> => { 
  
    const res = await axios.post("http://10.0.2.2:4000/initiatePayment", data)
    console.log("response from server", res.data)
    return res.data
  }

  const InitiatePaymentFromClient = async () => { 
    try {
     
    
  const result = await InitiatePaymentFromServer({
    amount:9000,
    email: "ukonulucky@gmail.com",
    name:"lucky"
  })

    
  const { 
    paymentIntentSecret,
    ephemeralKeySecret,
    customerId,
  } = result!
 
  const {  error  } = await initPaymentSheet({
    merchantDisplayName: "Rusca bank",
    customerId: customerId,
    paymentIntentClientSecret: paymentIntentSecret,
    customerEphemeralKeySecret: ephemeralKeySecret,
    allowsDelayedPaymentMethods: true,
    returnURL: Linking.createURL("stripe-redirect")
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
    console.log("code ran handlePayment")
    const { error } = await presentPaymentSheet();
    if (error) {
      console.error('Payment failed at present:', error);
      Alert.alert("Payment Error", "Error processing payment")
    } else {
      console.log('Payment successful!',);
      Alert.alert("Payment Status", "Payment successful")
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <Text>Enter Payment Details</Text>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={{ borderWidth: 1, padding: 10, marginBottom: 20, width: '80%' }}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{ borderWidth: 1, padding: 10, marginBottom: 20, width: '80%' }}
        />
        <TextInput
          placeholder="Amount (USD)"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={{ borderWidth: 1, padding: 10, marginBottom: 20, width: '80%' }}
        />
      <Button
        title="Pay Now"
        onPress={handlePayment} />
        {paymentStatus && <Text>{paymentStatus}</Text>}
      </View>
  );
};

export default MakePayMent;

import { getPaymentHistoryApi } from "apiServices/paymentApi/paymentApi";
import { AxiosError } from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Button, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview"; // Optional if you want to show the receipt in-app
import { useAppSelector } from "redux/store/store";
import AppLoaderScreen from "src/AppComponent/AppLoader";
import { EmptyState } from "src/AppComponent/GroupPickerComp";
import { PaymentHistoryType } from "utils/types";
import { toastError } from "utils/useFulFunc";






const PaymentHistory: React.FC = () => {
  const [loader, setLoader] = useState(false)
  const [payments, setPayments] = useState<PaymentHistoryType[] | []>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showReceipt, setShowReceipt] = useState<string | null>(null);



  const filteredPayments = payments.filter((payment) =>
    payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewReceipt = (url?: string) => {
    if (!url) {
      Alert.alert("No receipt available.");
      return;
    }
    setShowReceipt(url);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(null);
  }
  const { email, token, _id } = useAppSelector(state => state.authReducer.userProfile.userData!)
 

  const handleFetchPaymentHistory = async (data: {
    jwtToken: string,
    userId: string,
    email: string
  }) => { 
    
     try {
          setLoader(!loader);
          /* make api call for user signIn */
       const res = await getPaymentHistoryApi(data);
       console.log("list of res", res)
       setPayments(res)
          setLoader(!loader);
        } catch (error) {
          setLoader(!loader);
          if (error instanceof AxiosError && error.response) {
            const errorMessage = error?.response.data.message || error.message;
            const toastData = {
              type: "error",
              message: errorMessage,
              heading: "Payment Hsitory",
              headingColor: "red",
              messageColor: "red",
            };
            toastError(toastData);
          } else {
            console.log("error", error);
            const toastData = {
              type: "error",
              message: "Unknown Error",
              heading: "Payment Hsitory",
              headingColor: "red",
              messageColor: "red",
            };
            toastError(toastData);
          }
        } finally {
          setLoader(false);
        }
  }
  useEffect(() => { 
    handleFetchPaymentHistory({
      email,
      jwtToken: token,
      userId: _id
    })
  }, [])

  if (loader) { 
  return <AppLoaderScreen />
  }
  return (
    <SafeAreaView className="flex-1 ">
       
      <View className="px-2 pt-2">
      <Text className="text-2xl font-bold mb-4">User Payment History</Text>
      {/* Search Bar */}
      <TextInput
        className="mb-4 p-3 border border-gray-300 rounded-md"
        placeholder="Search by description, email, or status"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
     </View>
     
        {/* List of Payments */}
        { 
        filteredPayments.length === 0 ? <EmptyState
          heading="No payment found"
          description="Try adjsuting your search or try again later"
        /> :
            <FlatList
          data={filteredPayments}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 200 }}
          renderItem={({ item }) => (
            <View className="mb-4 p-4 border border-gray-300 rounded-lg">
              <Text className="text-lg font-semibold">
                {new Date(item.createdAt).toLocaleString()}
              </Text>
              <Text>{item.description}</Text>
              <Text>{item.email}</Text>
              <Text>
                {`£${(item.amount / 100).toFixed(2)} `}
              </Text>
              <Text className={ item.status === "succeeded" ? "text-green-500" : item.status === "failed" ? "text-red-500" : "text-yellow-500"}>
                {item.status}
              </Text>
            {/*   {item.paymentRecipt_url && (
                <TouchableOpacity
                  onPress={() => handleViewReceipt(item.paymentRecipt_url)}
                  className={ "bg-indigo-600 p-2 mt-2 rounded-md"}
                >
                  <Text className={ "text-white text-center"}>View Receipt</Text>
                </TouchableOpacity>
              )} */}
            </View>
          )}
        />
        }
      
      

      {/* WebView to display the receipt if available */}
       {showReceipt && (
        <WebView
          source={{ uri: showReceipt }}
          className="flex-1"
          javaScriptEnabled={true} // Enable JS execution
          domStorageEnabled={true} // Enable DOM storage for full HTML page rendering
          onError={handleCloseReceipt}
        />
      )}  
      
   
   </SafeAreaView>
  );
};

export default PaymentHistory;

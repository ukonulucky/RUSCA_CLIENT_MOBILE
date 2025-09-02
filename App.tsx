import React from "react"
import { StatusBar } from "expo-status-bar";
import { StyleSheet} from "react-native";
import MainStackNavigation from "./src/navigation/MainstackNavigation";
import { StripeProvider } from '@stripe/stripe-react-native';
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { store } from "./redux/store/store";

export default function App() {

  const queryClient = new QueryClient();
   const STRIP_PUBLIC_KEY="pk_test_51LbXR4DR4fQFeyUfF7B87TnTMVfapU0trjcBgqmS9mAMJ3Itz92MAKU3lQKy4KROgnviJUIrnGKIW1mNZ2k90D6H00Qpthtixm"
  return (
    <StripeProvider
    publishableKey={STRIP_PUBLIC_KEY}
    >
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <SafeAreaView style={{
            flex:1
          }}>
            <MainStackNavigation />
          </SafeAreaView>
        </SafeAreaProvider>
        </QueryClientProvider>
        <Toast />
      </Provider>
      
  </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
  },
});

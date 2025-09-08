import * as Network from "expo-network";
import { Share, StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const currencyFormatter = (amount: number) => {
  const newCurrency = new Intl.NumberFormat();
  const result = newCurrency.format(amount);
  return result;
};

export const toastError = ({
  type,
  message,
  heading,
  headingColor,
  messageColor,
}: {
  type: string // "success" | "error" | "info";
  message: string;
  heading?: string;
  headingColor?: string;
  messageColor: string;
}) => {
  return Toast.show({
    type: type,
    text2: message,
    visibilityTime: 4000,
    topOffset: StatusBar.currentHeight || 0,
  });
};

export const getInternetConnectionStatus = async () => {
  try {
    const networkState = await Network.getNetworkStateAsync();
    return networkState.isInternetReachable;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const storeInLocalStorageFunc = async (key: string, value: any) => {
  const modifiedString = JSON.stringify(value);
  await AsyncStorage.setItem(key, modifiedString);
};

export const retreiveFromLocalStorage = async (key: string) => {
  const result = await AsyncStorage.getItem(key);
  return result;
};

export const formatMoney = (value: number, currency = "USD") => {
  try {
    // @ts-ignore
    if (typeof Intl !== "undefined" && Intl.NumberFormat) {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
      }).format(value);
    }
  } catch {}
  return `${currency} ${value.toFixed(0)}`;
};

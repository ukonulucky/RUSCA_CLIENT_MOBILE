import { startTransition } from 'react'
import { starRatingArray } from './data'
import { orderListCardProptype, userSignInResponseType } from './types'
import * as Network from 'expo-network';
import { Share, StatusBar } from 'react-native'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const currencyFormatter = (amount: number) => {
  const newCurrency = new Intl.NumberFormat()
  const result = newCurrency.format(amount)
  return result
}

export const calCulateRatingStar = (ratingCount: number) => {
 
  if (ratingCount > 499) {
    const newStarRatingArray = starRatingArray.map((item) => {
      item.active = true
      return item
    })
    return newStarRatingArray
  } else if (ratingCount > 349 && ratingCount < 500) {
    const newStarRatingArray = starRatingArray.map((item) => {
      if (item.key < 5) {
        item.active = true
        return item
      } else {
        item.active = false
        return item
      }
    })
    return newStarRatingArray
  } else if (ratingCount > 249 && ratingCount < 350) {
    const newStarRatingArray = starRatingArray.map((item) => {
      if (item.key < 4) {
        item.active = true
        return item
      } else {
        item.active = false
        return item
      }
    })
    return newStarRatingArray
  } else {
    const newStarRatingArray = starRatingArray.map((item) => {
      if (item.key < 3) {
        item.active = true
        return item
      } else {
        item.active = false
        return item
      }
    })
    return newStarRatingArray
  }
}

export const deleteItemFromList = (itemList: any[], item: any) => {
  const newList = itemList.filter((list) => list.productId !== item.productId)
  return newList
}

/* a function to filter the orderList based on process and ongoinf or returned and canceled */
export const filterOrderListFunc = (
  productList: orderListCardProptype[],
  active: boolean
) => {
  let newList
  if (active) {
    newList = productList.filter((product) => {
      if (
        product.status === 'Ongoing' ||
        product.status === 'Processing' ||
        product.status === 'Delivered'
      )
        return product
    })
  } else {
    newList = productList.filter((product) => {
      if (product.status === 'Canceled' || product.status === 'Returned')
        return product
    })
  }
  return newList
}

export const startRatingGenerator = (rating: number) => {
  const starRatingArray = [
    {
      id: 1,
      active: false
    },
    {
      id: 2,
      active: false
    },
    {
      id: 3,
      active: false
    },
    {
      id: 4,
      active: false
    },
    {
      id: 5,
      active: false
    }
  ]

  starRatingArray.forEach((item) => {
    if (item.id < rating || item.id == rating) {
      item.active = true
      return item
    } else {
      return item
    }
  })
  return starRatingArray
}

export const toastError = ({
  type,
  message,
  heading,
  headingColor,
  messageColor
}: {
  type: string
  message: string
  heading?: string
  headingColor?: string
  messageColor: string
}) => {
  return Toast.show({
    type: type,
    text2: message,
    visibilityTime: 4000,
    topOffset: StatusBar.currentHeight || 0,
  })
}


export const onShare = async () => {
  try {
    const result = await Share.share({
      message: 'Check out this awesome content!',
    });
    console.log("result from share", result)
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log('Shared with activity type of: ' + result.activityType);
      } else {
        console.log('Shared');
      }
    } else if (result.action === Share.dismissedAction) {
      console.log('Share dismissed');
    }
  } catch (error:any) {
    console.error(error.message);
  }
};




export const getInternetConnectionStatus = async() => { 
  try {
      const networkState = await Network.getNetworkStateAsync();
      return networkState.isInternetReachable
  } catch (error: any) {
    console.log(error.message)
  }
}


export const storeInLocalStorageFunc = async (key: string, value: any) => { 
  const modifiedString = JSON.stringify(value)
  await AsyncStorage.setItem(key,modifiedString)
}

export const retreiveFromLocalStorage = async (key: string) => { 
  const result = await AsyncStorage.getItem(key)
  return result
}



export const formatMoney = (value: number, currency = 'USD') => {
  try {
    // @ts-ignore
    if (typeof Intl !== 'undefined' && Intl.NumberFormat) {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(value);
    }
  } catch {}
  return `${currency} ${value.toFixed(0)}`;
};






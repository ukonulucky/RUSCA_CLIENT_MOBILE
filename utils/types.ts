import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { ImageSourcePropType } from 'react-native'
import {  RouteProp, NavigationProp } from "@react-navigation/native"


export type OnboardingProgressComponentPropTypes = {
  active: boolean
}

export type OnBoardingButtonPropType = {
  buttonTextStyle: string
  buttonContainerStyles: string
  buttonText: string,
  disabled?: boolean,
  onPress: () => void
}

export type OnboardingSliderScreenRenderFunctionPropType = {
  item: {
    img: ImageSourcePropType
    heading: string
    text: string
    stage: string
    id: number
  }
  isCarousel: any,
  bgColor: string
}



export type basicInfoType = {
  fullName: string,
  phoneNumber: string,
  email: string,
  date: string,
  photo: string
}

/* 

 "front_image": "fornt_image_png",
        "back_image": "back_image_png",
        "expiry_date": "21-04-2025",
        "id_number": "BN66RR524",
        "extras": {
            "anything":"nothing"
        }
*/


export type driverLicenseUploadType = {
  front_image: string,
  back_image: string,
  expiry_date: string,
  id_number: string,
  anything: string
}

export type signUpFormStateProp = {
  fullName:string,
    email:string,
    password:string,
    role?:string,
    phone:string
}

export type phoneNumberValidPropTypes = {
  setFormattedValue: React.Dispatch<React.SetStateAction<string>>
  setIsPhoneNumberValid: React.Dispatch<React.SetStateAction<boolean>>
  phoneValue: string
  setForm: React.Dispatch<React.SetStateAction<signUpFormStateProp>>
  form: signUpFormStateProp
  onChange: React.Dispatch<React.SetStateAction<any>>
  setPhoneValue: React.Dispatch<React.SetStateAction<string>>
}

export type textOTPPropTypes = {
  otp: string
  setOtp: React.Dispatch<React.SetStateAction<string>>
}

export type StoreCarouselCardPropType = {
  image: ImageSourcePropType
  id: number
}

export type categoryCardPropType = {
  img: ImageSourcePropType
  text: string
}


export type newProductCardPropType = {
  productImg: {
    key: number,
    pic: ImageSourcePropType
  }[]
  productPrice: number
  productName: string
  productWeight: string
  productId: number,
  productRating: number,
  productDescription: string,
  isNegociable: boolean,
  productStoreId: string,
  productQuantity: number
}

export type SingleItemCategoryCardType = {
  img: ImageSourcePropType
  amount: number
  itemName: string
  weight: number
  key?: number
}

export type bestSellingProductCardPropType = {
  img: ImageSourcePropType
  amount: number
  itemName: string
  description: string
  key?: number
  navigation?: any
}

export type addressModalPropType = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export type categoryLeftSectionPropType = {
  category: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
}

export type singleProductType = {
    productImg: {
      key: number,
      pic: ImageSourcePropType
    }[]
    productPrice: number
    productName: string
    productWeight: string
    productId: number,
    productRating: number,
    productDescription: string,
    isNegociable: boolean,
  productStoreId: string,
    productQuantity: number
  }



export type productType = {
     cart: singleProductType[] | [],
     products: singleProductType[] | []
}


export type productListType = {
     products: singleProductType[] | []
}


export type categoryDataToDisplayType = {
  key: number
  category: string
  subCategory: {
    subCategoryName: string
    subCategoryProducts: {
      id: number
      productImg: ImageSourcePropType
      productName: string
      quantity: number
      price: number
    }[]
  }[]

}

export type categoryDataType = categoryDataToDisplayType[]

export type bottomTabNavigationParamList = {
  Home: {screen: "Home"}
  Group: undefined
  Activity: undefined
  Wallet: undefined,
  Profile: undefined
}


export type productDetailtsPropType = {
  productName: string 
  productWeight: string 
  productAmount: number 
  productImages: {
    img: ImageSourcePropType
    key: number
  }[]
  isNagociatable: boolean 
  productDescription: string 
  starRating?: number
  totalRating: number 
}


/* { productName, totalRating, productWeight, productDescription, productAmount, productImages, isNagociatable } */


export type authStackParamList = {
  signInScreen: undefined
  signUpScreen: undefined,
  paymentScreen: undefined,
  emailVerifiedSuccessScreen: undefined,
  verifyCodeScreen: {
    userEmail: string,
    token: string
  },
  
  forgetPasswordVarifyCodeScreen: {
    userEmail: string
  },
  passwordChangeScreen: undefined
  newPasswordScreen: {
    email: string,
    token: string
  }
  forgotPasswordScreen: undefined
  emailVerificationScreen: undefined
  passwordChangeSuccessScreen: undefined
}


export type clientStackParamList = {
  welcomeScreen: undefined,
  driverRegisterScreen: undefined,
  basicInfoScreen: undefined,
  incomeScreen: undefined,
  walletScreen: undefined,
  onlineOflineScreen: undefined, 
  profileSuccessScreen: undefined,
  profileScreen: undefined,
  driverLicenseScreen: undefined,
  driverLicenseUploadScreen: undefined,
  vehicleInfoHomeScreen: undefined,
  vehicleBrandScreen: undefined,
  vehicleCertRegScreen: undefined,
  vehicleNumberPlateScreen: undefined,
  vehiclePhotoScreen: undefined,
  vehicleRegSuccessScreen: undefined,
  vehicleProductionYear: undefined,
  roadWorthinesScreen: undefined
}

export type newType = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  navigation: any
}

export type VehicleHomeDataType = {
  image: any;
  data: string;
  url: keyof clientStackParamList| '';
};

/* 
  name: "Basic Info",
        icon: require("../assets/icons/user-octagon.png"),
        key: 1,
       url: "basicInfoScreen"
*/
export type driverRegisterDataType = {
  name: string, 
  icon: any;
  key: number;
  url: keyof clientStackParamList| '';
};

export type otherProductPropTypes = {
  key?: number
  productName: string
  deliveryDate: string
  productAmount: number
  productImage: ImageSourcePropType
}

export type productUpdateFormTypes = {
  fullName: string
  email: string
  phoneNumber: string
  address: string
}

export type productPasswordChangeFormTypes = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export type cardCartPropType = {
  productAmount: number
  productWeight: number
  productImg: ImageSourcePropType
  productName: string
     id: number,
  productQuantity: number
}

export type filterArrayArgumentType = {
  itemList: any[]
  item: any
}

export type orderDetailsHeadingType = {
  active: boolean
  setActive: React.Dispatch<React.SetStateAction<boolean>>
}

export type orderListCardProptype = {
  id: number
  orderId?: number | null
  date?: string | null
  productImg: ImageSourcePropType
  productName: string
  productQuantity?: number
  productAmount?: number
  status: string
}

export type orderDeatilScreenPropType = {
  OrderId: number
  trackingNumber: string
  productVendor: string
  orderDate: string
  productQuantity: number
  productWeight: string
  status: string
  productAmount: number
  productDeliveryFee: number
  productTotalcost: number
  receiversName: string
  receiversPhoneNumber: string
  receiversAddress: string
  productList: orderListCardProptype[]
}

export type orderItemStatusCardPropType = {
  success: boolean
  heading: string
  date: string
  description: string
  id: number
}

export type ReviewCardPropType = {
  id: number
  name: string
  date: string
  description: string
  starRating: number
  image: ImageSourcePropType
  productImages?: {
    id: number
    img: ImageSourcePropType
  }[]
}

export type reviewWriteType = {
  reviewDescription: string
}


export type fetchCurrentLocationType = {
     setLocation : any
     setErrorMsg : React.Dispatch<React.SetStateAction<string>>
}

export type mainStackParamaList = {
  signInScreen: undefined
  signUpScreen: undefined,
  paymentScreen: undefined,
  emailVerifiedSuccessScreen: undefined,
  verifyCodeScreen: {
    userEmail: string,
    token: string
  },
  
  forgetPasswordVarifyCodeScreen: {
    userEmail: string
  },
  passwordChangeScreen: undefined
  newPasswordScreen: {
    email: string,
    token: string
  }
  forgotPasswordScreen: undefined
  emailVerificationScreen: undefined
  passwordChangeSuccessScreen: undefined
  bottomTabNavigation: undefined
  storeCartScreen: undefined,
  productDetailsScreen: {
    productImg: {
      key: number,
      pic: ImageSourcePropType
    }[]
    productPrice: number
    productName: string
    productWeight: string
    productId: number,
    productRating: number,
    productDescription: string,
    isNegociable: boolean,
    productStoreId: string
  },
  personalDetailsUpdateScreen: undefined,
  personalDetailsChangePasswordScreen: undefined,
  personalProfileUpdateSuccessScreen: undefined,
  personalProfilePasswordUpdasteSuccessScreen: undefined,
  personalProfileDetailsScreen: undefined,
  personalProfilePasswordUpdateSuccessScreen: undefined,
  orderDetailsDeliveryScreen: orderDeatilScreenPropType | undefined,
  orderDetailScreen: orderDeatilScreenPropType | undefined,
  orderItemStatusScreen: undefined,
  orderListScreen: undefined,
  ratingAndReviewsScreen: undefined,
  reviewWriteScreen: undefined,
  reviewAndCommentScreen: undefined,
  storeCategoryItemListScreen: undefined
}


export type verifyCodeRouteType = RouteProp<mainStackParamaList,"verifyCodeScreen">

export type verifyForgetCodeRouteType = RouteProp<mainStackParamaList,"forgetPasswordVarifyCodeScreen">
 
export type newPasswordRouteType  = RouteProp<mainStackParamaList,"newPasswordScreen">


export type apiRegisterType= {
  fullname: string,
  email: string,
  phone: string,
  password: string,
}


export type apiLoginType = {
  email: string,
  password: string
}

export type countDownTimeType = {
  setResumeCounter : React.Dispatch<React.SetStateAction<boolean>> ,
  resumeCounter : boolean,
  counterTime : number,
}


export type userSignInResponseType = {
  email: string,
  fullname: string,
  phone:string,
  role:string,
  _id: string,
  token: string
}


/* use route for productDetails screen */
export type productDetailsScreenRouteType  = RouteProp<mainStackParamaList,"productDetailsScreen">


/* Rider app types start */
export type riderMainStackParamaList = {
  HOME: undefined,
  ACTIVITY: undefined,
  ACCOUNT: undefined,
  SERVICES: undefined
}


export type riderGlobalStackParamaList = {
  riderChooseDirection: undefined,
  riderBottomTabNavigation: undefined
}




export type appDatePickerPropType = {
  heading: string,
  handleDateChange: (data: string) => void,
  date: string
}
/* Rider app types ends */


/* auth section prop start */

export type updateUserDataApiProp = {
  jwtToken: string,
  userData: {
    fullName: string,
    phone: string,
    dob: string,
    image: string
  }
}



export type driverIdCardType = {
  frontView: string ,
  backView: string,
  expirationDate: string ,
  driverLicenseNumber: string ,
  anything: any[] 
}


export type  driverLicenseType = {
    front_image: string,
    back_image: string,
    expiry_date: string,
    id_number: string,
    extras: {
        anything:any
    }
}

export type driveRegisterType = {
  driverBio: {
    fullname: string,
    phone: string,
    dob: string,
    image: string,
    isDriverProfileComplete: boolean,
    email: string
  },
  vehicle: {
      brand: string,
      model:string,
      color: string,
      plate_number: string,
      photos: string[],
      prod_year: string,
      cert_of_verification:string,
    allocation: string,
      isVehicleDetailsComplete: boolean
  },
  license: {
      front_image: string,
      back_image: string,
      expiry_date: string,
      id_number: string,
      extras: {
          anything:any
      },
      isLicenseDataComplete: boolean
  },
  vehicle_type: string
}


export type driverBioType = {
  email: string,
  fullname: string,
  phone: string, 
  image: string,
  dob: string
}
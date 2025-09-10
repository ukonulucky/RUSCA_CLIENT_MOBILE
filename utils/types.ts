import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { ImageSourcePropType } from "react-native";
import { RouteProp, NavigationProp } from "@react-navigation/native";

export type signUpFormStateProp = {
  fullName: string;
  email: string;
  password: string;
  role?: string;
  phone: string;
};

export type createGroupFormStateProp = {
  groupName: string;
  numberOfMembers: string;
  monthlyContribution: string;
};
export type createGroupApiProp = {
  groupName: string;
  numberOfMembers: string;
  monthlyContribution: string;
  jwtToken: string;
  userId: string
};


export type getAllGroupsType = {
  jwtToken: string;
};

export type textOTPPropTypes = {
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
};

export type newProductCardPropType = {
  productImg: {
    key: number;
    pic: ImageSourcePropType;
  }[];
  productPrice: number;
  productName: string;
  productWeight: string;
  productId: number;
  productRating: number;
  productDescription: string;
  isNegociable: boolean;
  productStoreId: string;
  productQuantity: number;
};

export type bottomTabNavigationParamList = {
  Home: { screen: "Home" };
  Group: undefined;
  History: undefined;
  Profile: undefined,
  Members: undefined
};


export type authStackParamList = {
  signInScreen: undefined;
  signUpScreen: undefined;
  paymentScreen: undefined;
  emailVerifiedSuccessScreen: undefined;
  verifyCodeScreen: {
    userEmail: string;
    token: string;
  };

  forgetPasswordVarifyCodeScreen: {
    userEmail: string;
  };
  passwordChangeScreen: undefined;
  newPasswordScreen: {
    email: string;
    token: string;
  };
  forgotPasswordScreen: undefined;
  emailVerificationScreen: undefined;
  passwordChangeSuccessScreen: undefined;
};

export type groupStackParamList = {
  groupListScreen: undefined;
  groupDetailsScreen: undefined;
  groupPaymentScreen: undefined;
  paymentSuccessScreen: undefined
};

export type clientStackParamList = {
  welcomeScreen: undefined;
  driverRegisterScreen: undefined;
  basicInfoScreen: undefined;
  incomeScreen: undefined;
  walletScreen: undefined;
  onlineOflineScreen: undefined;
  profileSuccessScreen: undefined;
  profileScreen: undefined;
  driverLicenseScreen: undefined;
  driverLicenseUploadScreen: undefined;
  vehicleInfoHomeScreen: undefined;
  vehicleBrandScreen: undefined;
  vehicleCertRegScreen: undefined;
  vehicleNumberPlateScreen: undefined;
  vehiclePhotoScreen: undefined;
  vehicleRegSuccessScreen: undefined;
  vehicleProductionYear: undefined;
  roadWorthinesScreen: undefined;
};

export type mainStackParamaList = {
  signInScreen: undefined;
  signUpScreen: undefined;
  paymentScreen: undefined;
  emailVerifiedSuccessScreen: undefined;
  verifyCodeScreen: {
    userEmail: string;
    token: string;
  };

  forgetPasswordVarifyCodeScreen: {
    userEmail: string;
  };
  passwordChangeScreen: undefined;
  newPasswordScreen: {
    email: string;
    token: string;
  };
  forgotPasswordScreen: undefined;
  emailVerificationScreen: undefined;
  passwordChangeSuccessScreen: undefined;
  bottomTabNavigation: undefined;
  storeCartScreen: undefined;
  productDetailsScreen: {
    productImg: {
      key: number;
      pic: ImageSourcePropType;
    }[];
    productPrice: number;
    productName: string;
    productWeight: string;
    productId: number;
    productRating: number;
    productDescription: string;
    isNegociable: boolean;
    productStoreId: string;
  };
};

export type verifyCodeRouteType = RouteProp<
  mainStackParamaList,
  "verifyCodeScreen"
>;

export type verifyForgetCodeRouteType = RouteProp<
  mainStackParamaList,
  "forgetPasswordVarifyCodeScreen"
>;

export type newPasswordRouteType = RouteProp<
  mainStackParamaList,
  "newPasswordScreen"
>;

export type apiRegisterType = {
  fullname: string;
  email: string;
  phone: string;
  password: string;
};

export type apiLoginType = {
  email: string;
  password: string;
};

export type userSignInResponseType = {
  email: string;
  fullname: string;
  phone: string;
  role: string;
  _id: string;
  token: string;
};

// get all groups
export type groupType =
  | {
      id: string;
      name: string;
      amount: string;
      currency: string;
      maxNumber: string;
      currentNumber: string;
      groupMembersId: string[];
    }[]
  | [];

export type groupTypes = {
  groups: groupType;
  selectedGroupId: string;
};

export type Group = {
  id: string;
  name: string;
  amount: number; // contribution per cycle
  currency?: string; // 'USD' | 'NGN' | 'GBP' | ...
  maxMembers: number;
  currentMembers?: number;
  groupMembersId: string[];
};

export type GroupPickerProps = {
  groups?: Group[];
  navigation: any
};
export interface PaymentData {
  email: string;
  amount: number;
  paymentStatus: "success" | "failed" | "pending";
}

export type memberType = {
  userId: string;
  groupId: string;
  status: boolean;
  _id: string;
} | null;

export type memberStateType = {
  member: memberType;
};

export type GroupDetails = {
  id: string;
  name: string;
  amount: number; // contribution amount
  dateOfContribution: number; // e.g., '2021-12-01'
  members: Member[];
};

export type Member = {
  id: string;
  name: string;
  email?: string;
  status: string;
};

export type GroupDetailsProps = {
  group: GroupDetails;
  email: string,
  navigation: any
};

export type groupMemberListType = {
  id: string,
  name: string,
  amount: number,
  dateOfContribution: number,
  members: {
    id: string;
    name: string;
    email: string;
    status: "active" | "pending";
  }[]
 
};


export type paymentType = {
  amount: number,
  email: string,
  name: string,
  groupId: string,
  navigation: any
}

export interface PaymentHistoryType {
  _id: string;
  amount: number; // in cents
  currency: string;
  description: string;
  status: "created" | "succeeded" | "failed";
  email: string;
  paymentRecipt_url?: string;
  createdAt: string;
}
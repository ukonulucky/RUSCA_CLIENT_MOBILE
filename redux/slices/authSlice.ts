
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { userSignInResponseType } from "../../utils/types"
import AsyncStorage from "@react-native-async-storage/async-storage"






const initialState: {
    isOnboarded: boolean,
    isLoggedIn: boolean,
    userProfile: {
        userData: null | userSignInResponseType
    },
} = {
    isOnboarded: false,
    isLoggedIn: false,
    userProfile: {
        userData: null
    },

   
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        userLoggedInAndLoggedOutAction: (state, action: PayloadAction<userSignInResponseType | null>) => { 
            state.userProfile.userData = action.payload
           
        },
      
        logInLogOutAction: (state, action: PayloadAction<boolean>) => { 
            state.isLoggedIn = action.payload
        }
      
    }
})





export const { userLoggedInAndLoggedOutAction,logInLogOutAction} =  authSlice.actions


export const authReducer = authSlice.reducer
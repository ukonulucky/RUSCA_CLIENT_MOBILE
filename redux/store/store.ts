import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../slices/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { driverOnboardingReducer } from "../slices/driverOnboardingSlice";




export const store = configureStore({
    reducer: {
        authReducer,
        driverOnboardingReducer
    }
})


export const useAppDispatch: () => typeof store.dispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
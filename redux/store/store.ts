import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../slices/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { groupReducer } from "../slices/userSlice"



export const store = configureStore({
    reducer: {
        authReducer,
        groupReducer
    }
})


export const useAppDispatch: () => typeof store.dispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
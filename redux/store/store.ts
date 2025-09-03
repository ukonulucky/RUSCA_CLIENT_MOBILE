import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../slices/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { memberReducer } from "../slices/memberSlice"
import {  groupReducer } from "../slices/groupSlice"


export const store = configureStore({
    reducer: {
        authReducer,
        groupReducer,
        memberReducer
    }
})


export const useAppDispatch: () => typeof store.dispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector

import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {  driverBioType, driveRegisterType , driverLicenseType } from "../../utils/types"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeInLocalStorageFunc } from "../../utils/useFulFunc";





const initialState: driveRegisterType = {
    driverBio: {
        dob: "",
        fullname: "",
        image: "",
        phone: "",
        email: "",
        isDriverProfileComplete: false
        
    },
        vehicle: {
            brand: "",
            model:"",
            color:"",
            plate_number:"",
            photos:[],
            prod_year: "",
            cert_of_verification:"",
        allocation: "",
        isVehicleDetailsComplete: false
        },
        license: {
            front_image:"",
            back_image:"",
            expiry_date:"",
            id_number: "",
            extras: {
                anything:""
            },
            isLicenseDataComplete: false
        },
        vehicle_type: "car" 
      }
   


const driverOnboardingSlice = createSlice({
    name:"driverOboarding",
    initialState,
    reducers: {
        updateDriverBioAction: (state, action: PayloadAction<driverBioType>) => {
           const driverBio =  {
            ...action.payload,   isDriverProfileComplete : true
           }
            storeInLocalStorageFunc("driverBio", driverBio)
            state.driverBio = driverBio
        },
        registerDriverLicenceAction: (state, action: PayloadAction<driverLicenseType>) => {
            state.license = {
                ...action.payload, isLicenseDataComplete: true
            }
        },
        addVehicleBrandAction: (state, action: PayloadAction<{
            brand: string,
            model: string,
            color: string,
            vehicleType: string
        }>) => { 
            state.vehicle = {
                ...state.vehicle, brand: action.payload.brand,
                model: action.payload.model,
                color: action.payload.color,
            }
            state.vehicle_type = action.payload.vehicleType
        }

    }
})





export const {registerDriverLicenceAction,addVehicleBrandAction,updateDriverBioAction} =  driverOnboardingSlice.actions


export const driverOnboardingReducer = driverOnboardingSlice.reducer
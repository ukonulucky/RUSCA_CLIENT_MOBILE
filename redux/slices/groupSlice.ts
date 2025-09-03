
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { groupType, groupTypes } from "utils/types"


const initialState: groupTypes = {
    groups : []
}
   
const groupDonationSlice = createSlice({
    name:"groupDonation",
    initialState,
    reducers: {
        getGroupAction: (state, action: PayloadAction<groupType>) => {
         state.groups =  action.payload
        }
    }
})






export const {getGroupAction} =  groupDonationSlice.actions


export const groupReducer = groupDonationSlice.reducer
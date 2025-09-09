
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { groupType, groupTypes } from "utils/types"


const initialState: groupTypes = {
    groups: [],
    selectedGroupId: ""
}
   
const groupDonationSlice = createSlice({
    name:"groupDonation",
    initialState,
    reducers: {
        getGroupAction: (state, action: PayloadAction<groupType>) => {
            state.groups = action.payload
        },
        setSelectedGroupIdAction: (state, action: PayloadAction<string>) => {
            state.selectedGroupId = action.payload
    },
        clearGroupStateAction: (state) => {
            state.selectedGroupId = ""
            state.groups = []
    }
    }
       
})






export const {getGroupAction, setSelectedGroupIdAction, clearGroupStateAction} =  groupDonationSlice.actions


export const groupReducer = groupDonationSlice.reducer
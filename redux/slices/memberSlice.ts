import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { memberStateType, memberType } from "../../utils/types"

const initialState: memberStateType = {
    member : null
}
   
const memberSlice = createSlice({
    name:"member",
    initialState,
    reducers: {
        saveMemberAction: (state, action: PayloadAction<memberType>) => {
         state.member =  action.payload
        }
    }
})


export const {saveMemberAction} =  memberSlice.actions


export const memberReducer = memberSlice.reducer

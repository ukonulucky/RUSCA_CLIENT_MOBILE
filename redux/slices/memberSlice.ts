import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { allMembersWithContributionType, memberStateType, memberType } from "../../utils/types"

const initialState: memberStateType = {
    member: null,
    membersWithContribution: []
}
   
const memberSlice = createSlice({
    name:"member",
    initialState,
    reducers: {
        saveMemberAction: (state, action: PayloadAction<memberType>) => {
         state.member =  action.payload
        },
        saveMembersWithContributionAction: (state, action: PayloadAction<allMembersWithContributionType[] | []>) => {
            state.membersWithContribution = action.payload
            console.log("action sent", action.payload)
        }
    }
})


export const {saveMemberAction,saveMembersWithContributionAction} =  memberSlice.actions


export const memberReducer = memberSlice.reducer

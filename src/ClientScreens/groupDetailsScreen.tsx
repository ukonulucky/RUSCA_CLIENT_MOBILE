import React, { useEffect, useState } from "react";
import { GroupDetails } from "src/AppComponent/GroupDetailsComp";
import { useAppDispatch, useAppSelector } from "redux/store/store";
import {
  getGroupApi,
  getGroupMembersAndPaymentAmountApi,
  getGroupMembersApi,
} from "apiServices/userApi/userApi";
import { toastError } from "utils/useFulFunc";
import { AxiosError } from "axios";
import AppLoaderScreen from "src/AppComponent/AppLoader";
import { groupMemberListType, groupStackParamList } from "utils/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { saveMembersWithContributionAction } from "redux/slices/memberSlice";

const GroupDetailsScreen = ({
  navigation,
}: NativeStackScreenProps<groupStackParamList>) => {
  const [loader, setLoader] = useState(false);
  const [groupMembersList, setGroupMembersList] =
    useState<groupMemberListType | null>(null);

  const { _id, token, email } = useAppSelector(
    (state) => state.authReducer.userProfile.userData!
  );



  const { selectedGroupId } = useAppSelector((state) => state.groupReducer);

  const dispatch = useAppDispatch();

  const handleGetGroupAndItsMember = async (data: {
    groupId: string;
    jwtToken: string;
    userId: string;
  }) => {
    try {
      setLoader(!loader);
      /* make api call for user signIn */
      const [
        groupResponse,
        groupMembersResponse,
        getGroupMembersAndPaymentAmountResponse,
      ] = await Promise.all([
        getGroupApi({
          groupId: data.groupId,
          jwtToken: data.jwtToken,
          userId: data.userId,
        }),
        getGroupMembersApi({
          groupId: data.groupId,
          jwtToken: data.jwtToken,
          userId: data.userId,
        }),
        getGroupMembersAndPaymentAmountApi({
          jwtToken: data.jwtToken,
          userId: data.userId,
        }),
      ]);
      console.log(
        "response from getGroupMembersAndPaymentAmountResponse",
        getGroupMembersAndPaymentAmountResponse.data
      );
   

      const filterMembersWithPaymentArray = getGroupMembersAndPaymentAmountResponse.data
     
      const contributionArray = []
      for (let index = 0; index < filterMembersWithPaymentArray.length; index++) {
        const list: {
          userId: string,
          groupId: string,
          contribution: {
            contributionAmount: string,
            contributionData: string,
            id: string
          }[] | []
        } = {
          userId: "",
          groupId: "",
          contribution: []  
        }
        const element = filterMembersWithPaymentArray[index]
         
        list.groupId = element.groupId
        list.userId = element.userId
        console.log(`element ${index}`, element)
        
        const contributionData = element.contribution.map((state: any) => { 
          return {
            groupId: state.groupId,
            userId: state.userId,
            _id: state._id
          }
        })
        list.contribution = contributionData
        contributionArray.push(list)
       console.log("list data",list)
     }

      
      console.log("filterMembersWithPayment", contributionArray)
      
      dispatch(saveMembersWithContributionAction(contributionArray));

      const {
        data: { _id, monthlyContribution, groupName },
      } = groupResponse;

      const { data: groupMembersData } = groupMembersResponse;
      console.log("group members fetched", groupMembersData);
      const filteredMembersData = groupMembersData.map((member: any) => {
        return {
          id: member._id,
          name: member.fullName,
          email: member.email,
          status: member.status,
        };
      });
      setGroupMembersList({
        amount: monthlyContribution,
        dateOfContribution: Date.now(),
        id: _id,
        name: groupName,
        members: filteredMembersData,
      });

      setLoader(!loader);
    } catch (error) {
      setLoader(!loader);
      if (error instanceof AxiosError && error.response) {
        const errorMessage = error?.response.data.message || error.message;
        const toastData = {
          type: "error",
          message: errorMessage,
          heading: "Group details",
          headingColor: "red",
          messageColor: "red",
        };
        toastError(toastData);
      } else {
        const toastData = {
          type: "error",
          message: "Unknown Error",
          heading: "Group details",
          headingColor: "red",
          messageColor: "red",
        };
        toastError(toastData);
      }
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    handleGetGroupAndItsMember({
      groupId: selectedGroupId,
      jwtToken: token,
      userId: _id,
    });
  }, []);

  /*   const data = {
        group: {
          id,
          name,
          amount,
          dateOfContribution: Date.now(),
          members: [{
            id: "1",
            name: "john",
            email: "john@gmail.com",
            status: 'active'
          }]
        },
       
    } */
  console.log("groupMemberList", groupMembersList);
  if (loader || !groupMembersList) {
    return <AppLoaderScreen />;
  }

  return (
    <GroupDetails
      group={groupMembersList}
      email={email}
      navigation={navigation}
    />
  );
};

export default GroupDetailsScreen;

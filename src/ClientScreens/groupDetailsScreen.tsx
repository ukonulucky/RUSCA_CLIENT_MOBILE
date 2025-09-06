import React, { useEffect, useState } from 'react'
import { GroupDetails } from 'src/AppComponent/GroupDetailsComp'
import { useAppSelector } from 'redux/store/store'
import { getGroupApi, getGroupMembersApi } from 'apiServices/userApi/userApi'
import { toastError } from 'utils/useFulFunc'
import { AxiosError } from 'axios'
import AppLoaderScreen from 'src/AppComponent/AppLoader'
import { groupMemberListType } from 'utils/types'



const GroupDetailsScreen = () => {

  const [loader, setLoader] = useState(false)
  const [groupMembersList, setGroupMembersList] = useState<groupMemberListType | null>(null)

  const {
  _id, token, email
  } = useAppSelector(state => state.authReducer.userProfile.userData!)

  const { selectedGroupId} = useAppSelector(state => state.groupReducer)

  const handleGroupAndItsMember = async (data: {
    groupId: string,
    jwtToken: string,
    userId : string
  }) => { 
    try {
      
          setLoader(!loader);
          /* make api call for user signIn */
      const [groupResponse, groupMembersResponse] = await Promise.all([getGroupApi({
        groupId: data.groupId,
        jwtToken: data.jwtToken,
        userId: data.userId
          }), getGroupMembersApi({
            groupId: data.groupId,
            jwtToken: data.jwtToken,
            userId: data.userId
              })])
    /* console.log("groupResponse list", groupResponse) */
      const { data: { 
        _id, monthlyContribution,
       groupName
      } } = groupResponse
          
      const { data: groupMembersData } = groupMembersResponse
          
      const filteredMembersData = groupMembersData.map((member:any) => { 
        return {
          id: member._id,
          name: member.fullName,
          email: member.email,
          status: member.status
        }
      })

      setGroupMembersList({
        amount: monthlyContribution,
        dateOfContribution: Date.now(),
        id : _id,
        name: groupName,
        members: filteredMembersData
      })
      
          setLoader(!loader)
        } catch (error) {
          setLoader(!loader)
          if ( error instanceof AxiosError && error.response) {
            const  errorMessage = error?.response.data.message || error.message
            const toastData = {
              type: 'error',
              message: errorMessage,
              heading: 'Login',
              headingColor: 'red',
              messageColor: 'red'
            }
            toastError(toastData)
          } else { 
          
            const toastData = {
              type: 'error',
              message: "Unknown Error",
              heading: 'Login',
              headingColor: 'red',
              messageColor: 'red'
            }
            toastError(toastData)
          }
        } finally {
          setLoader(false);
      
        }
  }
 
  useEffect(() => {
    handleGroupAndItsMember(
      {
        groupId: selectedGroupId,
        jwtToken: token,
         userId: _id
      }
    )
   },[])

  
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
  console.log("groupMemberList", groupMembersList)
  if (loader || !groupMembersList) { 
    return <AppLoaderScreen />
  }
  

  return (
      <GroupDetails
      group={groupMembersList}
      email={ email}
      />
  )
}

export default GroupDetailsScreen
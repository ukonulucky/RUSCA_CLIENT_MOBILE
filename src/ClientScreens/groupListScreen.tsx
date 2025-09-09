import  { useEffect, useState } from 'react'
import { GroupPicker } from 'src/AppComponent/GroupPicker'
import { useAppDispatch, useAppSelector } from 'redux/store/store'
import { getAllGroupsApi } from 'apiServices/userApi/userApi'
import { getGroupAction } from 'redux/slices/groupSlice'
import { AxiosError } from 'axios'
import { toastError } from 'utils/useFulFunc'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { groupStackParamList } from 'utils/types'

const GroupListScreen = ({
  navigation
}: NativeStackScreenProps<groupStackParamList>) => {
  /* get user jwtToken */
  
  
    const jwtToken = useAppSelector(state => state.authReducer.userProfile.userData?.token)
  
  const [loader, setLoader] = useState(false)
  
    const dispatch = useAppDispatch()
   
      const data = useAppSelector(state => state.authReducer.userProfile.userData!)
      const [group, setGroup] = useState([])  
    
  const memberList = useAppSelector(state => state.memberReducer.member)
  
      const handleGetGroups = async (x: { 
          userToken: string,
          userId: string
      }) => { 
     try {
           setLoader(!loader);
           /* make api call to get all groups */
           const {data} = await getAllGroupsApi({
               jwtToken: x.userToken,
               userId: x.userId
           });
         const newData = data.map((i: any) => { 
             return {
                 id: i._id,
                 name: i.groupName,
                 amount: i.monthlyContribution,
                 maxMembers: i.numberOfMembers,
                 currentMembers: i.groupMembersId.length,
               currency: "£",
               groupMembersId: i.groupMembersId
             }    
         })
       dispatch(getGroupAction(newData))
       setGroup(newData)
           console.log("group data", data)
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
             console.log("error", error)
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
            if (data) { 
                handleGetGroups({
                    userId: data._id,
                    userToken: data.token
                })
            }
        }, [jwtToken, memberList])
  
  return (
      <GroupPicker
      groups={group}
      navigation={ navigation }
      />
   
  )
}

export default GroupListScreen
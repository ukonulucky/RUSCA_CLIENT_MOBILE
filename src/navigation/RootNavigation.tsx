import { View, Text, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import AuthStackNavigation from './AuthStackNavigation';
import { NavigationContainer, useNavigation } from '@react-navigation/native';


import AppLoaderScreen from '../AppComponent/AppLoader';
import BottomTabNavigation from './BottomTabNavigation';
import { GroupPicker } from 'src/ClientScreens/groupListScreen';
import { toastError } from 'utils/useFulFunc';
import { getAllGroupsApi } from 'apiServices/userApi/userApi';
import { getGroupAction } from 'redux/slices/userSlice';
import { AxiosError } from 'axios';





Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true
    }),
  });
  

const RootNavigation = () => {


  const navigationRef = useRef(null);

  /* get user jwtToken */

  const jwtToken = useAppSelector(state => state.authReducer.userProfile.userData?.token)

  /* check if user is logged in */

  const isUserLoggedIn = useAppSelector(state => state.authReducer.isLoggedIn)

const [loader, setLoader] = useState(false)

  const dispatch = useAppDispatch()
 
    const data = useAppSelector(state => state.authReducer.userProfile.userData!)
    const [group, setGroup] = useState([])  
  
    const handleGetGroups = async (x: { 
        userToken: string,
        userId: string
    }) => { 
   try {
         setLoader(!loader);
         /* make api call for user signIn */
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
               currency:"£"
               
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
    },[jwtToken])
    

  return (
    <NavigationContainer ref={navigationRef}>
      
      
      {/* { 
        !isUserLoggedIn ? <AuthStackNavigation /> : <BottomTabNavigation /> 
        } */}
     
      
      { 
        !isUserLoggedIn ? <AuthStackNavigation /> : <GroupPicker
        groups={group}
          isLoading={ loader }
        /> 
        }
     
      </NavigationContainer>
  )
}

export default RootNavigation
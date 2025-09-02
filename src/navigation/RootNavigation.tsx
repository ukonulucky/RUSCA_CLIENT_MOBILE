import { View, Text, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useAppSelector } from '../../redux/store/store';
import AuthStackNavigation from './AuthStackNavigation';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { saveExpoPushTokenApi } from '../../apiServices/rideApi/rideApi';

import AppLoaderScreen from '../AppComponent/AppLoader';
import BottomTabNavigation from './BottomTabNavigation';




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



  /* get the rider verificatioon status */
  const riderVerificationStatus =  useAppSelector(state => state.authReducer.riderVerificationStatus)
    const [expoPushToken, setExpoPushToken] = useState<Notifications.ExpoPushToken | string>('');
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(
      undefined
    );
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();
  
  useEffect(() => {
      return
    /* stop the operation if user is not logged in */
    if (!isUserLoggedIn) return 

      registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));
  
     
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
       
        const { body, title } = notification.request.content
        console.log("notification body", body, "notification title", title)
    /*     navigationRef.current?.navigate("elcosmeScreen") */
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log("notification response",response);
      });
  
      return () => {
        notificationListener.current &&
          Notifications.removeNotificationSubscription(notificationListener.current);
        responseListener.current &&
          Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, [isUserLoggedIn]);
  
  async function registerForPushNotificationsAsync() {

      let token;
    
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
      if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
      
      try {  
        token = await Notifications.getExpoPushTokenAsync({
           "projectId": "378c8b45-5af0-48c7-bdf2-6c5f887173ef"
        })
      
      /*   console.log("this is the tokend", token, "jwt", jwtToken); */
        if(!jwtToken) return
            await saveExpoPushTokenApi({
          expoPushToken: token,
           jwtToken
        })
     
       /*  console.log("response after saving token", response.message) */
     
        } catch (e) {
        token = `${e}`;
        console.log("error", e)
        }
      } else {
        alert('Must use physical device for Push Notifications');
      }
    
      return token;
    }
  


  return (
    <NavigationContainer ref={navigationRef}>
      
      { 
        !isUserLoggedIn ? <AuthStackNavigation /> : <BottomTabNavigation /> 
        }
     
      </NavigationContainer>
  )
}

export default RootNavigation
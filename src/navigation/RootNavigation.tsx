import { useAppSelector } from '../../redux/store/store';
import AuthStackNavigation from './AuthStackNavigation';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from './BottomTabNavigation';
import { useRef } from 'react';


const RootNavigation = () => {

  const navigationRef = useRef(null);
  /* check if user is logged in */

  const isUserLoggedIn = useAppSelector(state => state.authReducer.userProfile.userData?.token)
    const jwtToken = useAppSelector(
      (state) => state.authReducer.userProfile.userData?.token
    )  

  return (
    <NavigationContainer ref={navigationRef}>
      { 
        !jwtToken ? <AuthStackNavigation /> : <BottomTabNavigation /> 
        }
      </NavigationContainer>
  )
}

export default RootNavigation
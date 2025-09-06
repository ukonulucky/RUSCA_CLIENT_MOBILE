import { useAppSelector } from '../../redux/store/store';
import AuthStackNavigation from './AuthStackNavigation';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from './BottomTabNavigation';
import { useRef } from 'react';


const RootNavigation = () => {

  const navigationRef = useRef(null);
  /* check if user is logged in */

  const isUserLoggedIn = useAppSelector(state => state.authReducer.isLoggedIn)
    
  return (
    <NavigationContainer ref={navigationRef}>
      { 
        !isUserLoggedIn ? <AuthStackNavigation /> : <BottomTabNavigation /> 
        }
      </NavigationContainer>
  )
}

export default RootNavigation
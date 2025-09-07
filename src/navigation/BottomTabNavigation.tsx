import Entypo from '@expo/vector-icons/Entypo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { bottomTabNavigationParamList } from 'utils/types';
import {  Fontisto, Ionicons } from '@expo/vector-icons';
import HomeScreen from 'src/ClientScreens/HomeScreen';
import GroupStackNavigation from './GroupStackNavigation';
import { useAppSelector } from 'redux/store/store';
import PaymentHistory from 'src/ClientScreens/PaymentHistory';



const Tab = createBottomTabNavigator<bottomTabNavigationParamList>();






function BottomTabNavigation() {


  const jwtToken = 1
  const jwtToken1 = useAppSelector(
    (state) => state.authReducer.userProfile.userData?.token
  )

  return (
    <Tab.Navigator
    screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingVertical: 2
        },
        tabBarItemStyle: {
          margin: 1
        },
        tabBarLabelStyle: {
          width:"100%"
        },
        tabBarIconStyle: {
          marginBottom: 1,
          
        }
    }}
    >
      <Tab.Screen name="Home" 
      component={HomeScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <Entypo name="home" size={24} color={ `${focused ? "#F27C22" : "#0C1A30"}`} />  
        ),
       tabBarActiveTintColor : "#F27C22",
       tabBarInactiveTintColor:"#0C1A30"
      }}
      />
      <Tab.Screen name="Group"
        component={GroupStackNavigation} 
        options={{
         tabBarIcon : ({focused}) => (
          <Fontisto name="persons" size={24} color={ `${focused ? "#F27C22" : "#0C1A30"}`} />
         ),
        tabBarActiveTintColor : "#F27C22",
        tabBarInactiveTintColor:"#0C1A30"
       }}
       />

      { 
        jwtToken && 
        <Tab.Screen name="History" 
              component={PaymentHistory}
              options={{
        
                tabBarIcon: ({ focused }) => (
                  <Ionicons name="wallet" size={24} color={ `${focused ? "#F27C22" : "#0C1A30"}`} />
                 
                ),
               tabBarActiveTintColor : "#F27C22",
               tabBarInactiveTintColor:"#0C1A30"
              }}
              />
      }
    </Tab.Navigator>
  );
}


export default BottomTabNavigation
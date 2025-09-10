import Entypo from '@expo/vector-icons/Entypo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { bottomTabNavigationParamList } from 'utils/types';
import {  Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import HomeScreen from 'src/ClientScreens/HomeScreen';
import GroupStackNavigation from './GroupStackNavigation';
import { useAppSelector } from 'redux/store/store';
import PaymentHistory from 'src/ClientScreens/PaymentHistory';
import UserProfileScreen from 'src/ClientScreens/UserProfileScreen';
import CreateGroupScreen from 'src/ClientScreens/CreateGroupScreen';
import ActivateMemberScreen from 'src/ClientScreens/ActivateMemberScreen';


function BottomTabNavigation() {
  const { token: jwtToken, role} = useAppSelector(
    (state) => state.authReducer.userProfile.userData!
  )

const Tab = createBottomTabNavigator<  bottomTabNavigationParamList>();

  if (role == "admin") { 
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
        { 
          jwtToken && <Tab.Screen name="Home" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Entypo name="home" size={24} color={ `${focused ? "#F27C22" : "#0C1A30"}`} />  
            ),
           tabBarActiveTintColor : "#F27C22",
           tabBarInactiveTintColor:"#0C1A30"
          }}
          />
        }
        { 
          jwtToken && <Tab.Screen name="Group"
          component={CreateGroupScreen} 
          options={{
           tabBarIcon : ({focused}) => (
            <Fontisto name="persons" size={24} color={ `${focused ? "#F27C22" : "#0C1A30"}`} />
           ),
          tabBarActiveTintColor : "#F27C22",
          tabBarInactiveTintColor:"#0C1A30"
         }}
         />
        }
        {
          jwtToken && <Tab.Screen name="Members"
          component={ActivateMemberScreen} 
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcons name="group-add" size={24} color={ `${focused ? "#F27C22" : "#0C1A30"}`} />
           
           ),
          tabBarActiveTintColor : "#F27C22",
          tabBarInactiveTintColor:"#0C1A30"
         }}
         />
        }

       
        { 
          jwtToken && 
          <Tab.Screen name="Profile" 
                component={UserProfileScreen}
                options={{
          
                  tabBarIcon: ({ focused }) => (
  
                    <MaterialCommunityIcons name="logout" 
                    size={24} color={ `${focused ? "#F27C22" : "#0C1A30"}`}
                    />
                   
                   
                  ),
                 tabBarActiveTintColor : "#F27C22",
                 tabBarInactiveTintColor:"#0C1A30"
                }}
                />
        }
      </Tab.Navigator>
    );
  }

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
      { 
        jwtToken && <Tab.Screen name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo name="home" size={24} color={ `${focused ? "#F27C22" : "#0C1A30"}`} />  
          ),
         tabBarActiveTintColor : "#F27C22",
         tabBarInactiveTintColor:"#0C1A30"
        }}
        />
      }
      { 
        jwtToken && <Tab.Screen name="Group"
        component={GroupStackNavigation} 
        options={{
         tabBarIcon : ({focused}) => (
          <Fontisto name="persons" size={24} color={ `${focused ? "#F27C22" : "#0C1A30"}`} />
         ),
        tabBarActiveTintColor : "#F27C22",
        tabBarInactiveTintColor:"#0C1A30"
       }}
       />
      }

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
      { 
        jwtToken && 
        <Tab.Screen name="Profile" 
              component={UserProfileScreen}
              options={{
        
                tabBarIcon: ({ focused }) => (

                  <MaterialCommunityIcons name="logout" 
                  size={24} color={ `${focused ? "#F27C22" : "#0C1A30"}`}
                  />
                 
                 
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
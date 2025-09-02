import Entypo from '@expo/vector-icons/Entypo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { useEffect, useState } from 'react';
import { bottomTabNavigationParamList } from 'utils/types';
import { useAppDispatch, useAppSelector } from 'redux/store/store';
import HomeScreen from 'src/ClientScreens/homeScreen';
import GroupScreen from 'src/ClientScreens/groupScreen';
import ActivityScreen from 'src/ClientScreens/activityScreen';
import WalletScreen from 'src/ClientScreens/walletScreen';
import { Feather, FontAwesome, Fontisto, Ionicons } from '@expo/vector-icons';
import ProfileScreen from 'src/ClientScreens/profileScreen';

const Tab = createBottomTabNavigator<bottomTabNavigationParamList>();






function BottomTabNavigation() {
  const [loader, setloader] = useState(true)

  const jwtToken = 1
  const jwtToken1 = useAppSelector(
    (state) => state.authReducer.userProfile.userData?.token
  )
  
  const [progressPercent, setprogressPercent] = useState(0)

  const dispatch = useAppDispatch()
  
useEffect(() => { 
  const handleGetAllCategories = async () => { 
    try {
      const [categoryResponse,subcategoryResponse, childrenResponse ] = await Promise.all([
        getAllCategoryApi(),
        getAllSubCategoryApi(),
        getAllChildrenCategoryApi()
      ])
      if (categoryResponse) setprogressPercent(1) 
      if (subcategoryResponse) { 
        setTimeout(() => { 
          setprogressPercent(2)
        }, 1000)
      }
      if (childrenResponse) { 
        setTimeout(() => { 
          setprogressPercent(3)
          setloader(false) 
        }, 500)
      }
   const categoryArrayList = categoryResponse.data.categories.map((category : any )=> { 
     return {
       categoryId: category._id,
       categoryText: category.meta.name,
       categoryImage: category.meta.image
     }
   })
   const subcategoryArrayList = subcategoryResponse.data.categories.map((subcategory: any) => { 
     return {
      subcategoryText: subcategory.meta.name,
      parentId: subcategory.parent,
      subcategoryId: subcategory._id
  
     }
   })

   const childrenArrayList = childrenResponse.data.categories.map((children: any) => { 
     return {
       childrenId: children._id,
       parentId: children.parent,
       subcategoryId: children.subcategory,
       childrenImage: children.meta.image,
       childrenText: children.meta.name
    }
  })
   dispatch(addCategoryAction(categoryArrayList))     
   dispatch(addSubcategoryAction(subcategoryArrayList))
   dispatch(addChildrenCategoryAction(childrenArrayList))
 
    } catch (error: any) {
      setloader(true)
      const errorMessage =   error?.response?.data?.message ||
      error?.response?.data?.errors ||
      error?.message || 
      'Unknown error'
    toastError({
      type: 'error',
      message: `${errorMessage}`,
      headingColor: 'red',
      messageColor: 'red'
    })
 }
  }
  handleGetAllCategories()

}, [])

  
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
        component={GroupScreen} 
        options={{
 
         tabBarIcon : ({focused}) => (
          <Fontisto name="persons" size={24} color={ `${focused ? "#F27C22" : "#0C1A30"}`} />
         ),
        tabBarActiveTintColor : "#F27C22",
        tabBarInactiveTintColor:"#0C1A30"
       }}
       />
    

      
      { 
        jwtToken &&   <Tab.Screen
        name="Activity" 
        component={ActivityScreen}
        options={{
 
          tabBarIcon: ({ focused, size }) => (
            <Feather name="activity" size={24} color={ `${focused ? "#F27C22" : "#0C1A30"}`} />
 
         ),
        tabBarActiveTintColor : "#F27C22",
        tabBarInactiveTintColor:"#0C1A30"
       }}
       
        />
      }

    
      { 
        jwtToken && 
        <Tab.Screen name="Wallet" 
              component={WalletScreen}
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
              component={ProfileScreen}
              options={{
        
                tabBarIcon: ({ focused }) => (
                  <FontAwesome name="user" size={24} color={ `${focused ? "#F27C22" : "#0C1A30"}`} />
                 
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
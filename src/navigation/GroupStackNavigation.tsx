import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {  groupStackParamList } from "../../utils/types";
import GroupListScreen from "src/ClientScreens/GroupListScreen";
import GroupDetailsScreen from "src/ClientScreens/GroupDetailsScreen";
import PaymentSuccessScreen from "src/ClientScreens/PaymentSuccessScreen";


const GroupStackNavigation = () => {
  const Stack = createNativeStackNavigator<groupStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="groupListScreen"
    >
      <Stack.Screen name="groupListScreen" component={GroupListScreen} />
      <Stack.Screen
        name="groupDetailsScreen"
        component={GroupDetailsScreen}
      />
     
      <Stack.Screen
        name="paymentSuccessScreen"
        component={PaymentSuccessScreen}
      />
    
     
     
    </Stack.Navigator>
  );
};

export default GroupStackNavigation;

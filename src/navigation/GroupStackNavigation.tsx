import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {  groupStackParamList } from "../../utils/types";
import GroupListScreen from "src/ClientScreens/GroupListScreen";
import GroupDetailsScreen from "src/ClientScreens/GroupDetailsScreen";


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
    
     
     
    </Stack.Navigator>
  );
};

export default GroupStackNavigation;

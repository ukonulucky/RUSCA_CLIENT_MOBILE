import { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import {activateMemberByIdApi, deletMemberByIdApi, getAllMembersDetailsApi } from 'apiServices/authApi/authApi';
import { useAppSelector } from 'redux/store/store';
import { EmptyState } from 'src/AppComponent/GroupPickerComp';

// Define types for members
type MemberDetailsType = {
  id: string;
  fullName: string;
  email: string;
  userId: string,
  groupId: string
  isActive: string;
};

export default function MembersScreen() {
  const [members, setMembers] = useState<MemberDetailsType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { token, _id } = useAppSelector(state => state.authReducer.userProfile.userData!)
  const [refetch, setRefetch] = useState(false)
 const [selectedMemberId, setSelectedMemberId] = useState("")
 const [selectedMemberDeleteId, setSelectedMemberDeleteId] = useState("")

  // Fetch members from the server
  const fetchMembers = async (data:{
    userId: string,
    jwtToken: string
  }) => {
    setLoading(true);
    try {
      const response = await getAllMembersDetailsApi(data);
      const formatedList = response.data.map((member: any) => { 
        const { 
          _id,
          userId, 
          groupId, 
          status,
          members: { 
            fullName,
            email
          }
        } = member
        return {
          id: _id,
          userId,
          groupId,
          isActive:status,
          email,
          fullName
        }
      })
      
      setMembers(formatedList); 
    } catch (error) {
      console.error('Error fetching members:', error);
      Alert.alert('Error', 'Failed to fetch members');
    } finally {
      setLoading(false);
    }
  };

  // Activate a user (call your server to activate the user)
  const activateUser = async (memberData: {
    id: string,
    userId: string,
    jwtToken: string
  }) => {
    try {
      console.log("data passed", memberData)
      setSelectedMemberId(memberData.id)
      const response = await activateMemberByIdApi({
        id: memberData.id,
        jwtToken: memberData.jwtToken,
        userId: memberData.userId
      
      })
      console.log("activate response", response)
      setSelectedMemberId("")
      setSelectedMemberDeleteId("")
      setLoading(!loading)
      Alert.alert('Success', 'Member activated successfully');
    } catch (error: any) {
      console.error('Error activating user:', error.response.data.message);
      Alert.alert('Error', 'Failed to activate user');
      setSelectedMemberDeleteId("")
      setSelectedMemberId("")
    }
  };

  // Delete a user (call your server to delete the user)
  const deleteUser = async (memberData:{
    id: string,
    userId: string,
    jwtToken: string
  }) => {
    try {
      setSelectedMemberDeleteId(memberData.id)
      const response = await deletMemberByIdApi({
        id: memberData.id,
        jwtToken: memberData.jwtToken,
        userId: memberData.userId
      })
      console.log("delete response", response)
      setSelectedMemberDeleteId("")
      setSelectedMemberId("")
      setLoading(!loading)
      setRefetch(!refetch)
      Alert.alert('Success', 'Member deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      Alert.alert('Error', 'Failed to delete member');
      setSelectedMemberDeleteId("")
      setSelectedMemberId("")
    }
  };

  useEffect(() => {
    fetchMembers({
      jwtToken: token,
      userId: _id
    }); // Fetch members when the screen is loaded
  }, [refetch]);

  const renderItem = ({ item }: { item: MemberDetailsType }) => {
   console.log("this is the item", item)
    return (
      <View className="bg-white p-4 mb-4 rounded-lg shadow-lg relative">
        <Text className={ `text-lg font-semibold ${item.isActive === "active" ? "text-blue-800" : "text-gray-800"} mb-2`}>{item.fullName}</Text>
        <Text className="text-sm text-gray-600 mb-4">{item.email}</Text>

        {/* Buttons placed at the bottom right */}
        <View className="absolute bottom-4 right-4 flex-row space-x-4">
          <TouchableOpacity
            onPress={() => activateUser({
              id: item.id,
              userId: item.userId,
              jwtToken: token
            })}
            className={ `${item.isActive === "active" ? "bg-gray-400" : "bg-blue-700"} text-white py-2 px-4 rounded-md text-sm`}
            disabled={item.isActive !== "pending" || selectedMemberDeleteId || selectedMemberId ? true : false}
          >
            <Text className="text-white">
              { 
                item.isActive === "active" ? "Activated" : item.id === selectedMemberId ? "Loading.." : "Activate"
              }

            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={ (selectedMemberDeleteId || selectedMemberId)  ? true : false  }
            onPress={() => {
              Alert.alert(
                'Delete Memebr',
                'Are you sure you want to delete this user?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => deleteUser({
                     jwtToken: token,
                      id: item.id,
                      userId: item.userId
                    }),
                  },
                ],
                { cancelable: true }
              );
            }}
            className="bg-red-500 text-white py-2 px-4 rounded-md text-sm"
          
          
          >
            <Text className="text-white">
              { 
                item.id === selectedMemberDeleteId ? "Loading.." : "Delete"
              }
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1  bg-gray-100">
      <Text className="text-2xl font-bold mb-4 px-4 pt-2 text-center text-gray-800">Members List</Text>
      {loading ? (
        <Text className="text-center text-gray-600">Loading...</Text>
      ) : (
          <>
            { 
               members.length === 0 ?
                <EmptyState
                  heading='No member found'
                description=''
                /> :
          <FlatList
            data={members}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
            }
          </>
      )}
    </View>
  );
}

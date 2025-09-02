import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';


const groups = [
  { id: '1', name: 'Business Growth', contribution: 160, description: 'A group for entrepreneurs to share tips and insights.' },
  { id: '2', name: 'Tech Innovators', contribution: 150, description: 'A group for tech enthusiasts and innovators.' },
  { id: '3', name: 'Health and Wellness', contribution: 459, description: 'Join to discuss healthy living, fitness, and wellness.' },
  { id: '4', name: 'Creative Minds', contribution: 550, description: 'A group for creative professionals to network and collaborate.' },
];

export default function JoinGroupScreen() {
    const navigation = useNavigation()
  const renderItem = ({ item }) => (
    <View className="bg-white p-5 rounded-lg shadow-lg mb-4">
      <Text className="text-xl font-bold text-gray-800">{item.name}</Text>
      <Text className="text-gray-600 mt-2">{item.description}</Text>
      <Text className="text-lg font-semibold text-orange-700 mt-3">${item.contribution}</Text>
      <TouchableOpacity
        className="'bg-blue-600 py-2 px-6 rounded-full mt-4'"
        onPress={() => navigation.navigate('GroupDetails', { groupId: item.id })} // Navigate to the GroupDetails screen
      >
        <Text className="text-white text-center">Join Group</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 p-5">
      <Text className="text-3xl font-bold text-center text-gray-800 mb-5">All Groups</Text>
      <FlatList
        data={groups}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

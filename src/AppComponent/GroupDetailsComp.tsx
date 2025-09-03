import React from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { GroupDetailsProps, Member } from 'utils/types';
import { formatMoney } from 'utils/useFulFunc';


// Member card component
export function MemberCard({ member }: { member: Member }) {
  return (
    <View className="flex-row items-center justify-between px-4 py-2 border-b border-sky-200">
      <Text className="text-blue-900 font-semibold text-lg">{member.name}</Text>
      <Text className={`text-sm ${member.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>{member.status}</Text>
    </View>
  );
}



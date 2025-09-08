import React from 'react';
import {  FlatList, Text, View } from 'react-native';

import { GroupDetailsProps, Member } from 'utils/types';
import { formatMoney } from 'utils/useFulFunc';
import MakePayMent from './Payment';
import { useAppSelector} from 'redux/store/store';
import Header from 'src/authScreens/components/Header';
import { useNavigation } from '@react-navigation/native';


// Member card component
export function MemberCard({ member }: { member: Member }) {
  return (
    <View className="flex-row items-center justify-between px-4 py-2 border-b border-sky-200">
      <Text className="text-blue-900 font-semibold text-lg">{member.name}</Text>
      <Text className={`text-sm ${member.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>{member.status}</Text>
    </View>
  );
}

export function GroupDetails({ group, email}: GroupDetailsProps) {
  const { name, amount, dateOfContribution, members, id: groupId } = group 

 const navigation = useNavigation()
    return (
      <View className="flex-1 bg-sky-100 p-4 ">
        
        <View className='mt-18'>
        <Header navigation={navigation} />
        </View>
        <View className="bg-white rounded-2xl shadow-sm mb-6 p-4 mt-6">
          <Text className="text-2xl font-bold text-blue-900 mb-2">{name}</Text>
          <Text className="text-blue-700 mb-4">Contribution amount: {formatMoney(amount)}</Text>
          <Text className="text-blue-700 mb-4">Contribution Date: {new Date(dateOfContribution).toLocaleDateString()}</Text>
  
          <View>
            <MakePayMent
              amount={amount}
              email={email}
              name={name}
              groupId={groupId}
            />
           </View>
        </View>
  
        <Text className="text-xl text-blue-900 font-semibold mb-2">Members</Text>
  
        <FlatList
          data={members}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MemberCard member={item} />}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }


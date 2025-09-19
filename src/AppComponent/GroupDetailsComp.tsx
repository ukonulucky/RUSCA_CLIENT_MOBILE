import React from 'react';
import {  FlatList, Text, View } from 'react-native';

import { allMembersWithContributionType, GroupDetailsProps, Member } from 'utils/types';
import { currencyFormatter, formatMoney } from 'utils/useFulFunc';
import MakePayMent from './Payment';
import { useAppSelector} from 'redux/store/store';
import Header from 'src/authScreens/components/Header';
import { useNavigation } from '@react-navigation/native';


// Member card component
export function MemberCard({ member }: { member: Member }) {
  console.log("member final", member)
  return (
    <View className="flex-row items-center justify-between px-4 py-2 border-b border-sky-200">
      <Text className="text-blue-900 font-semibold text-lg">{member.name}</Text>
      <Text className={`text-sm ${member.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>{member.status}</Text>
    </View>
  );
}

export function GroupDetails({ group, email, navigation}: GroupDetailsProps) {
  const { name, amount, dateOfContribution, members, id: groupId } = group 

  const userId = useAppSelector(state => state.authReducer.userProfile.userData?._id)
  
  const filteredUserdata = members.filter(member => member.id === userId)
  const memberStatus = filteredUserdata[0].status

  // get selected group id
  const selectedGroupId = useAppSelector(state => state.groupReducer.selectedGroupId)

 // check if user has already paid
  const userPaymentData = useAppSelector(state => state.memberReducer.membersWithContribution)
  console.log("userPaymentDATA", userPaymentData)
  console.log("selectedGroupId", selectedGroupId)
  console.log("userId", userId)
  const hasUserPeyed = userPaymentData.filter((data: allMembersWithContributionType) => { 

          return data.userId === userId && selectedGroupId === data.groupId
  })
 console.log("hasUserPeyed",  hasUserPeyed[0].contribution)


 const editedMembers = members.map((item) => {
  return {
    ...item, status: hasUserPeyed[0].status
  }
})


  
    return (
      <View className="flex-1 bg-sky-100 p-4 ">
        <View className='mt-18'>
        <Header navigation={navigation} />
        </View>
        <View className="bg-white rounded-2xl shadow-sm mb-6 p-4 mt-6">
          <Text className="text-2xl font-bold text-blue-900 mb-2">{name}</Text>
          <Text className="text-blue-700 mb-4">Contribution amount: £{currencyFormatter(Number(amount))}</Text>
          <Text className="text-blue-700 mb-4">Contribution Date: {new Date(dateOfContribution).toLocaleDateString()}</Text>
         
          { 
            
            hasUserPeyed[0]?.contribution.length !== 0 &&
            <>
             <Text className="text-blue-700 mb-4">Payment Date: {
            new Date(hasUserPeyed[0]?.contribution[0].contributionDate as string).toLocaleDateString()
            
              }</Text>
              <Text className="text-blue-700 mb-4">Amount Paid:£
              {currencyFormatter(Number(hasUserPeyed[0]?.contribution[0].contributionAmount)/ 100 )}</Text>
            </>  
          }
  
          <View>
            <MakePayMent
              hasUserPeyed={hasUserPeyed}
              amount={amount}
              email={email}
              name={name}
              groupId={groupId}
              navigation={navigation}
              status={ memberStatus }
            />
           </View>
        </View>
  
        <Text className="text-xl text-blue-900 font-semibold mb-2">Members</Text>
  
        <FlatList
          data={editedMembers!}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MemberCard member={item} />}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }


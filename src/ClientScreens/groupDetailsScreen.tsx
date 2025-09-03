import { FlatList, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { MemberCard } from "src/AppComponent/GroupDetailsComp";
import { GroupDetailsProps } from "utils/types";

// GroupDetails component
export default function GroupDetails({ group, onContribute }: GroupDetailsProps) {
    const { name, amount, dateOfContribution, members } = group;
  
    return (
      <View className="flex-1 bg-sky-100 p-4">
        <View className="bg-white rounded-2xl shadow-sm mb-6 p-4">
          <Text className="text-2xl font-bold text-blue-900 mb-2">{name}</Text>
          <Text className="text-blue-700 mb-4">Contribution amount: {formatMoney(amount)}</Text>
          <Text className="text-blue-700 mb-4">Contribution Date: {new Date(dateOfContribution).toLocaleDateString()}</Text>
  
          <Button
            title="Make Contribution"
            onPress={() => onContribute(group.id)}
            color="#1D4ED8" // Blue color
          />
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
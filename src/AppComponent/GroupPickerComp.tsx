import { useNavigation } from "@react-navigation/native";

import { addMemberToGroupApi } from "apiServices/userApi/userApi";
import { AxiosError } from "axios";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { setSelectedGroupIdAction } from "redux/slices/groupSlice";
import { saveMemberAction } from "redux/slices/memberSlice";
import { useAppDispatch, useAppSelector } from "redux/store/store";
import { Group } from "utils/types";

import { formatMoney, toastError } from "utils/useFulFunc";

export function GroupPickerHeader() {
  return (
    <View className="px-4 pt-4 pb-2 bg-white/90 border-b border-sky-200">
      <Text className="text-2xl font-bold text-blue-900">
        Choose a ROSCA Group
      </Text>
      <Text className="text-blue-700/80 mt-1">
        Pick a group that fits your contribution amount and size.
      </Text>
    </View>
  );
}

// Search input
export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <View className="px-4 py-3 bg-white/90 border-b border-sky-200">
      <Text className="text-blue-800 mb-1">Search groups</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Search by name…"
        placeholderTextColor="#6b9bd1"
        className="rounded-xl border border-sky-200 bg-white px-4 py-3 text-blue-900"
      />
    </View>
  );
}

// Subscription status banner


// Progress bar used inside cards
export function ProgressBar({
  percent,
  full,
}: {
  percent: number;
  full?: boolean;
}) {
  return (
    <View className="h-2 rounded-full bg-sky-100 overflow-hidden">
      <View
        className={`h-2 ${full ? "bg-blue-700" : "bg-sky-500"}`}
        style={{ width: `${percent}%` }}
      />
    </View>
  );
}

// Single group card
export function GroupCard({
  g
}: {
  g: Group

}) {
  const currency = g.currency || "USD";
  const full = (g.currentMembers ?? 0) >= g.maxMembers;
  const [selected, setSelected] = useState(false)
  const occupancy = Math.min(
    100,
    Math.round(((g.currentMembers ?? 0) / g.maxMembers) * 100)
  );

  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch();
  const token = useAppSelector(
    (state) => state.authReducer.userProfile.userData?.token!
  );
  const userId = useAppSelector(
    (state) => state.authReducer.userProfile.userData?._id!
  );


  // check if user is subscribed i.e the Id of user is found among the groupList

 
  const isUserMember = g.groupMembersId?.includes(userId);


  const handleAddToGroupFunc = async (data: {
    jwtToken: string;
    userId: string;
    groupId: string;
  }) => {
    try {
      setLoader(!loader);
      /* make api call for adding member to group */
      const {
        message,
        data: { userId, groupId, status, _id },
      } = await addMemberToGroupApi(data);

      dispatch(
        saveMemberAction({
          _id,
          groupId,
          userId,
          status,
        })
      );

      const toastData = {
        type: "success",
        message: message,
        heading: "Member",
        headingColor: "green",
        messageColor: "green",
      };
      toastError(toastData);
      setLoader(!loader);
    } catch (error) {
      setLoader(!loader);
      if (error instanceof AxiosError && error.response) {
        const errorMessage = error?.response.data.message || error.message;
        const toastData = {
          type: "error",
          message: errorMessage,
          heading: "Member",
          headingColor: "red",
          messageColor: "red",
        };
        toastError(toastData);
      } else {
        console.log("error", error);
        const toastData = {
          type: "error",
          message: "Unknown Error",
          heading: "Login",
          headingColor: "red",
          messageColor: "red",
        };
        toastError(toastData);
      }
    } finally {
      setLoader(false);
    }
  };

  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => {
        setSelected(true)
        if (!isUserMember) { 
          const toastData = {
               type: "info",
               message: "User not a member",
               heading: "Membership",
               headingColor: "green",
               messageColor: "green",
             };
             toastError(toastData);
          return 
        }
        dispatch(setSelectedGroupIdAction(g.id))
      
        navigation.navigate("groupDetailsScreen")
      }}
      className="m-2 flex-1 rounded-2xl border border-sky-200 bg-white shadow"
    >
      <View className="bg-sky-50 px-4 pt-4 pb-2 rounded-t-2xl">
        <Text className="text-xl font-semibold text-blue-900">{g.name}</Text>
      </View>

      <View className="px-4 py-4 gap-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-blue-700/80">Contribution</Text>
          <Text className="text-blue-900 font-bold">
            {formatMoney(g.amount, currency)}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-blue-700/80">Max members</Text>
          <Text className="text-blue-900 font-semibold">{g.maxMembers}</Text>
        </View>

        {typeof g.currentMembers === "number" && (
          <View>
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-xs text-blue-700/70">Members</Text>
              <Text className="text-xs text-blue-700/70">
                {g.currentMembers}/{g.maxMembers}
              </Text>
            </View>
            <ProgressBar percent={occupancy} full={full} />
          </View>
        )}

        <Pressable
          onPress={() => {
            handleAddToGroupFunc({
              groupId: g.id,
              jwtToken: token,
              userId: userId,
            });
          }}
          disabled={isUserMember || full}  // disable if your a member or group is full
          className={`mt-2 w-full rounded-xl px-4 py-3 items-center justify-center
             ${
               !isUserMember || full
                 ? "bg-blue-200"
                 : selected
                 ? "bg-blue-800"
                 : "bg-sky-500"
             }`}
        >
          <Text
            className={`font-medium ${
              !isUserMember || full ? "text-blue-600" : "text-white"
            }`}
          >
            {
              full ? "Group full" : isUserMember ? "Member": "Choose group"
            }
          </Text>
        </Pressable>
      </View>
    </TouchableOpacity>
  );
}

// List/grid of group cards
export function GroupList({
  groups
}: {
  groups: Group[]
  }) {
  const { _id: userId } = useAppSelector(state => state.authReducer.userProfile.userData!)
  
  const renderItem = ({ item }: { item: Group }) => (
    <GroupCard
      g={item}
    />
  );

  return (
    <FlatList
      data={groups}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={{ paddingHorizontal: 8 }}
      contentContainerStyle={{ paddingVertical: 12, paddingHorizontal: 4 }}
      showsVerticalScrollIndicator={false}
    />
  );
}

// Empty state
export function EmptyState() {
  return (
    <View className="m-4 flex-1 items-center justify-center rounded-2xl border border-dashed border-sky-300 bg-white p-10">
      <Text className="text-lg font-semibold text-blue-900">
        No groups found
      </Text>
      <Text className="text-blue-700/80 mt-1">
        Try adjusting your search or check back later.
      </Text>
    </View>
  );
}




import { getAllGroupsApi } from 'apiServices/userApi/userApi';
import { AxiosError } from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { getGroupAction } from 'redux/slices/userSlice';
import { useAppSelector } from 'redux/store/store';
import AppLoaderScreen from 'src/AppComponent/AppLoader';
import { toastError } from 'utils/useFulFunc';

export type Group = {
  id: string;
  name: string;
  amount: number; // contribution per cycle
  currency?: string; // 'USD' | 'NGN' | 'GBP' | ...
  maxMembers: number;
  currentMembers?: number;
};

export type GroupPickerProps = {
  groups?: Group[];
  isSubscribed?: boolean;
    onSelect?: (group: Group) => void;
  isLoading: boolean
};


const formatMoney = (value: number, currency = 'USD') => {
  try {
    // @ts-ignore
    if (typeof Intl !== 'undefined' && Intl.NumberFormat) {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(value);
    }
  } catch {}
  return `${currency} ${value.toFixed(0)}`;
};


const DEMO_GROUPS: Group[] = [
  { id: 'g1', name: 'Blue Horizon', amount: 50, currency: 'USD', maxMembers: 10, currentMembers: 6 },
  { id: 'g2', name: 'Ocean Circle', amount: 25, currency: 'USD', maxMembers: 8, currentMembers: 8 },
  { id: 'g3', name: 'Skyline ROSCA', amount: 100, currency: 'USD', maxMembers: 12, currentMembers: 4 },
  { id: 'g4', name: 'Wave Savers', amount: 75, currency: 'USD', maxMembers: 6, currentMembers: 2 },
  { id: 'g5', name: 'Light Blue Collective', amount: 40, currency: 'USD', maxMembers: 5, currentMembers: 1 },
];

// ========== Components ==========

// Header Title + Subtitle
export function GroupPickerHeader() {
  return (
    <View className="px-4 pt-4 pb-2 bg-white/90 border-b border-sky-200">
      <Text className="text-2xl font-bold text-blue-900">Choose a ROSCA Group</Text>
      <Text className="text-blue-700/80 mt-1">Pick a group that fits your contribution amount and size.</Text>
    </View>
  );
}

// Search input
export function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
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
export function SubscriptionBanner({ isSubscribed }: { isSubscribed: boolean }) {
  if (isSubscribed) return null;
  return (
    <View className="mx-4 mt-3 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3">
      <Text className="text-blue-800">You are not subscribed. <Text className="font-semibold">Subscribe to choose a group.</Text></Text>
    </View>
  );
}

// Progress bar used inside cards
export function ProgressBar({ percent, full }: { percent: number; full?: boolean }) {
  return (
    <View className="h-2 rounded-full bg-sky-100 overflow-hidden">
      <View className={`h-2 ${full ? 'bg-blue-700' : 'bg-sky-500'}`} style={{ width: `${percent}%` }} />
    </View>
  );
}

// Single group card
export function GroupCard({
  g,
  isSubscribed,
  selected,
  onPress,
}: {
  g: Group;
  isSubscribed: boolean;
  selected: boolean;
  onPress: () => void;
}) {
  const currency = g.currency || 'USD';
  const full = (g.currentMembers ?? 0) >= g.maxMembers;
  const occupancy = Math.min(100, Math.round(((g.currentMembers ?? 0) / g.maxMembers) * 100));

  return (
    <View className="m-2 flex-1 rounded-2xl border border-sky-200 bg-white shadow">
      <View className="bg-sky-50 px-4 pt-4 pb-2 rounded-t-2xl">
        <Text className="text-xl font-semibold text-blue-900">{g.name}</Text>
      </View>

      <View className="px-4 py-4 gap-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-blue-700/80">Contribution</Text>
          <Text className="text-blue-900 font-bold">{formatMoney(g.amount, currency)}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-blue-700/80">Max members</Text>
          <Text className="text-blue-900 font-semibold">{g.maxMembers}</Text>
        </View>

        {typeof g.currentMembers === 'number' && (
          <View>
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-xs text-blue-700/70">Members</Text>
              <Text className="text-xs text-blue-700/70">{g.currentMembers}/{g.maxMembers}</Text>
            </View>
            <ProgressBar percent={occupancy} full={full} />
          </View>
        )}

        <Pressable
          onPress={onPress}
          disabled={!isSubscribed || full}
          accessibilityLabel={!isSubscribed ? 'Subscribe to choose a group' : full ? 'Group is full' : 'Choose group'}
          className={`mt-2 w-full rounded-xl px-4 py-3 items-center justify-center
            ${!isSubscribed || full ? 'bg-blue-200' : selected ? 'bg-blue-800' : 'bg-sky-500'}`}
        >
          <Text className={`font-medium ${!isSubscribed || full ? 'text-blue-600' : 'text-white'}`}>
            {!isSubscribed ? 'Subscribe to choose' : full ? 'Full' : selected ? 'Selected' : 'Choose'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// List/grid of group cards
export function GroupList({
  groups,
  isSubscribed,
  selectedId,
  onSelect,
}: {
  groups: Group[];
  isSubscribed: boolean;
  selectedId: string | null;
  onSelect: (g: Group) => void;
}) {
  const renderItem = ({ item }: { item: Group }) => (
    <GroupCard
      g={item}
      isSubscribed={isSubscribed}
      selected={selectedId === item.id}
      onPress={() => onSelect(item)}
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
      <Text className="text-lg font-semibold text-blue-900">No groups found</Text>
      <Text className="text-blue-700/80 mt-1">Try adjusting your search or check back later.</Text>
    </View>
  );
}

// ========== Main Container ==========
export function GroupPicker({ groups = DEMO_GROUPS, isSubscribed = true, onSelect }: GroupPickerProps) {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
    const [loader, setLoader] = useState<boolean>(false);
    
    

    
    const dispatch = useDispatch()
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups.filter((g) => g.name.toLowerCase().includes(q));
  }, [groups, query]);

  const handleSelect = (g: Group) => {
    if (!isSubscribed) return;
    setSelectedId(g.id);
    onSelect?.(g);
  };

    
    const isUserLoggedIn = useAppSelector(state => state.authReducer.isLoggedIn)


    const { token, _id } = useAppSelector(state => state.authReducer.userProfile.userData!)
    
    const handleGetGroups = async (x: { 
        userToken: string,
        userId: string
    }) => { 
   try {
         setLoader(!loader);
         /* make api call for user signIn */
         const {data} = await getAllGroupsApi({
             jwtToken: x.userToken,
             userId: x.userId
         });
       
       
        
       const newData = data.map((i: any) => { 
           return {
               id: i._id,
               name: i.groupName,
               amount: i.monthlyContribution,
               maxMembers: i.numberOfMembers,
               currentMembers: i.groupMembersId.length,
               currency: "£"
               
           }
            
               
       })
         dispatch(getGroupAction(newData))
         console.log("group data", data)
         setLoader(!loader)
        
       } catch (error) {
         setLoader(!loader)
         if ( error instanceof AxiosError && error.response) {
           const  errorMessage = error?.response.data.message || error.message
           const toastData = {
             type: 'error',
             message: errorMessage,
             heading: 'Login',
             headingColor: 'red',
             messageColor: 'red'
           }
           toastError(toastData)
         } else { 
           console.log("error", error)
           const toastData = {
             type: 'error',
             message: "Unknown Error",
             heading: 'Login',
             headingColor: 'red',
             messageColor: 'red'
           }
           toastError(toastData)
         }
       } finally {
         setLoader(false);
       
       }
    }
    
    useEffect(() => { 
        if (token && token) { 
            handleGetGroups({
                userId: _id,
                userToken: token
            })
        }
    },[])
    
    
  return (
    <SafeAreaView className="flex-1 bg-sky-100">
      {loader && <AppLoaderScreen />}
          <GroupPickerHeader />
      <SearchBar value={query} onChange={setQuery} />
      <SubscriptionBanner isSubscribed={!!isSubscribed} />

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <GroupList
          groups={filtered}
          isSubscribed={!!isSubscribed}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
      )}
    </SafeAreaView>
  );
}


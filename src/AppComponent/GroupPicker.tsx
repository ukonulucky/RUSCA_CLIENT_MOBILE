
import { getAllGroupsApi } from "apiServices/userApi/userApi";
import { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import { getGroupAction } from "redux/slices/groupSlice";
import { useAppSelector } from "redux/store/store";
import AppLoaderScreen from "src/AppComponent/AppLoader";
import {
  EmptyState,
  GroupList,
  GroupPickerHeader,
  SearchBar,
} from "src/AppComponent/GroupPickerComp";
import { Group, GroupPickerProps } from "utils/types";
import { toastError } from "utils/useFulFunc";

export function GroupPicker({
  groups = [],
  navigation
}: GroupPickerProps) {


  const [query, setQuery] = useState(""); // query is the text typed in the search bar 
 
  const [loader, setLoader] = useState<boolean>(false);

  const dispatch = useDispatch();
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase(); 
    if (!q) return groups;
    return groups?.filter((g) => g.name.toLowerCase().includes(q));
  }, [groups, query]);

  const { token, _id } = useAppSelector(
    (state) => state.authReducer.userProfile.userData!
  );




  // get all groups
  const handleGetGroups = async (x: { userToken: string; userId: string }) => {
    try {
      setLoader(!loader);
      /* make api call for user signIn */
      const { data } = await getAllGroupsApi({
        jwtToken: x.userToken,
        userId: x.userId,
      });

      const newData = data.map((i: any) => {
        return {
          id: i._id,
          name: i.groupName,
          amount: i.monthlyContribution,
          maxMembers: i.numberOfMembers,
          currentMembers: i.groupMembersId.length,
          currency: "£",
          grouMemberId: i.groupMembersId,
        };
      });

      dispatch(getGroupAction(newData));
    
      setLoader(!loader);
    } catch (error) {
      setLoader(!loader);
      if (error instanceof AxiosError && error.response) {
        const errorMessage = error?.response.data.message || error.message;
        const toastData = {
          type: "error",
          message: errorMessage,
          heading: "Login",
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

  useEffect(() => {
    if (token ) {
      handleGetGroups({
        userId: _id,
        userToken: token,
      });
    }
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-sky-100">
      {loader && <AppLoaderScreen />}
      <GroupPickerHeader />
      <SearchBar value={query} onChange={setQuery} />
      {filtered?.length === 0 ? (
        <EmptyState />
      ) : (
          <GroupList
            navigation={ navigation}
          groups={filtered}
        />
      )}
    </SafeAreaView>
  );
}

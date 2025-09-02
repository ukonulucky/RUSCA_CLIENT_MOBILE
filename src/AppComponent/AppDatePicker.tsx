import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { Ionicons } from "@expo/vector-icons";
import { appDatePickerPropType } from "../../utils/types";
import { useAppSelector } from "../../redux/store/store";

//geting the current date

const currentDate = new Date();

const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();


/*   onDateChange={(date) => onChange(date.toISOString())} // Convert date to ISO string */
const AppDatePicker = ({ date, handleDateChange,heading }: appDatePickerPropType) => {
  const [openModel, setOpenModel] = useState(false);
  const [myDate, setMyDate] = useState("");

  console.log("passed date", date, myDate)
  
  
  const data = useAppSelector(state => state.driverOnboardingReducer.driverBio)

  console.log("this is the bio data", data.dob)

  useEffect(() => { 
    console.log("code ran here")
    if (date) { 
      setMyDate(date)
      return
    }
     setMyDate(data.dob)
  }, [date])

  return (
    <View className="w-full ">
      <TouchableOpacity
        className="
              w-full h-[65px] px-4  bg-white rounded-[19px] border border-gray-200  flex-row justify-between items-center mt-2
     "
        onPress={() => { 
          setMyDate("")
          setOpenModel(!openModel)
        }}
      >
        <Text className="text-zinc-800 text-sm font-medium font-['Aeonik-Medium'] leading-tight absolute -top-3 left-5 px-2 bg-white">
          { heading}
        </Text>

        <View>
          <Text>
            {data.dob ? (
              <Text className="flex-1 text-zinc-600  font-light w-full text-[13px] font-[Aeonik-Regular]">
                {
              myDate.toString()
                }
              </Text>
            ) : (
              <Text className="flex-1 text-zinc-600  font-light w-full text-[13px] font-[Aeonik-Regular]">
                E.g 12/04/2000
              </Text>
            )}
          </Text>
        </View>
        {<Ionicons name="calendar-outline" size={25} color="gray" />}
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={openModel}>
        <View style={styles.centeredView}>
          <View style={styles.modelView}>
            <DatePicker
              
             mode="calendar"
              current={ date }  
              selected={myDate}
              onDateChange={(propDate) => {
                console.log("this is the selected date", propDate)
                setMyDate(propDate)
               
              }}
            
           /*   maximumDate={ formatedMinimumData  } */
              options={{
                textHeaderColor: "black",
                textDefaultColor: "black",
                selectedTextColor: "white",
                mainColor: "black",
              }}
            />

            <View className="flex flex-row justify-between items-center w-full mt-4">
              <TouchableOpacity
                onPress={() => {

                  setOpenModel(!openModel);
                  handleDateChange("");
                }}
              >
                <Text
                  className="text-center text-gray-900 font-medium font-['Aeonik-Medium'] leading-[18px] border border-gray-200 py-4 px-8 rounded-xl"
                  style={{
                    fontFamily: "Aeonik-Regular",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              {myDate && (
                <TouchableOpacity
                  onPress={() => {
                    setOpenModel(!openModel);
                    handleDateChange(myDate)
                  }}
                >
                  <Text
                    className=" font-bold text-white  text-center  py-4 px-8  border-solid bg-orange-500 rounded-xl border-0"
                    style={{
                      fontFamily: "Aeonik-Regular",
                    }}
                  >
                    Apply
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modelView: {
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "90%",
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default AppDatePicker;

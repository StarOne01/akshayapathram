import { StyleSheet, Text, View } from "react-native";
import React from "react";

const home = () => {
  const greeUser = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <View className="flex-1 h-screen">
      <View className="p-5">
        <Text className=" font-bold text-xl text-secondary">AkshayaPatra</Text>
      </View>

      <View className="px-5">
        <Text className=" text-2xl font-semibold">{greeUser()},</Text>
        <Text className=" text-lg text-gray-500">Welcome back!</Text>
      </View>

      <View className="p-5">
        <Text>Here is Whats Happening in AkshayaPatra</Text>
        <View>
             <View>
                 
             </View>
        </View>
      </View>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({});

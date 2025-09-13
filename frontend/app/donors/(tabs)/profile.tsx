import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface UserData {
  id: string;
  role: string;
  isLoggedIn: boolean;
  phno: string;
  name: string;
}

export default function profile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        const parsedUser = JSON.parse(userString);
        setUserData(parsedUser);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="p-5">
      <Text className=" capitalize text-2xl font-bold text-primary">
        profile
      </Text>

      <View className="items-center mt-10">
        <FontAwesome name="user-circle" size={100} color="black" />
        {loading ? (
          <Text className="mt-4 text-lg">Loading...</Text>
        ) : userData ? (
          <View className="items-center mt-4">
            <Text className="text-xl font-semibold">{userData.name}</Text>
            <Text className="text-gray-600 mt-1">Phone: {userData.phno}</Text>
            <Text className="text-gray-600 mt-1 capitalize">
              Role: {userData.role}
            </Text>

            <TouchableOpacity
             onPress={()=>{
              AsyncStorage.removeItem("user");
              // Optionally, navigate to login screen or update state
              router.replace("/login/LoginScreen")
             }}
            className="flex flex-row gap-2 mt-3">
              <MaterialCommunityIcons name="logout" size={30} color="red" />
              <Text className="text-red-500 mt-1 font-bold text-xl">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text className="mt-4 text-lg text-red-500">No user data found</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

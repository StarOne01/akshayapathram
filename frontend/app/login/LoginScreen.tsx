import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  return (
    <SafeAreaView className=" h-screen w-full flex items-center justify-center">
      <View>
        <Text className="text-xl">
          Login into{" "}
          <Text className=" text-primary font-bold">AkshayaPatra</Text>
        </Text>
      </View>
      <View className=" w-[80%] mt-8  flex items-center">
        <View className=" w-full px-8 mt-8">
          <Text className=" text-sm text-gray-500">Phone Number</Text>
          <View className=" flex flex-row items-center border-b border-gray-300 py-2">
            <TextInput
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              className=" flex-1 text-lg"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
        </View>
        <View className=" w-full px-8 mt-4">
          <Text className=" text-sm text-gray-500">Password</Text>
          <View className=" flex flex-row items-center border-b border-gray-300 py-2">
            <TextInput
              placeholder="Enter your password"
              secureTextEntry
              className=" flex-1 text-lg"
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>
        <TouchableOpacity
          className=" bg-secondary w-[70%]  px-8 py-2 rounded-xl mt-8"
          onPress={() => {
            router.push("/donors/(tabs)/home");
          }}
        >
          <Text className=" text-white text-center text-lg ">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});

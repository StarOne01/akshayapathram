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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstace from "../../axiosinstance";
const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("donor");
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const res = await axiosInstace.post("/login", {
        phno: phoneNumber,
        password: password,
      });
      console.log(res.data.user);
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
      if (res.data.user.role === "donor") {
        router.replace("/donors/home");
      } else if (res.data.user.role === "ngo") {
        router.replace("/ngo/(tabs)/home");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axiosInstace.post("/register", {
        phno: phoneNumber,
        password: password,
        name: name,
        role: role,
      });
      console.log("res", res.data);
      setIsLogin(true);
      router.push("/donors/home");
    } catch (error) {
      console.log("error", error?.message);
    }
  };

  const handleOnSubmit = async () => {
    try {
      if (isLogin) {
        handleLogin();
      } else {
        handleSignup();
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

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
          {!isLogin && (
            <View>
              <Text className=" text-sm text-gray-500 mt-4">Name</Text>
              <View className=" flex flex-row items-center border-b border-gray-300 py-2">
                <TextInput
                  placeholder="Enter your name"
                  className=" flex-1 text-lg"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View className=" flex flex-row gap-3 mt-4">
                <TouchableOpacity
                  className={`px-4 py-2 rounded-full
                     border ${
                       role === "donor" ? "bg-primary " : "border-gray-300 "
                     }`}
                  onPress={() => setRole("donor")}
                >
                  <Text
                    className={`${
                      role === "donor" ? "text-white" : "text-gray-700"
                    }`}
                  >
                    Donor
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`px-4 py-2 rounded-full border ${
                    role === "ngo"
                      ? "bg-secondary border-secondary"
                      : "border-gray-300 bg-white"
                  }`}
                  onPress={() => setRole("ngo")}
                >
                  <Text
                    className={`${
                      role === "ngo" ? "text-white" : "text-gray-700"
                    }`}
                  >
                    NGO
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
            // router.push("/donors/(tabs)/home");
            handleOnSubmit();
          }}
        >
          <Text className=" text-white text-center text-lg ">
            {isLogin ? "Login" : "Register"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className=" mt-4"
        onPress={() => setIsLogin((prev) => !prev)}
      >
        <Text className=" text-sm text-gray-900">
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";

const home = () => {
  const router = useRouter();

  const greetUser = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const getGreetingIcon = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return <Feather name="sun" size={24} color="#F59E0B" />;
    } else if (currentHour < 18) {
      return <MaterialIcons name="wb-sunny" size={24} color="#F59E0B" />;
    } else {
      return <Ionicons name="moon" size={24} color="#6366F1" />;
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header Section */}
      <View className="bg-white p-5 shadow-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <MaterialIcons name="food-bank" size={28} color="black" />
            <Text className="font-bold text-xl text-secondary ml-2">
              AkshayaPatra
            </Text>
          </View>
          <TouchableOpacity className="p-2">
            <Ionicons name="notifications-outline" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Greeting Section */}
      <View className="px-5 py-6 bg-white mx-5 mt-4 rounded-xl shadow-sm">
        <View className="flex-row items-center mb-2">
          {getGreetingIcon()}
          <Text className="text-2xl font-semibold ml-2">{greetUser()},</Text>
        </View>
        <Text className="text-lg text-gray-500">
          Welcome back to making a difference!
        </Text>
      </View>

      {/* Statistics Section */}
      <View className="p-5">
        <View className="flex-row items-center mb-4">
          <MaterialIcons name="trending-up" size={24} color="#6B7280" />
          <Text className="text-lg font-semibold ml-2">
            What's Happening in AkshayaPatra
          </Text>
        </View>

        {/* Top Row Stats */}
        <View className="flex-row gap-3 mb-3">
          <View className="bg-primary flex-1 rounded-xl p-6 shadow-sm">
            <View className="flex-row items-center justify-between mb-2">
              <MaterialIcons name="restaurant" size={32} color="white" />
              <Text className="text-white font-bold text-2xl">2000+</Text>
            </View>
            <Text className="text-white font-medium">Meals Served</Text>
          </View>

          <View className="bg-secondary flex-1 rounded-xl p-6 shadow-sm">
            <View className="flex-row items-center justify-between mb-2">
              <FontAwesome5 name="hand-holding-heart" size={28} color="white" />
              <Text className="text-white font-bold text-2xl">300+</Text>
            </View>
            <Text className="text-white font-medium">Food Donors</Text>
          </View>
        </View>

        <View className="bg-gradient-to-r  bg-primary rounded-xl p-6 shadow-sm">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <Ionicons name="people" size={36} color="white" />
              <View className="ml-4">
                <Text className="text-white font-bold text-3xl">500+</Text>
                <Text className="text-white font-medium text-lg">
                  People Benefited
                </Text>
              </View>
            </View>
            <View className=" bg-opacity-20 rounded-full p-3">
              <MaterialIcons
                name="volunteer-activism"
                size={32}
                color="white"
              />
            </View>
          </View>
        </View>
      </View>

      <View className="px-5 pb-8">
        <View className="bg-white rounded-xl p-6 shadow-sm">
          <View className="flex-row items-center mb-3">
            <FontAwesome5 name="heart" size={24} color="#10B981" />
            <Text className="text-xl font-bold text-primary ml-2">
              Join Our Mission
            </Text>
          </View>

          <View className="flex-row items-center mb-4">
            <Text className="text-gray-600 ml-2 flex-1">
              Your Extra Plate Can Fill an Empty One
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              router.push("/components/DonationForms");
            }}
            className="bg-secondary rounded-xl py-4 px-6 shadow-sm"
          >
            <View className="flex-row items-center justify-center">
              <MaterialIcons name="favorite" size={20} color="white" />
              <Text className="text-white font-semibold text-lg ml-2">
                Donate Now
              </Text>
              <MaterialIcons
                name="arrow-forward"
                size={20}
                color="white"
                style={{ marginLeft: 8 }}
              />
            </View>
          </TouchableOpacity>

          {/* <View className="flex-row justify-between mt-4 pt-4 border-t border-gray-100">
            <TouchableOpacity className="flex-1 items-center py-2">
              <Ionicons name="calendar-outline" size={24} color="#6B7280" />
              <Text className="text-gray-600 text-sm mt-1">Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 items-center py-2">
              <MaterialIcons name="history" size={24} color="#6B7280" />
              <Text className="text-gray-600 text-sm mt-1">History</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 items-center py-2">
              <Ionicons name="location-outline" size={24} color="#6B7280" />
              <Text className="text-gray-600 text-sm mt-1">Locations</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 items-center py-2">
              <MaterialIcons name="support-agent" size={24} color="#6B7280" />
              <Text className="text-gray-600 text-sm mt-1">Support</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default home;

const styles = StyleSheet.create({});

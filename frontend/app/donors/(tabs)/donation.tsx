import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

const donation = () => {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-5">
        {/* Header Section */}
        <View className="items-center mb-6">
          <MaterialIcons name="volunteer-activism" size={48} color="#10B981" />
          <Text className="font-bold text-2xl text-center mt-2 text-gray-800">
            Together, We Can End Hunger
          </Text>
          <Text className="text-gray-600 text-center mt-1">One Meal at a Time</Text>
        </View>

        {/* Impact Section */}
        <View className="mt-4">
          <View className="flex-row items-center mb-4">
            <Ionicons name="analytics" size={24} color="#6B7280" />
            <Text className="text-lg font-semibold ml-2 text-gray-800">Your Impact</Text>
          </View>
          
          <View className="flex-row gap-3">
            <View className="bg-primary flex-1 rounded-xl p-6 shadow-sm">
              <View className="flex-row items-center justify-between mb-2">
                <MaterialIcons name="restaurant" size={28} color="white" />
                <Text className="text-white text-2xl font-bold">25</Text>
              </View>
              <Text className="text-white font-medium">Meals Donated</Text>
            </View>
            
            <View className="bg-secondary flex-1 rounded-xl p-6 shadow-sm">
              <View className="flex-row items-center justify-between mb-2">
                <Ionicons name="people" size={28} color="white" />
                <Text className="text-white text-2xl font-bold">22</Text>
              </View>
              <Text className="text-white font-medium">People Fed</Text>
            </View>
          </View>
        </View>

        {/* Track Meals Section */}
        <View className="mt-6">
          <View className="flex-row items-center mb-4">
            <MaterialIcons name="track-changes" size={24} color="#6B7280" />
            <Text className="text-lg font-semibold ml-2 text-gray-800">
              Track Where Your Meals Go
            </Text>
          </View>

          <View className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <View className="flex-row items-start justify-between mb-3">
              <View className="flex-1">
                <View className="flex-row items-center mb-2">
                  <FontAwesome5 name="utensils" size={20} color="#10B981" />
                  <Text className="font-bold text-lg ml-2 text-gray-800">Dosa Plates</Text>
                </View>
                <View className="flex-row items-center mb-1">
                  <MaterialIcons name="confirmation-number" size={16} color="#6B7280" />
                  <Text className="text-gray-600 ml-1">Quantity: 5 Plates</Text>
                </View>
              </View>
              <View className="bg-green-100 px-3 py-1 rounded-full">
                <View className="flex-row items-center">
                  <MaterialIcons name="check-circle" size={16} color="#10B981" />
                  <Text className="text-green-700 font-medium ml-1">Delivered</Text>
                </View>
              </View>
            </View>
            
            <View className="border-t border-gray-100 pt-3 space-y-2">
              <View className="flex-row items-center">
                <MaterialIcons name="event" size={16} color="#6B7280" />
                <Text className="text-gray-600 ml-2">Donated On: 12th Sept 2025</Text>
              </View>
              <View className="flex-row items-center">
                <MaterialIcons name="location-on" size={16} color="#6B7280" />
                <Text className="text-gray-600 ml-2">
                  Delivered To: Namma Kudumbam (Old Age Home)
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Upcoming Pickup Section */}
        <View className="mt-6 mb-6">
          <View className="flex-row items-center mb-4">
            <MaterialIcons name="schedule" size={24} color="#6B7280" />
            <Text className="text-lg font-semibold ml-2 text-gray-800">
              Upcoming Pickup
            </Text>
          </View>

          <View className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <View className="flex-row items-start justify-between mb-3">
              <View className="flex-1">
                <View className="flex-row items-center mb-2">
                  <FontAwesome5 name="utensils" size={20} color="#F59E0B" />
                  <Text className="font-bold text-lg ml-2 text-gray-800">Idli Plates</Text>
                </View>
                <View className="flex-row items-center mb-1">
                  <MaterialIcons name="confirmation-number" size={16} color="#6B7280" />
                  <Text className="text-gray-600 ml-1">Quantity: 8 Plates</Text>
                </View>
              </View>
              <View className="bg-orange-100 px-3 py-1 rounded-full">
                <View className="flex-row items-center">
                  <MaterialIcons name="schedule" size={16} color="#F59E0B" />
                  <Text className="text-orange-700 font-medium ml-1">Pending</Text>
                </View>
              </View>
            </View>
            
            <View className="border-t border-gray-100 pt-3 space-y-2">
              <View className="flex-row items-center">
                <MaterialIcons name="event" size={16} color="#6B7280" />
                <Text className="text-gray-600 ml-2">Scheduled: 14th Sept 2025</Text>
              </View>
              <View className="flex-row items-center">
                <MaterialIcons name="access-time" size={16} color="#6B7280" />
                <Text className="text-gray-600 ml-2">Pickup Time: 2:00 PM - 4:00 PM</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default donation;

const styles = StyleSheet.create({});
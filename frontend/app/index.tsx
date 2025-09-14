import { Text, TouchableOpacity, View, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  
  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1543360481-9b6f8f4a36b3?q=80&w=2070&auto=format&fit=crop' }} 
      className="flex-1"
      resizeMode="cover"
    >
      {/* Violet Overlay */}
      <View className="flex-1 bg-purple-900/60"> 
        <SafeAreaView className="flex-1 justify-between items-center p-8">
          
          {/* Top Section: Welcome and Branding */}
          <View className="w-full mt-12 items-center">
            <Text className="text-xl text-purple-200 font-semibold">
              Welcome to
            </Text>
            <FontAwesome6 name="bowl-food" size={80} color="white" className="mt-4" />
            <Text className="text-5xl text-white font-bold tracking-wider mt-4">
              AkshayaPatra
            </Text>
            <Text className="text-xl text-purple-100 italic font-light mt-2 text-center">
              Nourishing communities, one meal at a time.
            </Text>
          </View>

          {/* Bottom Section: Call to Actions */}
          <View className="w-full items-center mb-8">
            <TouchableOpacity
              onPress={() => router.push("/login/LoginScreen")}
              className="bg-white w-full py-4 rounded-full mb-4" // White button for contrast
              style={{ 
                elevation: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
              }}
            >
              <Text className="text-center text-lg text-purple-800 font-bold"> {/* Darker violet text */}
                Get Started
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => console.log("Learn More pressed")}
              className="w-full py-4 rounded-full border border-purple-300" // Lighter violet border
            >
              <Text className="text-center text-lg text-purple-200 font-medium"> {/* Lighter violet text */}
                Learn More
              </Text>
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}
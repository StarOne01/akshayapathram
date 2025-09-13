import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <View className=" h-[85vh] w-full items-center justify-center">
        <View className=" flex items-center flex-col gap-3">
          <FontAwesome6 name="bowl-food" size={35} color="black" />
          <Text className="text-xl text-secondary  font-bold ">
            AkshyaPatra
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={()=>{
          router.push("/login/LoginScreen")
        }}
        className="bg-secondary
      py-4 mx-8 flex items-center justify-center rounded-xl"
      >
        <Text
          className="
          text-white
        "
        >
          Get Started
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

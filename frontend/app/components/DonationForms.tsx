import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Map from "./Map";
import { useRouter } from "expo-router";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

const DonationForms = () => {
  const router = useRouter();
  const [foodName, setFoodName] = useState("");
  const [discription, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cookDate, setCookDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // Camera state
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  // Location state
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirm = (date: Date) => {
    setCookDate(date);
    hideDatePicker();
  };

  // Camera functions
  const openCamera = async () => {
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert(
          "Permission Denied",
          "Camera permission is required to take photos"
        );
        return;
      }
    }
    setIsCameraVisible(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setCapturedImage(photo?.uri || null);
        setIsCameraVisible(false);
      } catch (error) {
        Alert.alert("Error", "Failed to take picture");
      }
    }
  };

  // Location functions
  const openMapPicker = () => {
    setIsMapVisible(true);
  };

  const handleLocationSelect = (latitude: number, longitude: number) => {
    setSelectedLocation({ latitude, longitude });
    setIsMapVisible(false);
  };

  return (
    <SafeAreaView className="h-screen w-screen bg-white">
      <View className="p-5 space-y-4">
        <Text className="text-xl  text-primary font-semibold mb-2">
          Give Some Details About Your Food
        </Text>
        <Text className="mb-2">Food Name</Text>
        <TextInput
          className="border border-gray-300 rounded px-3 py-2 mb-2"
          placeholder="Enter food name"
          value={foodName}
          onChangeText={setFoodName}
        />

        <Text className="mb-2">Description</Text>
        <TextInput
          className="border border-gray-300 rounded px-3 py-2 mb-2"
          placeholder="Enter a brief description"
          value={discription}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />

        <Text className="mb-2">Quantity</Text>
        <TextInput
          className="border border-gray-300 rounded px-3 py-2 mb-2"
          placeholder="Enter quantity (e.g. 5 plates)"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
        <Text className="mb-2">Cook Date & Time</Text>
        <TouchableOpacity
          onPress={showDatePicker}
          className="border border-gray-300 rounded px-3 py-2 mb-2 bg-gray-100"
        >
          <Text>
            {cookDate ? cookDate.toLocaleString() : "Select date and time"}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Text className="mb-2">Pickup Location</Text>
        <TouchableOpacity
          onPress={openMapPicker}
          className="border flex-row gap-1 border-gray-300 rounded px-3 py-6 mb-2 bg-gray-100 items-center justify-center"
        >
          <Text className="text-gray-400">
            {selectedLocation
              ? `Lat: ${selectedLocation.latitude.toFixed(4)}, Lng: ${selectedLocation.longitude.toFixed(4)}`
              : "Choose Location"}
          </Text>
          <MaterialCommunityIcons name="map-marker" size={24} color="gray" />
        </TouchableOpacity>

        <Text className="mb-2">Image of the Food</Text>
        {capturedImage ? (
          <View className="border border-gray-300 rounded mb-2">
            <Image
              source={{ uri: capturedImage }}
              style={{ width: "100%", height: 200, borderRadius: 8 }}
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={openCamera}
              className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-2"
            >
              <MaterialCommunityIcons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={openCamera}
            className="border border-gray-300 rounded px-3 py-6 mb-2 bg-gray-100 items-center justify-center"
          >
            <MaterialCommunityIcons name="camera" size={24} color="gray" />
            <Text className="text-gray-400">Capture Image</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Camera Modal */}
      <Modal visible={isCameraVisible} animationType="slide">
        <View style={{ flex: 1 }}>
          <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back">
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
                paddingBottom: 50,
              }}
            >
              <View style={{ flexDirection: "row", gap: 20 }}>
                <TouchableOpacity
                  onPress={() => setIsCameraVisible(false)}
                  style={{
                    backgroundColor: "white",
                    padding: 15,
                    borderRadius: 50,
                  }}
                >
                  <Text style={{ color: "black", fontWeight: "bold" }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={takePicture}
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 50,
                    width: 70,
                    height: 70,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "black",
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </CameraView>
        </View>
      </Modal>

      {/* Map Modal */}
      <Modal visible={isMapVisible} animationType="slide">
        <View style={{ flex: 1 }}>
          <Map
            onLocationSelect={handleLocationSelect}
            initialRegion={{
              latitude: 10.9974,
              longitude: 76.9589,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
          <View
            style={{
              position: "absolute",
              top: 50,
              right: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => setIsMapVisible(false)}
              style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 25,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <MaterialCommunityIcons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      <View>
         
      </View>

      <TouchableOpacity
        onPress={() => {
          // Add form validation here
          if (
            !foodName ||
            !quantity ||
            !cookDate ||
            !selectedLocation ||
            !capturedImage
          ) {
            Alert.alert(
              "Incomplete Form",
              "Please fill all fields before submitting"
            );
            return;
          }
          // Handle form submission
          Alert.alert("Success", "Donation submitted successfully!");
        }}
        className="bg-secondary m-5 py-4 flex items-center justify-center rounded-xl"
      >
        <Text className="text-white text-lg"> Create Donation</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DonationForms;

const styles = StyleSheet.create({});

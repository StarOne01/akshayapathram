import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";

interface MapProps {
  onLocationSelect?: (latitude: number, longitude: number) => void;
  initialRegion?: Region;
}

export default function Map({ onLocationSelect, initialRegion }: MapProps) {
  const defaultRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion || defaultRegion}
        onPress={(event) => {
          if (onLocationSelect) {
            const { latitude, longitude } = event.nativeEvent.coordinate;
            onLocationSelect(latitude, longitude);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

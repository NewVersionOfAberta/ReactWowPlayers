import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { LogBox, StyleSheet, View } from "react-native";
import { mapRegion } from "../constants/costants";
import { Point } from "../model/Point";

const CoordinatesPicker = ({ navigation, route }) => {
  const handleMapPress = (mapEvent) => {
    let coordinates = mapEvent.nativeEvent.coordinate;
    const point = new Point(coordinates.latitude, coordinates.longitude);
    route.params.setCoordinates({ ...point });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={mapRegion}
        onPress={(mapEvent) => handleMapPress(mapEvent)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default CoordinatesPicker;

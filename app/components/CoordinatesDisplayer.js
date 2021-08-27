import React from "react";
import { StyleSheet, View } from "react-native";
import { useSettings } from "../context/SettingsContext";
import Text from "./CustomText";

const CoordinatesDisplayer = (props) => {
  const user = props.children;
  const { color } = useSettings();
  if (user.coordinates == "" || user.coordinates.latitude == "") {
    return <Text>No coordinates</Text>;
  }
  return (
    <View style={styles.sectionContainer}>
      <Text style={{ color }}>Coordinates</Text>
      <View style={styles.sectionContent}>
        <View style={styles.sectionLine}>
          <Text style={styles.fieldTitle}>Latitude</Text>
          <Text>{user.coordinates.latitude.toPrecision(5)}</Text>
        </View>

        <View style={styles.sectionLine}>
          <Text style={styles.fieldTitle}>Longitude</Text>
          <Text>{user.coordinates.longitude.toPrecision(5)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldTitle: {
    opacity: 0.5,
  },
  container: {
    borderWidth: 1,
  },
  sectionLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  sectionContent: {
    marginHorizontal: 10,
  },
  sectionContainer: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
});

export default CoordinatesDisplayer;

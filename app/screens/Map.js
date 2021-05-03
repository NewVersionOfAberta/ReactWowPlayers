import React, { useContext } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Image, StyleSheet, View, Text } from "react-native";
import { useUsers } from "../context/UserContext";
import { mapRegion } from "../constants/costants";
//import { Text } from "react-native-paper";

const UserMapIcon = (props) => {
  const { user } = props;

  return (
    <View style={styles.markerContainer}>
      <Text style={styles.markerText}>{user.username}</Text>
      {/* <Image
        source={{
          uri: user.avatarUrl,
        }}
        style={styles.image}
      /> */}
    </View>
  );
};

const Map = ({ navigation }) => {
  const { users } = useUsers();

  return (
    <View style={styles.container}>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={mapRegion}>
        {users
          .filter((user) => user.coordinates)
          .map((user, i) => (
            <Marker
              coordinate={user.coordinates}
              onPress={() =>
                navigation.navigate("Details", {
                  userId: user.id,
                  userName: user.nickname,
                })
              }
              key={i}
            >
              <UserMapIcon key={i} user={user} />
            </Marker>
          ))}
      </MapView>
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
  markerContainer: {
    alignContent: "center",
    alignItems: "center",
  },
  markerText: {
    padding: 3,
    backgroundColor: "#00000060",
  },
  image: {
    height: 25,
    width: 25,
    marginTop: 8,
    borderRadius: 4,
  },
});

export default Map;

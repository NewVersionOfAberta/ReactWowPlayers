import React from "react";
import {
  View,
  Button,
  ScrollView,
  StyleSheet,
  Image,
  Text,
} from "react-native";
import usersModel from "../model/UsersModel";
import { Video, AVPlaybackStatus } from "expo-av";

const VideoDisplayer = (props) => {
  const video = React.useRef(null);
  const videoUrl = props.children;
  console.log("Video: ", videoUrl);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: videoUrl,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
};

const ImageDisplayer = (props) => {
  const images = props.children;
  return (
    <View>
      {images.map((image) => {
        return (
          <View key={image}>
            <View>
              <Image
                source={{
                  uri: image,
                }}
                style={styles.image}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

const DetailsScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const user = usersModel.getUserById(id);
  console.log("User details", user);

  return (
    <ScrollView>
      <View title="Game">
        <Text>{user.username}</Text>
        <Text>{user.fraction}</Text>
        <Text>{user.race}</Text>
        <Text>{user.playerClass}</Text>
        <Text>{user.level}</Text>
        <Text>{user.gear}</Text>
      </View>
      <View title="Game">
        <Text>{user.realWorldName}</Text>
        <Text>{user.country}</Text>
        <Text>{user.city}</Text>
        <Text>{user.age}</Text>
      </View>
      <ImageDisplayer>{user.imageUrls}</ImageDisplayer>
      <VideoDisplayer>{user.videoUrl}</VideoDisplayer>
      <Button
        title="Edit"
        onPress={() => navigation.navigate("Edit", { user })}
      ></Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: "#42A5F5",
    margin: 10,
    padding: 8,
    color: "white",
    borderRadius: 14,
    fontSize: 18,
    fontWeight: "500",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginVertical: 10,
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DetailsScreen;

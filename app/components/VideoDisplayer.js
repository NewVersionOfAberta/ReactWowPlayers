import { Video } from "expo-av";
import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "./CustomText";

const VideoDisplayer = (props) => {
  const videoUrl = props.children;
  if (videoUrl == "") {
    return <Text>No video</Text>;
  }
  const video = React.useRef(null);
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
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
});

export default VideoDisplayer;

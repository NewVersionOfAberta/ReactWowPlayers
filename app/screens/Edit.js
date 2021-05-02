import React, { useState } from "react";
import { Video, AVPlaybackStatus } from "expo-av";
import {
  View,
  Button,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import usersModel from "../model/UsersModel";
import { Fraction, Race, PlayerClass, User } from "../model/User";
import { Picker } from "@react-native-picker/picker";
import usePickerItems from "../hooks/PickerItems";
import * as ImagePicker from "expo-image-picker";

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
  const { form, setForm } = props.children;
  // console.log("Props:", form);
  const deleteImage = (image) => {
    setForm({
      ...form,
      imageUrls: form.imageUrls.filter((i) => i != image),
    });
  };
  const images = form.imageUrls;
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

              <Button
                title="Delete"
                onPress={() => deleteImage(image)}
              ></Button>
            </View>
            {/* { { {index < images.length - 1 && <Divider />} } } */}
          </View>
        );
      })}
    </View>
  );
};

const EditScreen = ({ route }) => {
  const { user } = route.params;
  const [form, setForm] = useState({
    id: user.id,
    username: user.username,
    password: "",
    email: "",
    fraction: user.fraction,
    race: user.race,
    playerClass: user.playerClass,
    level: user.level,
    gear: user.gear,
    realWorldName: user.realWorldName,
    country: user.country,
    city: user.city,
    age: user.age,
    coordinates: user.coordinates,
    imageUrls: user.imageUrls,
    videoUrl: user.videoUrl,
  });

  const pickerFractions = usePickerItems(Object.values(Fraction));
  const pickerClass = usePickerItems(Object.values(PlayerClass));
  const pickerRace = usePickerItems(Object.values(Race));

  const onChangeText = (key, val) => {
    setForm({ ...form, [key]: val });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      let newUrls = form.imageUrls;
      newUrls.push(result.uri);
      setForm({ ...form, imageUrls: newUrls });
    }
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      // storageOptions: {
      //   skipBackup: true,
      //   path: "images",
      // },
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result.uri);
      const videoUrl = result.uri;
      setForm({ ...form, videoUrl });
    }
  };

  return (
    <ScrollView>
      <TextInput
        value={form.username}
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("username", val)}
      />
      <Picker
        style={styles.input}
        selectedValue={form.fraction}
        onValueChange={(itemValue, itemIndex) =>
          onChangeText("fraction", itemValue)
        }
      >
        {pickerFractions}
      </Picker>
      <Picker
        style={styles.input}
        selectedValue={form.race}
        onValueChange={(itemValue, itemIndex) =>
          onChangeText("race", itemValue)
        }
      >
        {pickerRace}
      </Picker>
      <Picker
        style={styles.input}
        selectedValue={form.playerClass}
        onValueChange={(itemValue, itemIndex) =>
          onChangeText("playerClass", itemValue)
        }
      >
        {pickerClass}
      </Picker>
      <TextInput
        value={form.level.toString()}
        style={styles.input}
        placeholder="Level"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("level", val)}
      />
      <TextInput
        value={form.gear.toString()}
        style={styles.input}
        placeholder="Gear"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("gear", val)}
      />
      <TextInput
        value={form.realWorldName}
        style={styles.input}
        placeholder="Real name"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("realWorldName", val)}
      />
      <TextInput
        value={form.country}
        style={styles.input}
        placeholder="Country"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("country", val)}
      />
      <TextInput
        value={form.city}
        style={styles.input}
        placeholder="City"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("city", val)}
      />
      <TextInput
        value={form.age.toString()}
        style={styles.input}
        placeholder="Age"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("age", val)}
      />
      <ImageDisplayer>{{ form, setForm }}</ImageDisplayer>
      <Button title="Add image" onPress={pickImage}></Button>
      <VideoDisplayer>{form.videoUrl}</VideoDisplayer>
      <Button title="Add video" onPress={pickVideo}></Button>
      <Button
        title="Save"
        onPress={async () => {
          await usersModel.updateUser(User.fromData(form));
        }}
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
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
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

export default EditScreen;

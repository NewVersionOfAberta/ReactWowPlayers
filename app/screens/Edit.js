import React, { useState } from "react";
import { Video, AVPlaybackStatus } from "expo-av";
import { View, ScrollView, StyleSheet } from "react-native";
import Text from "../components/CustomText";
import { IconButton } from "react-native-paper";
import usersModel from "../model/UsersModel";
import { Fraction, Race, PlayerClass, User } from "../model/User";
import { Picker } from "@react-native-picker/picker";
import usePickerItems from "../hooks/PickerItems";
import * as ImagePicker from "expo-image-picker";
import TextInput from "../components/CustomTextInput";
import { useSettings } from "../context/SettingsContext";
import ImageDisplayer from "../components/ImageDisplayer";
import VideoDisplayer from "../components/VideoDisplayer";
import Button from "../components/CustomButton";
import { mediaService } from "../service/MediaService";

const EditScreen = ({ route, navigation }) => {
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

  const [currentVideo, setCurrentVideo] = useState(user.videoUrl);
  const [currentImages, setCurrentImages] = useState(user.imageUrls);
  const [newImages, setNewImages] = useState([]);

  const pickerFractions = usePickerItems(Object.values(Fraction));
  const pickerClass = usePickerItems(Object.values(PlayerClass));
  const pickerRace = usePickerItems(Object.values(Race));
  const { isDarkTheme, color } = useSettings();

  const onChangeText = (key, val) => {
    setForm({ ...form, [key]: val });
  };

  const setCoordinates = (coordinates) => {
    setForm({ ...form, coordinates });
  };

  const deleteAndUploadImages = async () => {
    const imagesToDelete = user.imageUrls.filter(
      (el) => !currentImages.includes(el)
    );
    if (imagesToDelete.length > 0) {
      await mediaService.deleteImages(imagesToDelete);
    }
    let uploadedImageUrls = await mediaService.uploadImages(user.id, newImages);
    let imageUrls = currentImages.concat(uploadedImageUrls);
    user.imageUrls = imageUrls;
    //setForm({ ...form, imageUrls: newDisplayedImages });
    return imageUrls;
  };

  const deleteAndUploadVideo = async () => {
    let uploadedVideoUrl = user.videoUrl;
    if (uploadedVideoUrl && uploadedVideoUrl != currentVideo) {
      await mediaService.deleteVideo(uploadedVideoUrl);
      uploadedVideoUrl = undefined;
    }
    if (currentVideo != "") {
      uploadedVideoUrl = await mediaService.uploadVideo(user.id, currentVideo);
    }

    return Promise.resolve(uploadedVideoUrl);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.cancelled) {
      let newUrls = newImages;
      newUrls.push(result.uri);
      let newDisplayedImages = newUrls.concat(currentImages);
      setNewImages(newUrls);
      setForm({ ...form, imageUrls: newDisplayedImages });
    }
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
    });

    if (!result.cancelled) {
      const videoUrl = result.uri;
      setCurrentVideo(videoUrl);
    }
  };

  const deleteLastImg = () => {
    if (newImages.length) {
      let newArr = newImages;
      newArr.pop();
      setNewImages(newArr);
    } else {
      if (currentImages.length > 0) {
        let newCurrent = currentImages;
        newCurrent.pop();
        setCurrentImages(newCurrent);
      }
    }
    let newDisplayedImages = newImages.concat(currentImages);
    setForm({ ...form, imageUrls: newDisplayedImages });
  };

  return (
    <ScrollView>
      <Text style={{ ...styles.fieldTitle, color }}>Nickname</Text>
      <TextInput
        value={form.username}
        placeholder="Username"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("username", val)}
      />
      <Text style={{ ...styles.fieldTitle, color }}>Fraction</Text>
      <View style={styles.sectionLine}>
        <Picker
          selectedValue={form.race}
          dropdownIconColor={isDarkTheme ? "white" : "black"}
          style={{
            color: isDarkTheme ? "white" : "black",
          }}
          selectedValue={form.fraction}
          onValueChange={(itemValue, itemIndex) =>
            onChangeText("fraction", itemValue)
          }
        >
          {pickerFractions}
        </Picker>
      </View>
      <Text style={{ ...styles.fieldTitle, color }}>Race</Text>
      <View style={styles.sectionLine}>
        <Picker
          selectedValue={form.race}
          dropdownIconColor={isDarkTheme ? "white" : "black"}
          style={{
            color: isDarkTheme ? "white" : "black",
          }}
          selectedValue={form.race}
          onValueChange={(itemValue, itemIndex) =>
            onChangeText("race", itemValue)
          }
        >
          {pickerRace}
        </Picker>
      </View>
      <Text style={{ ...styles.fieldTitle, color }}>Class</Text>
      <View style={styles.sectionLine}>
        <Picker
          selectedValue={form.race}
          dropdownIconColor={isDarkTheme ? "white" : "black"}
          style={{
            color: isDarkTheme ? "white" : "black",
          }}
          selectedValue={form.playerClass}
          onValueChange={(itemValue, itemIndex) =>
            onChangeText("playerClass", itemValue)
          }
        >
          {pickerClass}
        </Picker>
      </View>
      <Text style={{ ...styles.fieldTitle, color }}>Level</Text>
      <TextInput
        value={form.level.toString()}
        placeholder="Level"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("level", val)}
      />
      <Text style={{ ...styles.fieldTitle, color }}>Gear</Text>
      <TextInput
        value={form.gear.toString()}
        placeholder="Gear"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("gear", val)}
      />
      <Text style={{ ...styles.fieldTitle, color }}>Name</Text>
      <TextInput
        value={form.realWorldName}
        placeholder="Real name"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("realWorldName", val)}
      />
      <Text style={{ ...styles.fieldTitle, color }}>Country</Text>
      <TextInput
        value={form.country}
        placeholder="Country"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("country", val)}
      />
      <Text style={{ ...styles.fieldTitle, color }}>City</Text>
      <TextInput
        value={form.city}
        placeholder="City"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("city", val)}
      />
      <Text style={{ ...styles.fieldTitle, color }}>Age</Text>
      <TextInput
        value={form.age.toString()}
        placeholder="Age"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(val) => onChangeText("age", val)}
      />
      <View style={styles.sectionContent}>
        <View style={styles.sectionLine}>
          <Text style={{ ...styles.fieldTitle, color }}>Latitude</Text>
          <Text>{form.coordinates.latitude || "No"}</Text>
        </View>

        <View style={styles.sectionLine}>
          <Text style={{ ...styles.fieldTitle, color }}>Longitude</Text>
          <Text>{form.coordinates.longitude || "No"}</Text>
        </View>
      </View>

      <View style={styles.coordinatesEdit}>
        <IconButton
          icon="plus-circle"
          size={35}
          onPress={() =>
            navigation.navigate("CoordinatesPicker", {
              setCoordinates,
            })
          }
          color={color}
          style={{ margin: 0 }}
        />
        <IconButton
          icon="minus-circle"
          size={35}
          onPress={() => setCoordinates("")}
          color={color}
          style={{ margin: 0 }}
        />
      </View>
      <ImageDisplayer>
        {{ images: form.imageUrls, setImage: () => {} }}
      </ImageDisplayer>
      {!form.imageUrls.length ? (
        <></>
      ) : (
        <Button onPress={deleteLastImg}>Delete image</Button>
      )}
      <Button onPress={pickImage}>Add image</Button>
      <VideoDisplayer>{currentVideo}</VideoDisplayer>
      <Button onPress={async () => await pickVideo()}>Add video</Button>

      <Button
        onPress={async () => {
          const videoUrl = await deleteAndUploadVideo();
          const imageUrls = await deleteAndUploadImages();
          let updatedUser = User.fromData(form);
          updatedUser.imageUrls = imageUrls;
          updatedUser.videoUrl = videoUrl;
          setCurrentImages(imageUrls);
          setNewImages([]);
          setCurrentVideo(videoUrl);
          await usersModel.updateUser(updatedUser);
          navigation.navigate("Details", { id: updatedUser.id });
        }}
      >
        Save
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fieldTitle: {
    marginHorizontal: 5,
    opacity: 0.8,
  },
  container: {
    borderWidth: 1,
  },
  sectionLine: {
    marginVertical: 5,
  },
  button: {
    width: 290,
    marginBottom: 20,
    alignSelf: "center",
  },
  coordinatesEdit: {
    display: "flex",
    flexDirection: "row",
  },
});

export default EditScreen;

import React from "react";
import { Image, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

import Text from "./CustomText";

const ImageDisplayer = (props) => {
  const images = props.children.images;
  const setImage = props.children.setImage;
  console.log(props);
  if (!images.length) {
    return <Text>No images</Text>;
  }
  return (
    <ScrollView horizontal={true}>
      {images.map((image) => {
        return (
          <View key={image}>
            <TouchableOpacity onPress={() => {setImage(image)}}>
              <Image
                source={{
                  uri: image,
                }}
                style={styles.image}
              />
              </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    width: 100,
    height: 100,
    borderRadius: 8,
    marginVertical: 10,
  },
});

export default ImageDisplayer;

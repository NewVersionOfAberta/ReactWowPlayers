import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import Firebase from "../firebase/firebase";

class MediaService {
  static USERS_STORAGE_NAME = "users";
  static GALLERY_FOLDER_NAME = "gallery";
  static VIDEOS_FOLDER_NAME = "videos";

  userStorage = Firebase.storage().ref(MediaService.USERS_STORAGE_NAME);

  async uploadImages(userId, localImageUrls) {
    return await Promise.all(
      localImageUrls.map(async (image) => await this.uploadImage(userId, image))
    );
  }

  async uploadImage(userId, localUrl) {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", localUrl, true);
        xhr.send(null);
      });
      const ref = this.getUserGalleyReference(userId).child(uuid());
      const snapshot = await ref.put(blob);

      // We're done with the blob, close and release it
      blob.close();

      return await snapshot.ref.getDownloadURL();
    } catch (e) {
      console.log("uploadImageError", e);
    }
  }

  async deleteImages(imageUrls) {
    const promises = imageUrls.map(async (imageUrl) => {
      const imageRef = Firebase.storage().refFromURL(imageUrl);
      await imageRef.delete();
    });

    await Promise.all(promises);
  }

  async uploadVideo(userId, localVideoUrl) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", localVideoUrl, true);
      xhr.send(null);
    });

    const ref = this.getUserVideosReference(userId).child(uuid());
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();

    // const videoRef = this.getUserVideosReference(userId).child(uuid());
    // console.log("Ref", videoRef);
    // return await videoRef.putFile(localVideoUrl);
    // await videoRef.getDownloadURL();
  }

  async deleteVideo(videoUrl) {
    const videoRef = Firebase.storage().refFromURL(videoUrl);
    return await videoRef.delete();
  }

  getUserGalleyReference(userId) {
    return this.userStorage
      .child(userId)
      .child(MediaService.GALLERY_FOLDER_NAME);
  }

  getUserVideosReference(userId) {
    return this.userStorage
      .child(userId)
      .child(MediaService.VIDEOS_FOLDER_NAME);
  }
}

export const mediaService = new MediaService();

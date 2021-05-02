import { User } from "./User";
import Firebase from "../firebase/firebase";
import { requireNativeComponent } from "react-native";

//const USERS_COLLECTION_NAME = ;

class UsersModel {
  userCollection = Firebase.firestore().collection("users");

  users = [];
  setUsers = () => {};

  // loggedUserId = "";
  // setLoggedUserId = () => {};

  async authorize(email, password, login) {
    let message = "";
    try {
      await Firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (credentials) => {
          login(credentials.user.uid);
          this.loadUsers();
        })
        .catch((error) => {
          message = "Login failed";
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      message = "1Failed to log in";
    }
    return message;
  }

  setUsersState(users, setUsers) {
    this.users = users;
    this.setUsers = setUsers;
  }

  async register(form, login) {
    let message = "";
    try {
      await Firebase.auth()
        .createUserWithEmailAndPassword(form.email, form.password)
        .then(async (credentials) => {
          const id = credentials.user.uid;
          //console.log("Form", form);
          const newUser = new User(
            id,
            form.email,
            form.password,
            form.username,
            form.fraction,
            form.race,
            form.playerClass,
            form.level,
            form.gear,
            form.realWorldName,
            form.country,
            form.city,
            form.age
          );
          console.log("new user", newUser);
          await this.userCollection.doc(newUser.id).set({ ...newUser });
          message = "User successfully signed up!: ";
        })
        .catch((error) => {
          message = "Failed signing up";
          if (error.code === "auth/email-already-in-use") {
            //throw new Error("auth/email-already-in-use");
            message = "That email address is already in use!";
          }

          if (error.code === "auth/invalid-email") {
            //throw new Error("That email address is invalid!");
            message = "That email address is invalid!";
          }
          console.log(error);
          //login(credentials.user.uid);
        });
    } catch (err) {
      //throw new Error("Failed to signed up");
      console.log(err);
      message = "Failed signing up";
    }
    return message;
  }

  loadUsers() {
    return this.userCollection.onSnapshot((snapshot) => {
      let users = snapshot.docs
        .map((doc) => User.fromData(doc.data()))
        .sort((firstUser, secondUser) =>
          firstUser.nickname > secondUser.nickname
            ? 1
            : secondUser.nickname > firstUser.nickname
            ? -1
            : 0
        );
      this.setUsers(users);
    });
  }

  getUserById(userId) {
    return this.users.find((user) => user.id == userId);
  }

  async updateUser(user) {
    console.log("To update : ", user);
    await this.userCollection.doc(user.id).set({ ...user });
    loadUsers();
  }
}

export default usersModel = new UsersModel();

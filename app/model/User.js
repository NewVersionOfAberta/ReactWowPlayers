export { Point } from "./Point";

export const Fraction = Object.freeze({
  ALLIANCE: "Alliance",
  HORDE: "Horde",
});

export const Race = Object.freeze({
  HUMAN: "Human",
  ORC: "Orc",
});

export const PlayerClass = Object.freeze({
  MAGE: "Mage",
  SHAMAN: "Shaman",
});

export class User {
  coordinates = "";
  imageUrls = [];
  videoUrl = "";

  constructor(
    id,
    email, //string
    password, //string

    username, //string
    fraction, //Fraction
    race, //Race
    playerClass, //Class
    level, //int
    gear, //int

    realWorldName, //string
    country, //string
    city, //string
    age //int
  ) {
    this.id = id;
    this.email = email; //string
    this.password = password; //string
    this.username = username; //string
    this.fraction = fraction; //Fraction
    this.race = race; //Race
    this.playerClass = playerClass; //Class
    this.level = level; //int
    this.gear = gear; //int
    this.realWorldName = realWorldName; //string
    this.country = country; //string
    this.city = city; //string
    this.age = age;
  }

  static fromData(data) {
    //   console.log("Data:", data);
    let user = new User(
      data.id,
      data.email,
      data.password,
      data.username,
      data.fraction,
      data.race,
      data.playerClass,
      data.level,
      data.gear,
      data.realWorldName,
      data.country,
      data.city,
      parseInt(data.age) ?? 0
    );
    //  console.log("User after constructor", user);
    user.coordinates = data.coordinates;
    user.imageUrls = data.imageUrls;
    user.videoUrl = data.videoUrl;
    console.log("User after user form", user);
    return user;
  }
}

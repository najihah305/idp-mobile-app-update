import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import { Platform } from "react-native";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIZu6gcjeonHlXF0C6-P_JK2iCxwMPufQ",
  authDomain: "ai-home-security-system-db.firebaseapp.com",
  databaseURL: "https://ai-home-security-system-db-default-rtdb.firebaseio.com",
  projectId: "ai-home-security-system-db",
  storageBucket: "ai-home-security-system-db.appspot.com",
  messagingSenderId: "450709831270",
  appId: "1:450709831270:android:1a43bdb46f4e7790c877a7",
};

initializeApp(firebaseConfig);
const database = getDatabase();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const registerForPushNotificationsAsync = async () => {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({
      projectId: "b07310d9-50f7-4bca-822e-ba026ece1b09",
    })).data;
    console.log("Expo Push Token:", token); // Debugging log
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
};

export const setupNotificationListener = (expoPushToken, onNotification) => {
  const messageRef = ref(database, 'Devices/Outdoor Camera/Message');
  onValue(messageRef, (snapshot) => {
    const message = snapshot.val();
    console.log("Firebase message received:", message); // Debugging log
    if (message && message.includes("person(s)")) {
      sendNotification(expoPushToken, "Person Detected", "Person has been detected by your outdoor camera.");
      onNotification();
    }
  });
};

const sendNotification = async (expoPushToken, title, body) => {
  const message = {
    to: expoPushToken,
    sound: "default",
    title,
    body,
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      host: "exp.host",
      accept: "application/json",
      "accept-encoding": "gzip, deflate",
      "content-type": "application/json",
    },
    body: JSON.stringify(message),
  });

  console.log("Notification sent:", message); // Debugging log
};

import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, Platform, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import { registerForPushNotificationsAsync, setupNotificationListener } from "../lib/notifications";

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

// Initialize Firebase
initializeApp(firebaseConfig);
const database = getDatabase();

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    console.log("Registering for push notifications...");
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log("Token retrieved:", token); // Debugging log
        setExpoPushToken(token);
      })
      .catch((err) => console.log(err));

    if (expoPushToken) {
      setupNotificationListener(expoPushToken, () => {
        console.log("Notification handled"); // Debugging log
      });
    }
  }, [expoPushToken]);

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          {/* <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where security is the priority: embark on a journey of limitless
            security with Aora
          </Text> */}

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}

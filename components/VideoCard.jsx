import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { Link, router } from "expo-router";
import { resizeMode, Video } from "expo-av";
import { WebView } from "react-native-webview";

const VideoCard = ({
  video: {
    title,
    $id,
    thumbnail,
    camVideo,
    owner: { username, avatar },
  },
}) => {

  const laptopIp = '172.20.10.3';
  const flaskAppUrl = `http://${laptopIp}:5000/webcam`;


  const handlePress = () => {
    router.push({
      pathname: `/cameras/${$id}`,
      params: {
        cameraName: title,
        streamUrl: flaskAppUrl,
      },
    });
  };

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }} // later can change to icon
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      <TouchableOpacity
          activeOpacity={0.7}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          onPress={handlePress}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
        </TouchableOpacity>
    </View>
  );
};

export default VideoCard;

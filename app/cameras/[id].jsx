import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';


const CameraPage = () => {
    const { cameraName, streamUrl } = useLocalSearchParams();

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex-row justify-between items-center p-4">
        <Text className="text-white text-lg">{cameraName}</Text>
      </View>
      <View className="w-full h-60 bg-gray-800">
        <WebView 
          source={{ uri: streamUrl }}
        />
      </View>


    </SafeAreaView>
  );
}

export default CameraPage;

import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import EmptyState from '../../components/EmptyState'
import { getAllPost } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPost);

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data={posts}
        // data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome back</Text>
                <Text className="text-2xl font-psemibold text-white">Wai Lik</Text>
              </View>

              <View className="mt-1.5">
                <Image 
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode='contain'
                />
              </View>
            </View>

            {/* Temperature Box Container */}
            <View className="bg-gray-800 p-4 rounded-lg mb-5">
              <Text className="text-white text-lg font-semibold">Cozy Home</Text>
              <Text className="text-white text-4xl font-bold">30°C</Text>
              <View className="mt-2 flex-row justify-between">
                <View className="items-start">
                  <Text className="text-gray-400 font-psemibold">83.0%</Text>
                  <Text className="text-gray-400">Humidity</Text>
                </View>
                <View className="items-center">
                  <Text className="text-gray-400 font-psemibold">1002.4hPa</Text>
                  <Text className="text-gray-400">Air Pressure</Text>
                </View>
                <View className="items-end">
                  <Text className="text-gray-400 font-psemibold">2.1m/s</Text>
                  <Text className="text-gray-400">Wind Speed</Text>
                </View>
              </View>
            </View>


          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No device added"
            subtitle="Add your first device to get started"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }
      />
    </SafeAreaView>
  )
}

export default Home
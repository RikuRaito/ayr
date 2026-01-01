import { useHome } from "@/hooks/useHome";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { videos, isLoading, performGetVideos } = useHome();

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <View className="flex-1 justify-center items-center">
        <Text className="text-[22px] font-bold text-gray-900">ホーム</Text>
      </View>
      <View className="flex-1 justify-center items-center">
        {videos?.map((video) => (
          <Text key={video.videoId} className="">
            {video.title}
          </Text>
        ))}
      </View>
    </SafeAreaView>
  );
}

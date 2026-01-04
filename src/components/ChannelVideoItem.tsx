import { ChannelVideo } from "@/types/channel-videos";
import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

interface ChannelVideoItemProps {
  item: ChannelVideo;
}

export function ChannelVideoItem({ item }: ChannelVideoItemProps) {
  const [loading, setLoading] = useState(true);

  const onReady = () => {
    setLoading(false);
  };

  return (
    <View className="mb-6 overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800">
      <View className="relative w-full aspect-video bg-black">
        <YoutubePlayer height={210} videoId={item.videoId} onReady={onReady} />
        {loading && (
          <View className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
            <ActivityIndicator color="#000" />
          </View>
        )}
      </View>
      <View className="p-4">
        <Text
          className="text-[15px] font-bold text-gray-900 dark:text-white leading-5"
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text className="text-[13px] text-gray-500 dark:text-gray-400 mt-1">
          {new Date(item.publishedAt).toLocaleDateString("ja-JP")}
        </Text>
      </View>
    </View>
  );
}

import { supabase } from "@/lib/supabase";
import { ChannelVideoCardData } from "@/types/channel-videos";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

export const useChannelDetail = (playlistId: string) => {
  const [channelData, setChannelData] = useState<ChannelVideoCardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const performGetVideos = useCallback(async () => {
    if (!playlistId) {
      console.log("チャンネルの詳細の取得に失敗しました");
      Alert.alert("エラー", "チャンネルの動画の取得に失敗しました");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } =
        await supabase.functions.invoke<ChannelVideoCardData>(
          "get-channel-videos",
          { body: { playlistId } }
        );

      if (error) throw error;
      setChannelData(data);
    } catch (error) {
      console.error("Failed to fetch channel videos:", error);
      Alert.alert("エラー", "チャンネルの動画の取得に失敗しました");
    } finally {
      setIsLoading(false);
    }
  }, [playlistId]);

  useEffect(() => {
    performGetVideos();
  }, [performGetVideos]);

  return { channelData, isLoading, performGetVideos };
};

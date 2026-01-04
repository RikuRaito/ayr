//ホーム画面でチャンネルのアイコンをタップした時に表示される、動画一覧表示画面の実装で必要な型
export interface ChannelVideo {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

export interface ChannelVideoCardData {
  channelId: string;
  channelTitle: string;
  videos: ChannelVideo[];
}

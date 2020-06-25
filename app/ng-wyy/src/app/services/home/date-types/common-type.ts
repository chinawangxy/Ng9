export type Banner = {
  targetId: number;
  url: string;
  imageUrl: string;
};

export type HotTag = {
  id: number;
  name: string;
  position: number;
};

export type SongSheet = {
  id: number;
  name: string;
  playCount: number;
  picUrl: string;
  tracks: Song[];
};

export type Singer = {
  id: number;
  name: string;
  albumSize: number;
  picUrl: string;
};

// 歌曲
export type Song = {
  id: number;
  name: string;
  url: String;
  ar: Singer[];
  al: {
    id: number;
    name: string;
    picUrl: string;
  };
  dt: number; // 播放时长
};
// 播放地址
export type SongUrl = {
  id: number;
  url: string;
};

import { playMode } from 'src/app/share/wyy-ui/wyy-player/player-type';
import { Song } from 'src/app/services';
import { createReducer, on, Action } from '@ngrx/store';
import {
  setPlaying,
  setPlayList,
  setSongList,
  setPlayMode,
  setCurrentIndex,
} from '../actions/player.actions';

/**
 * 定义元数据
 * 定义调度器 注册调度器动作
 */

export type PlayState = {
  // 播放状态
  playing: boolean;
  // 模式
  playMode: playMode;
  // 歌曲列表
  songList: Song[];
  // 播放列表
  playList: Song[];
  // 当前正在播放的索引
  currentIndex: number;
};

// 初始化 state 数据
export const initialState: PlayState = {
  playing: false,
  songList: [],
  playList: [],
  playMode: { type: 'loop', label: '循环' },
  currentIndex: -1,
};

// 创建 reducer 函数，定义事件 ==》调度器 逻辑
const reducer = createReducer(
  initialState,
  on(setPlaying, (state, { playing }) => ({
    ...state,
    playing,
  })),
  on(setPlayList, (state, { playList }) => ({
    ...state,
    playList,
  })),
  on(setSongList, (state, { songList }) => ({
    ...state,
    songList,
  })),
  on(setPlayMode, (state, { playMode }) => ({
    ...state,
    playMode,
  })),
  on(setCurrentIndex, (state, { currentIndex }) => ({
    ...state,
    currentIndex,
  }))
);

// 调度器入口
export function playerReducer(
  state: PlayState,
  action: Action
) {
  return reducer(state, action);
}

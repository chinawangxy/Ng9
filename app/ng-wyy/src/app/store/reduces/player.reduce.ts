import { playMode } from 'src/app/share/wyy-ui/wyy-player/player-type';
import { Song } from 'src/app/services';
import { createReducer, on } from '@ngrx/store';
import { setPlaying } from '../actions/player.actions';

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

// 初始化 state
export const initialState: PlayState = {
  playing: false,
  songList: [],
  playList: [],
  playMode: { type: 'loop', label: '循环' },
  currentIndex: -1,
};

// 创建 reducer 函数
const reducer = createReducer(
  initialState,
  on(setPlaying, (state, { playing }) => ({
    ...state,
    playing,
  }))
);

/* export const setPlaying = createAction(
  '[player] Set playing',
  props<{ playing: boolean }>()
);
export const setPlayList = createAction(
  '[player] Set playList',
  props<{ list: Song[] }>()
);
export const setSongList = createAction(
  '[player] Set songList',
  props<{ list: Song[] }>()
);
export const setPlayMode = createAction(
  '[player] Set playMode',
  props<{ mode: playMode }>()
);
export const setCurrentIndex = createAction(
  '[player] Set CurrentIndex',
  props<{ index: number }>()
);
 */

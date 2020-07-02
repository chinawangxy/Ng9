import { PlayState } from '../reduces/player.reduce';
import { createAction, props } from '@ngrx/store';
import { Song } from 'src/app/services';
import { playMode } from 'src/app/share/wyy-ui/wyy-player/player-type';

const selectPlayerStates = (state: PlayState) => state;

// 定义动作
export const setPlaying = createAction(
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

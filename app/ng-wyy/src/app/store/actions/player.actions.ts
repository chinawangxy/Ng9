import { PlayState } from '../reduces/player.reduce';
import { createAction, props } from '@ngrx/store';
import { Song } from 'src/app/services';
import { playMode } from 'src/app/share/wyy-ui/wyy-player/player-type';

/**
 *
 * 动作即行为 ，定义具体动作
 */

const selectPlayerStates = (state: PlayState) => state;

// 定义动作
export const setPlaying = createAction(
  '[player] Set playing',
  props<{ playing: boolean }>()
);
export const setPlayList = createAction(
  '[player] Set playList',
  props<{ playList: Song[] }>()
);
export const setSongList = createAction(
  '[player] Set songList',
  props<{ songList: Song[] }>()
);
export const setPlayMode = createAction(
  '[player] Set playMode',
  props<{ playMode: playMode }>()
);
export const setCurrentIndex = createAction(
  '[player] Set CurrentIndex',
  props<{ currentIndex: number }>()
);

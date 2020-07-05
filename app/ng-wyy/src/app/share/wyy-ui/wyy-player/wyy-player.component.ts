import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  getSongList,
  getPlayList,
  getCurrentIndex,
  getPlayMode,
  getCurrentSong,
} from 'src/app/store/selectors/player.selector';
import { PlayState } from 'src/app/store/reduces/player.reduce';
import { Song } from 'src/app/services';

@Component({
  selector: 'app-wyy-player',
  templateUrl: './wyy-player.component.html',
  styleUrls: ['./wyy-player.component.less'],
})
export class WyyPlayerComponent
  implements OnInit, AfterViewInit {
  @ViewChild('audio', { static: true })
  audio: ElementRef;

  private audioEl: HTMLAudioElement;

  sliderValue = 35;
  bufferOffset = 75;

  songList: Song[];
  playList: Song[];
  currentSong: Song;
  currentIndex: number;

  constructor(
    private store$: Store<{ player: PlayState }>
  ) {
    const appStore$ = this.store$.pipe(select('player'));

    const stateArr = [
      {
        type: getSongList,
        cd: (list) => this.watchList(list, 'songList'),
      },
      {
        type: getPlayList,
        cd: (list) => this.watchList(list, 'playerList'),
      },
      {
        type: getCurrentIndex,
        cd: (index) => this.watchCurrentIndex(index),
      },
      {
        type: getPlayMode,
        cd: (mode) => this.watchPlayMode(mode),
      },
      {
        type: getCurrentSong,
        cd: (song) => this.watchCurrentSong(song),
      },
    ];
    stateArr.forEach((item) => {
      appStore$.pipe(select(item.type)).subscribe(item.cd);
    });
  }
  ngAfterViewInit(): void {
    this.audioEl = this.audio.nativeElement;
  }

  ngOnInit() {}

  canPlay() {
    this.play();
  }

  private play() {
    this.audioEl.play();
  }

  private watchList(list: Song[], type: string) {
    console.log(list, type);
    this[type] = list;
  }

  private watchCurrentIndex(index: number) {
    console.log(index);
    this.currentIndex = index;
  }

  private watchPlayMode(mode) {
    console.log(mode);
  }

  private watchCurrentSong(song) {
    console.log('song', song);
    this.currentSong = song;
  }
}

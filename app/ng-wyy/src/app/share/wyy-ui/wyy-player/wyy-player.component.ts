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
import { Song } from 'src/app/services';
import { AppStoreModule } from 'src/app/store';
import {
  playerReducer,
  PlayState,
} from 'src/app/store/reduces/player.reduce';

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
    private store$: Store<{ player: PlayState }> // private store$: Store<AppStoreModule>
  ) {
    const appStore$ = this.store$.pipe(select('player'));
    appStore$
      .pipe(select(getSongList))
      .subscribe((list) =>
        this.watchList(list, 'songList')
      );
    appStore$
      .pipe(select(getPlayList))
      .subscribe((list) =>
        this.watchList(list, 'playList')
      );
    appStore$
      .pipe(select(getCurrentIndex))
      .subscribe((index) => this.watchCurrentIndex(index));
    appStore$
      .pipe(select(getPlayMode))
      .subscribe((mode) => this.watchPlayMode(mode));
    appStore$
      .pipe(select(getCurrentIndex))
      .subscribe((index) => this.watchCurrentIndex(index));
    appStore$
      .pipe(select(getCurrentSong))
      .subscribe((action) => this.watchCurrentSong(action));
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

  get picUrl(): string {
    return this.currentSong
      ? this.currentSong.al.picUrl
      : 'http://s4.music.126.net/style/web2/img/default/default_album.jpg';
  }
}

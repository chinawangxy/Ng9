import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HomeService } from 'src/app/services/home/home.service';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import {
  Banner,
  HotTag,
  SongSheet,
  Singer,
} from 'src/app/services';
import { SingerService } from 'src/app/services/home/singer.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators';
import { HomeDataType } from '../home-resolve.service';
import { SheetService } from 'src/app/services/home/sheet.service';
import { AppStoreModule } from 'src/app/store';
import { Store } from '@ngrx/store';
import {
  setPlayList,
  setSongList,
  setCurrentIndex,
} from 'src/app/store/actions/player.actions';

@Component({
  selector: 'app-my-home',
  templateUrl: './my-home.component.html',
  styleUrls: ['./my-home.component.less'],
})
export class MyHomeComponent implements OnInit {
  banners: Banner[];
  hotTags: HotTag[];
  songSheetList: SongSheet[];
  singers: Singer[];
  carouselIndex: number = 0;

  @ViewChild(NzCarouselComponent, { static: true })
  private nzCarousel: NzCarouselComponent;

  constructor(
    private homeService: HomeService,
    private singerService: SingerService,
    private router: ActivatedRoute,
    private sheetService: SheetService,
    private store$: Store<AppStoreModule>
  ) {}

  ngOnInit() {
    this.router.data
      .pipe(map((res) => res.homeDatas))
      .subscribe(
        ([
          banners,
          hotTags,
          songSheetList,
          singers,
        ]: HomeDataType) => {
          // 通过守卫 获取 数据 初始化页面
          this.banners = banners;
          this.hotTags = hotTags;
          this.songSheetList = songSheetList;
          this.singers = singers;
        }
      );
  }

  onBeforeChange({ to }) {
    this.carouselIndex = to;
  }

  onChangeSlide(type: 'pre' | 'next') {
    this.nzCarousel[type]();
  }

  onPlaySheet(id: number) {
    console.log('id', id);
    this.sheetService.playSheet(id).subscribe((list) => {
      // console.log('res:', res);
      this.store$.dispatch(setSongList({ songList: list }));
      this.store$.dispatch(setPlayList({ playList: list }));
      this.store$.dispatch(
        setCurrentIndex({ currentIndex: 0 })
      );
    });
  }
}

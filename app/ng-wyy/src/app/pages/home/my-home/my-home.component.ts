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
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.data
      .pipe(map((res) => res.homeDatas))
      .subscribe((res) => {
        this.banners = res[0];
        this.hotTags = res[1];
        this.songSheetList = res[2];
        this.singers = res[3];
      });
    // this.getBanners();
    // this.getHotTags();
    // this.getPersonalizedSheetList();
    // this.getEnterSingers();
  }

  onBeforeChange({ to }) {
    this.carouselIndex = to;
  }

  onChangeSlide(type: 'pre' | 'next') {
    this.nzCarousel[type]();
  }

  private getBanners() {
    this.homeService.getBanner().subscribe((banners) => {
      // console.log('banners', banners);
      this.banners = banners;
    });
  }

  private getHotTags() {
    this.homeService.getHotTags().subscribe((tags) => {
      // console.log('tags', tags);
      this.hotTags = tags;
    });
  }

  private getPersonalizedSheetList() {
    this.homeService
      .getPersonalSheetList()
      .subscribe((sheets) => {
        // console.log('sheets', sheets);
        this.songSheetList = sheets;
      });
  }

  private getEnterSingers() {
    this.singerService
      .getEnterSinger()
      .subscribe((singers) => {
        console.log('singers', singers);
        this.singers = singers;
      });
  }
}

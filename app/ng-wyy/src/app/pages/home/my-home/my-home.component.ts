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
} from 'src/app/services';

@Component({
  selector: 'app-my-home',
  templateUrl: './my-home.component.html',
  styleUrls: ['./my-home.component.less'],
})
export class MyHomeComponent implements OnInit {
  banners: Banner[];
  hotTags: HotTag[];
  songSheetList: SongSheet[];
  carouselIndex: number = 0;

  @ViewChild(NzCarouselComponent, { static: true })
  private nzCarousel: NzCarouselComponent;

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.getBanners();
    this.getHotTags();
    this.getPersonalizedSheetList();
  }

  onBeforeChange({ to }) {
    this.carouselIndex = to;
  }

  onChangeSlide(type: 'pre' | 'next') {
    this.nzCarousel[type]();
  }

  private getBanners() {
    this.homeService.getBanner().subscribe((banners) => {
      console.log('banners', banners);
      this.banners = banners;
    });
  }

  private getHotTags() {
    this.homeService.getHotTags().subscribe((tags) => {
      console.log('tags', tags);
      this.hotTags = tags;
    });
  }

  private getPersonalizedSheetList() {
    this.homeService
      .getPersonalSheetList()
      .subscribe((sheets) => {
        console.log('sheets', sheets);
        this.songSheetList = sheets;
      });
  }
}

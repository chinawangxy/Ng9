import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { HomeService } from 'src/app/services/home/home.service';
import { SingerService } from 'src/app/services/home/singer.service';
import {
  HotTag,
  SongSheet,
  Singer,
  Banner,
} from 'src/app/services';
import { take, first } from 'rxjs/internal/operators';

export type HomeDataType = [
  Banner[],
  HotTag[],
  SongSheet[],
  Singer[]
];

@Injectable({
  providedIn: 'root',
})
export class HomeResolveService
  implements Resolve<HomeDataType> {
  constructor(
    private homeService: HomeService,
    private singerService: SingerService
  ) {}

  resolve(): Observable<HomeDataType> {
    return forkJoin([
      this.homeService.getBanner(),
      this.homeService.getHotTags(),
      this.homeService.getPersonalSheetList(),
      this.singerService.getEnterSinger(),
    ]).pipe(first());
  }
}

import { Injectable, Inject } from '@angular/core';
import { ServicesModule } from '../services.module';
import { Observable, pipe } from 'rxjs';
import {
  Banner,
  HotTag,
  SongSheet,
} from './date-types/common-type';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { API_CONFIG } from 'src/app/core';

@Injectable({
  providedIn: ServicesModule,
})
export class HomeService {
  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private url: string
  ) {}

  getBanner(): Observable<Banner[]> {
    return this.http
      .get(`${this.url}banner`)
      .pipe(
        map((res: { banners: Banner[] }) => res.banners)
      );
  }

  getHotTags(): Observable<HotTag[]> {
    return this.http.get(`${this.url}playlist/hot`).pipe(
      map((res: { tags: HotTag[] }) => res.tags),
      map((res) =>
        res.sort(
          (x: HotTag, y: HotTag) => x.position - y.position
        )
      ),
      map((res) => res.splice(0, 5))
    );
  }

  getPersonalSheetList(): Observable<SongSheet[]> {
    return this.http.get(`${this.url}personalized`).pipe(
      map((res: { result: SongSheet[] }) => res.result),
      map((res) => res.slice(0, 16))
    );
  }
}

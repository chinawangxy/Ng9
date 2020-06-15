import { Injectable, Inject } from '@angular/core';
import { ServicesModule } from '../services.module';
import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';
import { API_CONFIG } from 'src/app/core';
import { Observable } from 'rxjs';
import { Singer } from './date-types/common-type';
import { map } from 'rxjs/internal/operators';
import queryString from 'query-string';

type singerParams = {
  offset: number;
  limit: number;
  cat?: string;
};

const defaultParams = {
  offset: 0,
  limit: 9,
  cat: '5001',
};

@Injectable({
  providedIn: ServicesModule,
})
export class SingerService {
  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private url: string
  ) {}

  getEnterSinger(
    args: singerParams = defaultParams
  ): Observable<Singer[]> {
    const params = new HttpParams({
      fromString: queryString.stringify(args),
    });

    return this.http
      .get(`${this.url}artist/list`, { params })
      .pipe(
        map((res: { artists: Singer[] }) => res.artists)
      );
  }
}

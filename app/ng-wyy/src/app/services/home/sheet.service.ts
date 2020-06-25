import { Injectable, Inject } from '@angular/core';
import { ServicesModule } from '../services.module';
import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';
import { API_CONFIG } from 'src/app/core';
import { SongSheet, Song } from './date-types/common-type';
import { Observable } from 'rxjs';
import {
  map,
  pluck,
  switchMap,
} from 'rxjs/internal/operators';
import { SongService } from './song.service';

@Injectable({
  providedIn: ServicesModule,
})
export class SheetService {
  constructor(
    private http: HttpClient,
    private songService: SongService,
    @Inject(API_CONFIG) private url: string
  ) {}

  getSongSheetDetail(id: number): Observable<SongSheet> {
    const params = new HttpParams().set(
      'id',
      id.toString()
    );
    return this.http
      .get(`${this.url}playlist/detail`, { params })
      .pipe(
        map((res: { playlist: SongSheet }) => res.playlist)
      );
  }

  playSheet(id: number): Observable<Song[]> {
    return this.getSongSheetDetail(id).pipe(
      pluck('tracks'),
      switchMap((tracks) =>
        this.songService.getSongList(tracks)
      )
    );
  }
}

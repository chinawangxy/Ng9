import { Injectable } from '@angular/core';
import { Hero } from '../../interfaces';
import { HEROES } from '../../mock';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  heroes: Hero[];
  private heroesUrl = 'api/heroes';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(
    private http: HttpClient,
    private ms: MessageService
  ) {}

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    // this.ms.add('HeroService: fetched heroes');
    this.log(`HeroService: fetched heroes`);
    // return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url).pipe(
      map((heroes) => heroes[0]), // returns a {0|1} element array
      tap((h) => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    // TODO 返回数据
    return this.http.get<Hero>(url).pipe(
      // TODO 发送日志
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http
      .get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap((x) =>
          x.length
            ? this.log(`found heroes matching "${term}"`)
            : this.log(`no heroes matching "${term}"`)
        ),
        catchError(
          this.handleError<Hero[]>('searchHeroes', [])
        )
      );
  }
  //////// Save methods //////////
  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http
      .post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) =>
          this.log(`added hero w/ id=${newHero.id}`)
        ),
        catchError(this.handleError<Hero>('addHero'))
      );
  }
  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http
      .delete<Hero>(url, this.httpOptions)
      .pipe(
        tap((_) => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }
  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http
      .put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((_) => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }
  /** @NOTE:异常处理 */
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   * 因为每个服务方法都会返回不同类型的 Observable 结果，
   * 因此 handleError() 也需要一个类型参数，
   * 以便它返回一个此类型的安全值，正如应用所期望的那样。
   */
  private handleError<T>(
    operation = 'operation',
    result?: T
  ) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure 将错误日志生成报告发给远端
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption 更好的错误转换内容显示给用户
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result. 返回一个空结果然程序继续运行
      return of(result as T);
    };
  }
  /** @NOTE: 常用日志 */
  private log(message: string) {
    this.ms.add(`HeroService: ${message}`);
  }
}

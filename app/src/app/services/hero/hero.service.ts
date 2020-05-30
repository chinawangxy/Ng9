import { Injectable } from '@angular/core';
import { Hero } from '../../interfaces';
import { HEROES } from '../../mock';
@Injectable({
  providedIn: 'root',
})
export class HeroService {
  heroes: Hero[];
  constructor() {}
  getHeroes(): void {}
}

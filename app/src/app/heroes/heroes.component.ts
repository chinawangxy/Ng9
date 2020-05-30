import { Component, OnInit } from '@angular/core';
import { Hero } from '../interfaces';
import { HEROES } from '../mock';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name: 'Windstorm',
  };

  heroes: Hero[] = HEROES;

  selectedHero: Hero;

  constructor() {}

  ngOnInit(): void {}

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}

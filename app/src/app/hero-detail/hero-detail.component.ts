import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../interfaces';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../services';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  // 通过路由参数获取英雄数据
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('id => ', id);
    this.heroService
      .getHero(id)
      .subscribe((hero) => (this.hero = hero));
  }

  // 返回
  goBack(): void {
    this.location.back();
  }

  // 报存
  save(): void {
    this.heroService
      .updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}

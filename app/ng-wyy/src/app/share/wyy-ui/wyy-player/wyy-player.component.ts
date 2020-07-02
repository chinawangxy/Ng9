import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wyy-player',
  templateUrl: './wyy-player.component.html',
  styleUrls: ['./wyy-player.component.less'],
})
export class WyyPlayerComponent implements OnInit {
  sliderValue = 35;
  bufferOffset = 75;
  constructor() {}

  ngOnInit() {}
}

import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { WySliderStyle } from './wy-silder-types';

@Component({
  selector: 'app-wyy-silder-track',
  template:
    '<div class="wy-slider-track" [class.buffer]="wyBuffer" [ngStyle]="style"></div> ',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WyySilderTrackComponent
  implements OnInit, OnChanges {
  @Input() wyVertical = false;
  @Input() wyLength: number;
  @Input() wyBuffer: boolean = false;
  style: WySliderStyle = {};
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['wyLength']) {
      if (this.wyVertical) {
        this.style.height = `${this.wyLength}%`;
        this.style.left = null;
        this.style.width = null;
      } else {
        this.style.width = `${this.wyLength}%`;
        this.style.bottom = null;
        this.style.height = null;
      }
    }
  }
}

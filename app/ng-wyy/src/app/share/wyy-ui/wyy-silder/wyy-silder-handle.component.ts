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
  selector: 'app-wyy-silder-handle',
  template:
    '<div class="wy-slider-handle" [ngStyle]="style"></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WyySilderHandleComponent
  implements OnInit, OnChanges {
  @Input() wyVertical = false;
  @Input() wyOffset: number;

  style: WySliderStyle = {};
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wyOffset']) {
      this.style[
        this.wyVertical ? 'bottom' : 'left'
      ] = `${this.wyOffset}%`;
    }
  }
}

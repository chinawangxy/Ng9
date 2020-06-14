import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-wyy-carousel',
  templateUrl: './wyy-carousel.component.html',
  styleUrls: ['./wyy-carousel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WyyCarouselComponent implements OnInit {
  @ViewChild('dot', { static: true })
  dotRef: TemplateRef<any>;

  @Input()
  activeIndex: number = 0;

  @Output()
  changeSlide = new EventEmitter<'pre' | 'next'>();

  constructor() {}

  ngOnInit() {}

  onChangeSlide(type: 'pre' | 'next') {
    this.changeSlide.emit(type);
  }
}

import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  Input,
  Inject,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import {
  fromEvent,
  merge,
  Observable,
  Subscription,
} from 'rxjs';
import {
  filter,
  tap,
  pluck,
  map,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs/internal/operators';
import {
  sliderEventObserverConfig,
  sliderEvent,
  inArray,
  getElementOffset,
  limitNumberInRange,
  SliderValue,
  getPercent,
} from './wy-silder-types';
import { DOCUMENT } from '@angular/common';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-wyy-silder',
  templateUrl: './wyy-silder.component.html',
  styleUrls: ['./wyy-silder.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WyySilderComponent
  implements OnInit, OnDestroy, ControlValueAccessor {
  private sliderDom: HTMLDivElement;

  @ViewChild('wySlider', { static: true })
  private wySlider: ElementRef;
  // 输入属性 模式 垂直还是水平 默认水平
  @Input() wyVertical = false;

  @Input() wyMin = 0;
  @Input() wyMax = 100;

  private isDragging: boolean = false;
  private value: SliderValue = null;
  public offset: SliderValue = null;

  private dragStart$: Observable<number>;
  private dragMove$: Observable<number>;
  private dragEnd$: Observable<Event>;
  private dragStart_: Subscription | null;
  private dragMove_: Subscription | null;
  private dragEnd_: Subscription | null;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // 保存 dom
    this.sliderDom = this.wySlider.nativeElement;
    // 创建 拖拽流
    this.createDraggingObservables();

    // 初始化订阅 start流
    this.subscribeDrag(['start']);
  }

  private createDraggingObservables() {
    // 判定 垂直还是水平
    const orientField = this.wyVertical ? 'pageY' : 'pageX';
    const mouse: sliderEventObserverConfig = {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup',
      filter: (e: MouseEvent) => e instanceof MouseEvent,
      pluckKey: [orientField],
    };

    const touch: sliderEventObserverConfig = {
      start: 'touchdown',
      move: 'touchmove',
      end: 'touchup',
      filter: (e: TouchEvent) => e instanceof TouchEvent,
      pluckKey: ['touch', '0', orientField],
    };

    [mouse, touch].forEach((source) => {
      const {
        start,
        move,
        end,
        filter: filterFun,
        pluckKey,
      } = source;
      source.startPlucked$ = fromEvent(
        this.sliderDom,
        start
      ).pipe(
        // 筛选数据
        filter(filterFun),
        tap(sliderEvent),
        pluck(...pluckKey),
        map((position: number) =>
          this.findClosestValue(position)
        )
      );

      source.end$ = fromEvent(this.doc, end);

      source.moveResolved$ = fromEvent(this.doc, move).pipe(
        // 筛选数据
        filter(filterFun),
        tap(sliderEvent),
        pluck(...pluckKey),
        distinctUntilChanged(),
        map((position: number) =>
          this.findClosestValue(position)
        ),
        takeUntil(source.end$)
      );

      this.dragStart$ = merge(
        mouse.startPlucked$,
        touch.startPlucked$
      );
      this.dragMove$ = merge(
        mouse.moveResolved$,
        touch.moveResolved$
      );
      this.dragEnd$ = merge(mouse.end$, touch.end$);
    });
  }

  private subscribeDrag(
    events: string[] = ['start', 'move', 'end']
  ) {
    // start 开始
    if (
      inArray(events, 'start') &&
      this.dragStart$ &&
      !this.dragStart_
    ) {
      this.dragStart_ = this.dragStart$.subscribe(
        this.onDragStart.bind(this)
      );
    }
    // 拖拽中 。。。
    if (
      inArray(events, 'move') &&
      this.dragMove$ &&
      !this.dragMove_
    ) {
      this.dragMove_ = this.dragMove$.subscribe(
        this.onDragMove.bind(this)
      );
    }
    // 结束
    if (
      inArray(events, 'end') &&
      this.dragEnd$ &&
      !this.dragEnd_
    ) {
      this.dragEnd_ = this.dragEnd$.subscribe(
        this.onDragEnd.bind(this)
      );
    }
  }

  private unsubscribeDrag(
    events: string[] = ['start', 'move', 'end']
  ) {
    // start 开始
    if (inArray(events, 'start') && this.dragStart_) {
      this.dragStart_.unsubscribe();
      this.dragStart_ = null;
    }

    // moveing 移动
    if (inArray(events, 'move') && this.dragMove_) {
      this.dragMove_.unsubscribe();
      this.dragMove_ = null;
    }

    // moveing 移动
    if (inArray(events, 'end') && this.dragEnd_) {
      this.dragEnd_.unsubscribe();
      this.dragEnd_ = null;
    }
  }

  private findClosestValue(position: number): number {
    // 获取滑块总长
    const sliderLength = this.getSliderLength();
    // 获取滑块 左端 或上端 点位置
    const sliderStart = this.getSliderStartPosition();
    // 获取当前位置 / 总长
    const ratio = limitNumberInRange(
      (position - sliderStart) / sliderLength,
      0,
      1
    );

    const ratioTrue = this.wyVertical ? 1 - ratio : ratio;

    return (
      ratioTrue * (this.wyMax - this.wyMin) + this.wyMin
    );
  }

  private onDragStart(value: number) {
    console.log('start:', value);
    // 定义解绑事件
    this.toggleDragMoving(true);
    // 点击当前进度
    this.setValue(value);
  }

  private onDragMove(value: number) {
    console.log('moving', value);
    if (this.isDragging) {
      this.setValue(value);
    }
  }

  private onDragEnd() {
    console.log('end');
    this.toggleDragMoving(false);
    // 手动触发检测
    this.cdr.markForCheck();
  }

  valueEqual(
    dataA: SliderValue,
    dataB: SliderValue
  ): boolean {
    if (typeof dataA !== typeof dataB) {
      return false;
    }
    return dataA === dataB;
  }

  private setValue(value: SliderValue) {
    if (this.valueEqual(this.value, value)) {
      return;
    }

    this.value = value;
    this.updateTrackAndHandles();
    // 手动触发检测
    this.cdr.markForCheck();
  }

  private updateTrackAndHandles() {
    this.offset = this.getValueToOffset(this.value);
    // 手动触发检测
    this.cdr.markForCheck();
  }

  getValueToOffset(value: SliderValue): SliderValue {
    return getPercent(this.wyMin, this.wyMax, value);
  }

  private toggleDragMoving(moveable: boolean) {
    this.isDragging = moveable;
    if (moveable) {
      this.subscribeDrag(['move', 'end']);
    } else {
      this.unsubscribeDrag(['move', 'end']);
    }
  }

  private getSliderLength(): number {
    return this.wyVertical
      ? this.sliderDom.clientHeight
      : this.sliderDom.clientWidth;
  }

  private getSliderStartPosition(): number {
    const offset = getElementOffset(this.sliderDom);
    return this.wyVertical ? offset.top : offset.left;
  }

  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }

  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }

  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.unsubscribeDrag();
  }
}

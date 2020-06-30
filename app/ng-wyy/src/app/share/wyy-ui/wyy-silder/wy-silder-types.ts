import { Observable } from 'rxjs';

export type WySliderStyle = {
  width?: string | null;
  height?: string | null;
  left?: string | null;
  bottom?: string | null;
};

export type sliderEventObserverConfig = {
  start: string;
  move: string;
  end: string;
  filter: (e: Event) => boolean;
  pluckKey: string[];
  startPlucked$?: Observable<number>;
  moveResolved$?: Observable<number>;
  end$?: Observable<Event>;
};

export type SliderValue = number | null;

export function sliderEvent(e: Event) {
  e.stopPropagation();
  e.preventDefault();
}

export function inArray(arr: any[], target: any): boolean {
  return arr.indexOf(target) !== -1;
}

export function getElementOffset(
  el: HTMLElement
): { top: number; left: number } {
  if (!el.getClientRects().length) {
    return {
      top: 0,
      left: 0,
    };
  }

  const rect = el.getBoundingClientRect();
  const win = el.ownerDocument.defaultView;
  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset,
  };
}

export function limitNumberInRange(data, min, max) {
  return Math.min(Math.max(data, min), max);
}

export function getPercent(
  min: number,
  max: number,
  val: number
) {
  return ((val - min) / (max - min)) * 100;
}

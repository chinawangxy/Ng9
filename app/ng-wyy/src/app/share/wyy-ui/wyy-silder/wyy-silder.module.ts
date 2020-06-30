import { NgModule } from '@angular/core';
import { WyySilderComponent } from './wyy-silder.component';
import { WyySilderTrackComponent } from './wyy-silder-track.component';
import { WyySilderHandleComponent } from './wyy-silder-handle.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [
    WyySilderComponent,
    WyySilderTrackComponent,
    WyySilderHandleComponent,
  ],
  exports: [WyySilderComponent],
})
export class WyySilderModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdComponentsModule } from './ngZorroAntdComponentsmodule';
import { WyUiModule } from './wyy-ui/wy-ui.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdComponentsModule,
    WyUiModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgZorroAntdComponentsModule,
    WyUiModule,
  ],
})
export class ShareModule {}

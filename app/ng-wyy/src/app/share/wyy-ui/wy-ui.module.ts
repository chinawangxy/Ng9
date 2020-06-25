import { NgModule } from '@angular/core';
import { SingleSheetComponent } from './single-sheet/single-sheet.component';
import { PlayCountPipe } from '../pipes/play-count.pipe';
import { WyyPlayerModule } from './wyy-player/wyy-player.module';

@NgModule({
  imports: [WyyPlayerModule],
  declarations: [SingleSheetComponent, PlayCountPipe],
  exports: [
    SingleSheetComponent,
    PlayCountPipe,
    WyyPlayerModule,
  ],
})
export class WyUiModule {}

import { NgModule } from '@angular/core';
import { WyyPlayerComponent } from './wyy-player.component';
import { WyySilderModule } from '../wyy-silder/wyy-silder.module';

@NgModule({
  declarations: [WyyPlayerComponent],
  imports: [WyySilderModule],
  exports: [WyyPlayerComponent],
})
export class WyyPlayerModule {}

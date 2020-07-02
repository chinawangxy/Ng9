import { NgModule } from '@angular/core';
import { WyyPlayerComponent } from './wyy-player.component';
import { WyySilderModule } from '../wyy-silder/wyy-silder.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WyyPlayerComponent],
  imports: [WyySilderModule, FormsModule],
  exports: [WyyPlayerComponent],
})
export class WyyPlayerModule {}

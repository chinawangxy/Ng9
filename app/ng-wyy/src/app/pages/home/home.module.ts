import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { ShareModule } from 'src/app/share/share.module';
import { HomeRoutes } from './home.routing';
import { MyHomeComponent } from '.';
import { WyyCarouselComponent } from './my-home/components/wyy-carousel';
import { MemberCardComponent } from './my-home/components/member-card/member-card.component';

@NgModule({
  imports: [ShareModule, HomeRoutes],
  declarations: [
    HomeComponent,
    MyHomeComponent,
    WyyCarouselComponent,
    MemberCardComponent,
  ],
})
export class HomeModule {}

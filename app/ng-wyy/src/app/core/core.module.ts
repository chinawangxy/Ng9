import {
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { ServicesModule } from '../services/services.module';
import { PagesModule } from '../pages/pages.module';
import { ShareModule } from '../share/share.module';
import { registerLocaleData } from '@angular/common';
import { API_CONFIG } from '.';
import { AppStoreModule } from '../store';

registerLocaleData(zh);

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppStoreModule,
    ServicesModule,
    PagesModule,
    ShareModule,
    AppRoutingModule,
  ],
  exports: [ShareModule, AppRoutingModule, PagesModule],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    {
      provide: API_CONFIG,
      useValue: 'http://localhost:3000/',
    },
  ],
})
export class CoreModule {
  constructor(
    @SkipSelf() @Optional() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule 只能被AppModule引入');
    }
  }
}

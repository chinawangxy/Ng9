import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { playerReducer } from './reduces/player.reduce';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    StoreModule.forRoot(
      {
        player: playerReducer,
      },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
        },
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 20,
      logOnly: environment.production,
    }),
  ],
  declarations: [],
})
export class AppStoreModule {}

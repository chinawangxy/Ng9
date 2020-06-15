import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MyHomeComponent } from './my-home/my-home.component';
import { HomeResolveService } from './home-resolve.service';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: MyHomeComponent,
        data: {
          title: '首页',
        },
        resolve: {
          homeDatas: HomeResolveService,
        },
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

export const HomeRoutes = RouterModule.forChild(routes);

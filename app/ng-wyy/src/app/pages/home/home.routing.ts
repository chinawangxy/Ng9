import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MyHomeComponent } from './my-home/my-home.component';

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

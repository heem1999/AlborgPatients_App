import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../Provider/AuthGuard.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../Pages/home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'appointment',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../Pages/my-appointment/my-appointment.module').then(m => m.MyAppointmentPageModule),
            canActivate:[AuthGuard]
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../Pages/profile/profile.module').then(m => m.ProfilePageModule),
            canActivate:[AuthGuard]
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './authentication/page404/page404.component';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { AuthGuard } from './shared/security/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      // { path: '', redirectTo: '/authentication/signin', pathMatch: 'full' },

      { path: '', redirectTo: './maestros/maestros.module', pathMatch: 'full' },

      {
        path: 'maestros',
        loadChildren: () =>
          import('./maestros/maestros.module').then(m => m.MaestrosModule)
      },
      {
        path: 'despachos',
        loadChildren: () => import('./despachos/despachos.module').then(m => m.DespachosModule)
      },
      {
        path: 'ubicacionVehiculo',
        loadChildren: () => import('./ubicacion-vehiculo/ubicacion-vehiculo.module').then(m => m.UbicacionVehiculoModule)
      },
      {
        path: 'capacidad',
        loadChildren: () => import('./ubicacion-vehiculo/capacidad-disponible/capacidad-disponible.module').then(m => m.CapacidadDisponibleModule)
      },
      { 
        path: 'inboxDespacho', 
        loadChildren: () => import('./inbox/inbox.module').then(m => m.InboxModule) 
      },
      {
        path: 'extra-pages',
        loadChildren: () =>
          import('./extra-pages/extra-pages.module').then(
            (m) => m.ExtraPagesModule
          )
      }
    ]
  },
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      )
  },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UbicacionVehiculoComponent } from './ubicacion-vehiculo.component';

const routes: Routes = [

  { 
    path: '', 
    component: UbicacionVehiculoComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UbicacionVehiculoRoutingModule { }

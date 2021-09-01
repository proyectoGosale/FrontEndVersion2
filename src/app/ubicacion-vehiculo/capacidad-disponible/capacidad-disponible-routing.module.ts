import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CapacidadDisponibleComponent } from './capacidad-disponible.component';

const routes: Routes = [

  { 
    path: '', 
    component: CapacidadDisponibleComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  CapacidadDisponibleRoutingModule { }

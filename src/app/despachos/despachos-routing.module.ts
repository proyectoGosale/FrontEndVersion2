import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DespachosComponent } from './despachos.component';
import { FormDespachoComponent } from './form-despacho/form-despacho.component';

const routes: Routes = [
  { path: '', component: DespachosComponent },
  { path: 'form/:id', component: FormDespachoComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DespachosRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormDespachosComponent } from './gestion-despachos/gestion-despachos.component';

import { InboxComponent } from './inbox.component';

const routes: Routes = 
[
  { 
    path: '', component: InboxComponent 
  },
  {
     path: 'form/:id', component:FormDespachosComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }

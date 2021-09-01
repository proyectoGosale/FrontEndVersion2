import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DespachosRoutingModule } from './despachos-routing.module';
import { DespachosComponent } from './despachos.component';
import { FormDespachoComponent } from './form-despacho/form-despacho.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { ListaDespachosComponent } from './lista-despachos/lista-despachos.component';
import { ModalDespachosComponent } from './modal-despachos/modal-despachos.component';


@NgModule({
  declarations: [DespachosComponent, FormDespachoComponent, ListaDespachosComponent, ModalDespachosComponent],
  imports: [
    CommonModule,
    DespachosRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSortModule,

  ]
})
export class DespachosModule { }

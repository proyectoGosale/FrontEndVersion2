import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaestrosRoutingModule } from './maestros-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ColorPickerModule } from 'ngx-color-picker';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { ReferenciasComponent } from './referencias/referencias.component';
import { ReferenciasFormComponent } from './referencias/referencias-form/referencias-form.component';
import { ZonaComercialComponent } from './zona-comercial/zona-comercial.component';
import { FormZonaComercialComponent } from './zona-comercial/form-zona-comercial/form-zona-comercial.component';
import { ClientesComponent } from './clientes/clientes.component';
import { VendedoresComponent } from './vendedores/vendedores.component';
import { FormVendedoresComponent } from './vendedores/form-vendedores/form-vendedores.component';
import { FormClientesComponent } from './clientes/form-clientes/form-clientes.component';
import { VisitasComponent } from './visitas/visitas.component';
import { FormVisitasComponent } from './visitas/form-visitas/form-visitas.component';
import { ProductosComponent } from './productos/productos.component';
import { FormProductosComponent } from './productos/form-productos/form-productos.component';
import { ListCategoryComponent } from './productos/list-category/list-category.component';
import { FacturasComponent } from './facturas/facturas.component';
import { FormFacturasComponent } from './facturas/form-facturas/form-facturas.component';
import { CrudProductosComponent } from './productos/crud-productos/crud-productos.component';
import { FormCrudProductosComponent } from './productos/crud-productos/form-crud-productos/form-crud-productos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { FormCategoriasComponent } from './categorias/form-categorias/form-categorias.component';



@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioFormComponent,
    ReferenciasComponent,
    ReferenciasFormComponent,
    ZonaComercialComponent,
    FormZonaComercialComponent,
    ClientesComponent,
    VendedoresComponent,
    FormVendedoresComponent,
    FormClientesComponent,
    VisitasComponent,
    FormVisitasComponent,
    ProductosComponent,
    FormProductosComponent,
    ListCategoryComponent,
    FacturasComponent,
    FormFacturasComponent,
    CrudProductosComponent,
    FormCrudProductosComponent,
    CategoriasComponent,
    FormCategoriasComponent,
  ],
  imports: [
    CommonModule,
    MaestrosRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatDatepickerModule,
    ScrollingModule,
    MatDialogModule,
    MatSortModule,
    MaterialFileInputModule,
    MatMenuModule,
    ColorPickerModule,

  ],
  exports: []
})
export class MaestrosModule { }

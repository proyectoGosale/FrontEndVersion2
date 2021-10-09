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
import { ModalVisitasComponent } from './visitas/modal-visitas/modal-visitas.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { FormCategoriaComponent } from './categoria/form-categoria/form-categoria.component';
import { CompaniaComponent } from './compania/compania.component';
import { FormCompaniaComponent } from './compania/form-compania/form-compania.component';
import { CuentasPorCobrarComponent } from './cuentas-por-cobrar/cuentas-por-cobrar.component';
import { NotasDeCreditoComponent } from './notas-de-credito/notas-de-credito.component';
import { DevolucionesComponent } from './devoluciones/devoluciones.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { OrdenPedidoComponent } from './orden-pedido/orden-pedido.component';
import { FormCuentasPorCobrarComponent } from './cuentas-por-cobrar/form-cuentas-por-cobrar/form-cuentas-por-cobrar.component';
import { FormNotasCreditoComponent } from './notas-de-credito/form-notas-credito/form-notas-credito.component';
import { FormDevolucionesComponent } from './devoluciones/form-devoluciones/form-devoluciones.component';
import { FormCotizacionComponent } from './cotizacion/form-cotizacion/form-cotizacion.component';
import { FormOrdenPedidoComponent } from './orden-pedido/form-orden-pedido/form-orden-pedido.component';
import { ColeccionComponent } from './coleccion/coleccion.component';
import { FormColeccionComponent } from './coleccion/form-coleccion/form-coleccion.component';



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
    ModalVisitasComponent,
    CategoriaComponent,
    FormCategoriaComponent,
    CompaniaComponent,
    FormCompaniaComponent,
    CuentasPorCobrarComponent,
    NotasDeCreditoComponent,
    DevolucionesComponent,
    CotizacionComponent,
    OrdenPedidoComponent,
    FormCuentasPorCobrarComponent,
    FormNotasCreditoComponent,
    FormDevolucionesComponent,
    FormCotizacionComponent,
    FormOrdenPedidoComponent,
    ColeccionComponent,
    FormColeccionComponent,
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

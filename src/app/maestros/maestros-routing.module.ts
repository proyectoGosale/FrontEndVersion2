import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { FormCategoriaComponent } from './categoria/form-categoria/form-categoria.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormClientesComponent } from './clientes/form-clientes/form-clientes.component';
import { CompaniaComponent } from './compania/compania.component';
import { FormCompaniaComponent } from './compania/form-compania/form-compania.component';
import { FacturasComponent } from './facturas/facturas.component';
import { FormFacturasComponent } from './facturas/form-facturas/form-facturas.component';
import { CrudProductosComponent } from './productos/crud-productos/crud-productos.component';
import { FormCrudProductosComponent } from './productos/crud-productos/form-crud-productos/form-crud-productos.component';
import { FormProductosComponent } from './productos/form-productos/form-productos.component';
import { ListCategoryComponent } from './productos/list-category/list-category.component';
import { ProductosComponent } from './productos/productos.component';
import { ReferenciasFormComponent } from './referencias/referencias-form/referencias-form.component';
import { ReferenciasComponent } from './referencias/referencias.component';

import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { FormVendedoresComponent } from './vendedores/form-vendedores/form-vendedores.component';
import { VendedoresComponent } from './vendedores/vendedores.component';
import { FormVisitasComponent } from './visitas/form-visitas/form-visitas.component';
import { VisitasComponent } from './visitas/visitas.component';
import { FormZonaComercialComponent } from './zona-comercial/form-zona-comercial/form-zona-comercial.component';
import { ZonaComercialComponent } from './zona-comercial/zona-comercial.component';



const routes: Routes = [
    {
        path: '',
        redirectTo: 'usuario',
        pathMatch: 'full'
    },
    {
        path: 'usuario',
        children: [
            {
                path: '',
                component: UsuarioComponent
            },
            {
                path: 'form/:id',
                component: UsuarioFormComponent
            }
        ]
    },
    {
        path: 'visitas',
        children: [
            {
                path: '',
                component: VisitasComponent
            },
            {
                path: 'form/:id',
                component: FormVisitasComponent
            }
        ]
    },
    {
        path: 'referencias',
        children: [
            {
                path: '',
                component: ReferenciasComponent
            },
            {
                path: 'form/:id',
                component: ReferenciasFormComponent
            }
        ]
    },
    {
        path: 'zonas',
        children: [
            {
                path: '',
                component: ZonaComercialComponent
            },
            {
                path: 'form/:id',
                component: FormZonaComercialComponent
            }
        ]
    },
    {
        path: 'categorias',
        children: [
            {
                path: '',
                component: CategoriaComponent
            },
            {
                path: 'form/:id',
                component: FormCategoriaComponent
            }
        ]
    },
    {
        path: 'vendedores',
        children: [
            {
                path: '',
                component: VendedoresComponent
            },
            {
                path: 'form/:id',
                component: FormVendedoresComponent
            }
        ]
    },
    {
        path: 'clientes',
        children: [
            {
                path: '',
                component: ClientesComponent
            },
            {
                path: 'form/:id',
                component: FormClientesComponent
            },
        ]
    },
    {
        path: 'productos',
        children: [
            {
                path: '',
                component: ProductosComponent
            },
            {
                path: 'listCategory/:id',
                children: [
                    {
                        path: '',
                        component: ListCategoryComponent
                    },
                    {
                        path: 'form/:id',
                        component: FormProductosComponent
                    }
                ]
            },
            {
                path: 'listProductos',
                children: [
                    {
                        path: '',
                        component: CrudProductosComponent
                    },
                    {
                        path: 'form/:id',
                        component: FormCrudProductosComponent
                    },
                ]
            },
        ]
    },

    {
        path: 'facturas',
        children: [
            {
                path: '',
                component: FacturasComponent
            },
            {
                path: 'form/:id',
                component: FormFacturasComponent
            },
        ]
    },
    {
        path: 'compania',
        children: [
            {
                path: '',
                component: CompaniaComponent
            },
            {
                path: 'form/:id',
                component: FormCompaniaComponent
            },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaestrosRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlmacenComponent } from './almacen/almacen.component';
import { FormAlmacenComponent } from './almacen/form-almacen/form-almacen.component';
import { SeccionFormComponent } from './almacen/seccion/seccion-form/seccion-form.component';
import { SeccionComponent } from './almacen/seccion/seccion.component';
import { AddressClientesComponent } from './clientes/address-clientes/address-clientes.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormClientesComponent } from './clientes/form-clientes/form-clientes.component';
import { ColorFormComponent } from './color/color-form/color-form.component';
import { ColorComponent } from './color/color.component';
import { ReferenciasFormComponent } from './referencias/referencias-form/referencias-form.component';
import { ReferenciasComponent } from './referencias/referencias.component';

import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { FormVendedoresComponent } from './vendedores/form-vendedores/form-vendedores.component';
import { VendedoresComponent } from './vendedores/vendedores.component';
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
        path: 'almacen',
        children: [
            {
                path: '',
                component: AlmacenComponent
            },
            {
                path: 'form/:id',
                component: FormAlmacenComponent
            },
            {
                path: 'seccion',
                children: [
                    {
                        path: ':id',
                        component: SeccionComponent
                    },
                    {
                        path: ':idAlmacen/form/:id',
                        component: SeccionFormComponent
                    }
                ]
            },
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
            {
                path: 'formAddress/:id/:idCliente',
                component: AddressClientesComponent
            }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaestrosRoutingModule { }

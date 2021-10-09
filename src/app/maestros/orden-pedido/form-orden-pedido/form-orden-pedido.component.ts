import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';
import { ClientesService } from 'src/services/clientes.service';
import { CotizacionService } from 'src/services/cotizacion.service';
import { CuentasPorCobrarService } from 'src/services/cuentas-por-cobrar.service';
import { OrdenPedidoService } from 'src/services/orden-pedido.service';
import { VendedoresService } from 'src/services/vendedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-orden-pedido',
  templateUrl: './form-orden-pedido.component.html',
  styleUrls: ['./form-orden-pedido.component.sass']
})
export class FormOrdenPedidoComponent implements OnInit {

  listStatus: any[] = [
    {
      nombre: 'Elaboracion'
    },
    {
      nombre: 'Anulado'
    },
    {
      nombre: 'Aprobado'
    },
  ]
  listCuentasPorCobrar: any[] = [];
  idCliente: number = 0;
  idVendedor: number = 0;
  clientes: any;
  vendedor: any[] = [];
  listClientes: any[] = [];
  listVendedores: any[] = [];
  idPorCliente = 0;
  form: FormGroup;
  currentId = 0;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private ordenPedidoService: OrdenPedidoService,
    private clientesService: ClientesService,
    private vendedoresService: VendedoresService,
    private cuentasPorCobrarService:CuentasPorCobrarService
  ) { }

  ngOnInit(): void {

    this.route.params.pipe(
      filter(params => params.id > 0),
      mergeMap((params) => {
        this.alertService.showLoading();
          return this.ordenPedidoService.getById(params.id)
        }
      )).subscribe((cliente) => {
        let clientes = cliente.data;
        this.clientes = cliente.data
        this.form.patchValue(clientes);
        this.currentId = clientes.id;
        this.alertService.hideSwal();
        console.log(this.clientes);
        
    })

    this.buildForm();
    this.getClientes();
    this.getVendedores();
    this.getCuentasPorCobrar();
  }

  getClientes() {
    this.alertService.showLoading();
    this.clientesService.getAll().subscribe(resp => {
      this.listClientes = resp.data;
      this.alertService.hideSwal();
    })
  }

  getVendedores() {
    this.alertService.showLoading();
    this.vendedoresService.getAll().subscribe(resp => {
      this.listVendedores = resp.data;
      this.alertService.hideSwal();
    })
  }

  getCuentasPorCobrar() {
    this.alertService.showLoading();
    this.cuentasPorCobrarService.getAll().subscribe(resp => {
      this.listCuentasPorCobrar = resp.data;
      this.alertService.hideSwal();
    })
  }

  cliente(idCliente) {
    return this.listClientes.find(x => x.id == idCliente)
  }

  vendedores(idVendedor) {
    return this.listVendedores.find(x => x.id == idVendedor)
  }

  submit() {
    if (this.form.valid) {
      let item = this.form.value;
      this.alertService.showLoading();
      if (this.currentId > 0) {
        item.id = this.currentId;
        item.client_id = this.clientes.client_id;
        item.user_id = this.clientes.user_id;
        item.date = this.clientes.date;
        item.document_type = this.clientes.document_type;
        this.ordenPedidoService.update2(this.currentId, item).subscribe((res) => {
          this.alertService.showSuccess();
          this.router.navigate(['./maestros/ordenPedido'])
        });
      }
    } else {
    }
  }

  buildForm() {
    this.form = this.fb.group({
      date_of_delivery: ['', Validators.required],
      due_date: ['', Validators.required],
      status: ['', Validators.required],
      quantity: ['', Validators.required],
      subtotal: ['', Validators.required],
      discount: ['', Validators.required],
      tax: ['', Validators.required],
      total: ['', Validators.required],
      accounts_receivable_id: ['', Validators.required]
    })
  }

  cancel() {
    Swal.fire({
      title: 'Atencion',
      text: 'Se perderan los cambios no guardados,¿Seguro?',
      icon: 'question',
      cancelButtonText: 'No',
      confirmButtonText: 'Si, continuar',
      showCancelButton: true

    }).then((response) => {
      if (!response.dismiss) {
        this.router.navigate(['./maestros/ordenPedido'])
      }
    })
  }


}

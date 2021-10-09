import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';
import { ClientesService } from 'src/services/clientes.service';
import { CuentasPorCobrarService } from 'src/services/cuentas-por-cobrar.service';
import { DevolucionesService } from 'src/services/devoluciones.service';
import { VendedoresService } from 'src/services/vendedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-devoluciones',
  templateUrl: './form-devoluciones.component.html',
  styleUrls: ['./form-devoluciones.component.sass']
})
export class FormDevolucionesComponent implements OnInit {

  listStatus: any[] = [
    {
      nombre: 'Aprobado'
    },
    {
      nombre: 'Pagado'
    },
    {
      nombre: 'Anulado'
    },
    {
      nombre: 'Elaborado'
    }
  ]
  vendedor: any[] = [];
  cliente: any[] = [];
  listVendedores: any[] = [];
  listClientes: any[] = [];
  idPorCliente = 0;
  form: FormGroup;
  currentId = 0;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private clientesService: ClientesService,
    private vendedoresService: VendedoresService,
    private devolucionesService: DevolucionesService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getVendedores();
    this.getClientes();
    this.route.params.pipe(
      filter(params => params.id > 0),
      mergeMap((params) => {
        this.alertService.showLoading();
          return this.devolucionesService.getById(params.id)
        }
      )).subscribe((cliente) => {
        let clientes = cliente.data
        this.form.patchValue(clientes);
        this.currentId = clientes.id;
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

  getClientes() {
    this.alertService.showLoading();
    this.clientesService.getAll().subscribe(resp => {
      this.listClientes = resp.data;
      this.alertService.hideSwal();
    })
  }

  submit() {
    if (this.form.valid) {
      let item = this.form.value;
      this.alertService.showLoading();
      item.id = this.currentId;
      if (this.currentId > 0) {
        this.devolucionesService.update2(this.currentId, item).subscribe((res) => {
          this.alertService.showSuccess();
          this.router.navigate(['./maestros/devoluciones'])
        });
      } else {
        this.devolucionesService.save(item).subscribe((res) => {
          this.idPorCliente = res.id
          this.alertService.showClienteCreado();
          this.router.navigate(['./maestros/devoluciones'])
        });
      }
    } else {
    }
  }

  buildForm() {
    this.form = this.fb.group({
      client_id: ['', Validators.required],
      user_id: ['', Validators.required],
      date: ['', Validators.required],
      reason: ['', Validators.required],
      status: ['', Validators.required],
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
        this.router.navigate(['./maestros/devoluciones'])
      }
    })
  }


}

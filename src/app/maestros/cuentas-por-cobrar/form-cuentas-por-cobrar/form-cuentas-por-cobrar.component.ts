import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';
import { ClientesService } from 'src/services/clientes.service';
import { CuentasPorCobrarService } from 'src/services/cuentas-por-cobrar.service';
import { VendedoresService } from 'src/services/vendedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-cuentas-por-cobrar',
  templateUrl: './form-cuentas-por-cobrar.component.html',
  styleUrls: ['./form-cuentas-por-cobrar.component.sass']
})
export class FormCuentasPorCobrarComponent implements OnInit {

  listStatus: any[] = [
    {
      nombre: 'Elaborado'
    },
    {
      nombre: 'Preaprobado'
    },
    {
      nombre: 'Aprobado'
    },
    {
      nombre: 'Cancelado'
    }
  ]
  vendedor: any[] = [];
  listVendedores: any[] = [];
  idPorCliente = 0;
  form: FormGroup;
  currentId = 0;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private clientesService: ClientesService,
    private cuentasPorCobrarService: CuentasPorCobrarService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getVendedores();
    this.route.params.pipe(
      filter(params => params.id > 0),
      mergeMap((params) => {
        this.alertService.showLoading();
          return this.cuentasPorCobrarService.getById(params.id)
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
    this.cuentasPorCobrarService.getAll().subscribe(resp => {
      this.listVendedores = resp.data;
      this.alertService.hideSwal();
    })
  }

  submit() {
    if (this.form.valid) {
      let item = this.form.value;
      this.alertService.showLoading();
      item.id = this.currentId;
      if (this.currentId > 0) {
        this.cuentasPorCobrarService.update2(this.currentId, item).subscribe((res) => {
          this.alertService.showSuccess();
          this.router.navigate(['./maestros/cuentasXCobrar'])
        });
      } else {
        this.cuentasPorCobrarService.save(item).subscribe((res) => {
          this.idPorCliente = res.id
          this.alertService.showClienteCreado();
          this.router.navigate(['./maestros/cuentasXCobrar'])
        });
      }
    } else {
    }
  }

  buildForm() {
    this.form = this.fb.group({
      date: ['', Validators.required],
      value: ['', Validators.required],
      status: ['', Validators.required],
      days_expire: ['', Validators.required],
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
        this.router.navigate(['./maestros/cuentasXCobrar'])
      }
    })
  }


}

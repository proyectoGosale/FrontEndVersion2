import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';
import { ClientesService } from 'src/services/clientes.service';
import { CotizacionService } from 'src/services/cotizacion.service';
import { VendedoresService } from 'src/services/vendedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-cotizacion',
  templateUrl: './form-cotizacion.component.html',
  styleUrls: ['./form-cotizacion.component.sass']
})
export class FormCotizacionComponent implements OnInit {

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
    private cotizacionService: CotizacionService,
    private clientesService: ClientesService,
    private vendedoresService: VendedoresService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getClientes();
    this.getVendedores();
    this.route.params.pipe(
      filter(params => params.id > 0),
      mergeMap((params) => {
        this.alertService.showLoading();
          return this.cotizacionService.getById(params.id)
        }
      )).subscribe((cliente) => {
        let clientes = cliente.data
        this.form.patchValue(clientes);
        this.currentId = clientes.id;
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

  getVendedores() {
    this.alertService.showLoading();
    this.vendedoresService.getAll().subscribe(resp => {
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
        this.cotizacionService.update2(this.currentId, item).subscribe((res) => {
          this.alertService.showSuccess();
          this.router.navigate(['./maestros/clientes'])
        });
      } else {
        this.cotizacionService.save(item).subscribe((res) => {
          this.idPorCliente = res.id
          this.alertService.showClienteCreado();
          this.router.navigate(['./maestros/clientes'])
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
      date_of_delivery: ['', Validators.required],
      due_date: ['', Validators.required],
      document_type: ['Cotizacion', Validators.required],
      status: ['', Validators.required],
      quantity: ['', Validators.required],
      subtotal: ['', Validators.required],
      discount: ['', Validators.required],
      tax: ['', Validators.required],
      total: ['', Validators.required]
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
        this.router.navigate(['./maestros/clientes'])
      }
    })
  }


}

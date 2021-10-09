import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';
import { ClientesService } from 'src/services/clientes.service';
import { ColeccionService } from 'src/services/coleccion.service';
import { VendedoresService } from 'src/services/vendedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-coleccion',
  templateUrl: './form-coleccion.component.html',
  styleUrls: ['./form-coleccion.component.sass']
})
export class FormColeccionComponent implements OnInit {

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
      nombre: 'Anulado'
    }
  ]

  listStatusMetodoPago: any[] = [
    {
      nombre: 'Credito'
    },
    {
      nombre: 'Contraentrega'
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
    private vendedoresService: VendedoresService,
    private coleccionService: ColeccionService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getVendedores();
    this.route.params.pipe(
      filter(params => params.id > 0),
      mergeMap((params) => {
        this.alertService.showLoading();
          return this.coleccionService.getById(params.id)
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

  submit() {
    if (this.form.valid) {
      let item = this.form.value;
      this.alertService.showLoading();
      item.id = this.currentId;
      if (this.currentId > 0) {
        this.coleccionService.update2(this.currentId, item).subscribe((res) => {
          this.alertService.showSuccess();
          this.router.navigate(['./maestros/coleccion'])
        });
      } else {
        this.coleccionService.save(item).subscribe((res) => {
          this.idPorCliente = res.id
          this.alertService.showClienteCreado();
          this.router.navigate(['./maestros/coleccion'])
        });
      }
    } else {
    }
  }

  buildForm() {
    this.form = this.fb.group({
      method_of_payment: ['', Validators.required],
      user_id: ['', Validators.required],
      date: ['', Validators.required],
      value: ['', Validators.required],
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
        this.router.navigate(['./maestros/coleccion'])
      }
    })
  } 

}

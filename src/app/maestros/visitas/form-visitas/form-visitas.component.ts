import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';
import { ClientesService } from 'src/services/clientes.service';
import { VendedoresService } from 'src/services/vendedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-visitas',
  templateUrl: './form-visitas.component.html',
  styleUrls: ['./form-visitas.component.sass']
})
export class FormVisitasComponent implements OnInit {

  roles: any = [
    {
      nombre: 'Super administrador',
      id: 1
    },
    {
      nombre: 'Administrador',
      id: 2
    },
    {
      nombre: 'Vendedor',
      id: 3
    }
  ]

  listVendedores: any[] = [];
  listClientes: any[] = [];
  form: FormGroup;
  currentId = 0;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientesService: ClientesService,
    private vendedoresService: VendedoresService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.route.params.subscribe(resp => {
      this.currentId = resp.id
    })
    this.route.params.pipe(
      filter(params => params.id > 0),
      mergeMap((params) => {
        this.alertService.showLoading();
        return this.clientesService.getById(params.id)
      }
      )).subscribe((visita) => {
        console.log(visita);
        this.form.patchValue(visita.data);
        this.alertService.hideSwal();
      })
  }

  getVendedores() {
    this.vendedoresService.getAll().subscribe(resp => {
      this.listVendedores = resp.data;
    })
  }
  
  getClientes() {
    this.clientesService.getAll().subscribe(resp => {
      this.listClientes = resp.data;
    })
  }

  submit() {
    if (this.form.valid) {
      let item = this.form.value;
      this.alertService.showLoading();
      if (this.currentId > 0) {
        this.clientesService.update2(this.currentId, item).subscribe(res => {
          let text = res.message
          Swal.fire({
            title: 'Exito',
            html: text,
            icon: 'success',
            confirmButtonText: 'Continuar',
          }).then((response) => {
            this.router.navigate(['./maestros/vendedores'])
          })
        });
      } else {
        this.clientesService.save(item).subscribe((res) => {
          let text = res.message
          Swal.fire({
            title: 'Exito',
            html: text,
            icon: 'success',
            confirmButtonText: 'Continuar',
          }).then((response) => {
            this.router.navigate(['./maestros/vendedores'])
          });
        });
      }
    } else {
    }
  }

  buildForm() {
    this.form = this.fb.group({
      user_id: ['', Validators.required],
      client_id: ['', Validators.required],
      date_hour: ['', Validators.required],
      observation: ['', Validators.required],
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
        this.router.navigate(['./maestros/vendedores'])
      }
    })
  }

}

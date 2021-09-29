import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';
import { CategoriasService } from 'src/services/categorias.service';
import { FacturasService } from 'src/services/facturas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-facturas',
  templateUrl: './form-facturas.component.html',
  styleUrls: ['./form-facturas.component.sass']
})
export class FormFacturasComponent implements OnInit {

  productos: any[] = [];
  listCategory: any[] = [];
  form: FormGroup;
  currentId = 0;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private facturasService: FacturasService,
    private categoriasService: CategoriasService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getCategorias();
    this.route.params.subscribe(params => {
      this.currentId=params.id
    })
    this.route.params.pipe(
      filter(params => params.id > 0),
      mergeMap((params) => {
        this.alertService.showLoading();
          return this.facturasService.getById(params.id)
        }
      )).subscribe((producto:any) => {
        this.productos = producto.data
        let productos = producto.data
        this.form.patchValue(productos);
        this.alertService.hideSwal();
    })
  }

  getCategorias() {
    this.alertService.showLoading();
    this.categoriasService.getAll().subscribe(resp => {
      this.listCategory = resp.data;
      this.alertService.hideSwal();
    })
  }

  submit() {
    if (this.form.valid) {
      let item = this.form.value;
      this.alertService.showLoading();
      if (this.currentId > 0) {
        this.facturasService.update2(this.currentId, item).subscribe((res) => {
          this.alertService.showSuccess();
          this.router.navigate(['./maestros/facturas'])
        });
      } else {
        this.facturasService.save(item).subscribe((res) => {
          this.alertService.showClienteCreado();
          this.router.navigate(['./maestros/facturas'])
        });
      }
    } else {
    }
  }

  buildForm() {
    this.form = this.fb.group({
      producto: ['', Validators.required],
      status: ['', Validators.required],
      date_of_delivery: ['', Validators.required]
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
        this.router.navigate(['./maestros/facturas'])
      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';
import { CategoriasService } from 'src/services/categorias.service';
import { ProductosService } from 'src/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-crud-productos',
  templateUrl: './form-crud-productos.component.html',
  styleUrls: ['./form-crud-productos.component.sass']
})
export class FormCrudProductosComponent implements OnInit {

  listCategory: any[] = [];
  form: FormGroup;
  currentId = 0;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private categoriasService: CategoriasService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getCategorias();
    this.route.params.pipe(
      filter(params => params.id > 0),
      mergeMap((params) => {
        this.alertService.showLoading();
          return this.productosService.getById(params.id)
        }
      )).subscribe((cliente) => {
        let clientes = cliente.data
        this.form.patchValue(clientes);
        this.currentId = clientes.id;
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
        this.productosService.update2(this.currentId, item).subscribe((res) => {
          this.alertService.showSuccess();
          this.router.navigate(['./maestros/productos/listProductos'])
        });
      } else {
        this.productosService.save(item).subscribe((res) => {
          this.alertService.showClienteCreado();
          this.router.navigate(['./maestros/productos/listProductos'])
        });
      }
    } else {
    }
  }

  buildForm() {
    this.form = this.fb.group({
      reference: ['', Validators.required],
      price: ['', Validators.required],
      name: ['', Validators.required],
      dimension: ['', Validators.required],
      descripcion: ['', Validators.required],
      category_id: ['', Validators.required],
      available: ['', Validators.required]
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
        this.router.navigate(['./maestros/productos/listProductos'])
      }
    })
  }

}

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
  public imagenes: any[] = [];
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
    this.onChanges();
    this.getCategorias();
    this.route.params.subscribe(params => {
      this.currentId=params.id
    })
    this.route.params.pipe(
      filter(params => params.id > 0),
      mergeMap((params) => {
        this.alertService.showLoading();
          return this.productosService.getById(params.id)
        }
      )).subscribe((producto) => {
        let productos = producto.data;
        this.imagenes.push({ archivo: productos.image});
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
      item.image = this.imagenes[0].archivo;
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

  onChanges() {
    this.form.get('image').valueChanges.subscribe(response => {
      if (this.imagenes.length == 0) {
        if (response?.files) {
          this.productosService.convertFile(response?.files[0]).then((stringImg => {
            this.imagenes.push({ archivo: stringImg, id: 0, nombre: response.files[0].name });
            this.form.get('image').setValue('', { emitEvent: false });
            console.log(this.imagenes);
            
          }));
        }
      } else {
        this.alertService.showErrorNoSeCargaMasDeUnArchivo();
      }
    });
  }


  buildForm() {
    this.form = this.fb.group({
      reference: ['', Validators.required],
      price: ['', Validators.required],
      name: ['', Validators.required],
      dimension: ['', Validators.required],
      description: ['', Validators.required],
      category_id: ['', Validators.required],
      available: ['', Validators.required],
      image: ['']
    })
  }

  removeImage(doc, ix) {
    Swal.fire({
      title: 'Atencion',
      text: 'Se perderan los cambios no guardados,¿Seguro?',
      icon: 'question',
      cancelButtonText: 'No',
      confirmButtonText: 'Si, continuar',
      showCancelButton: true

    }).then((response) => {
      if (!response.dismiss) {
        this.imagenes.splice(ix, 1);
      }
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

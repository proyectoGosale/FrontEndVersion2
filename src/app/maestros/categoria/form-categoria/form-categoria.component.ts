import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';
import { CategoriaPorIdService } from 'src/services/categoria-por-id.service';
import { CategoriasService } from 'src/services/categorias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.sass']
})
export class FormCategoriaComponent implements OnInit {

  listCategory: any[] = [];
  form: FormGroup;
  currentId = 0;
  public imagenes: any[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private categoriasService: CategoriasService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.onChanges();
    this.route.params.subscribe(params => {
      this.currentId=params.id
    })
    this.route.params.pipe(
      filter(params => params.id > 0),
      mergeMap((params) => {
        this.alertService.showLoading();
          return this.categoriasService.getById(params.id)
        }
      )).subscribe((categoria) => {
        let categorias = categoria.data
        this.imagenes.push({ archivo: categorias.image});
        this.form.patchValue(categorias);
        this.alertService.hideSwal();
    })
  }

  submit() {
    if (this.form.valid) {
      let item = this.form.value;
      this.alertService.showLoading();
      item.image = this.imagenes[0].archivo;
      if (this.currentId > 0) {
        this.categoriasService.update2(this.currentId ,item).subscribe((res) => {
          this.alertService.showSuccess();
          this.router.navigate(['./maestros/categorias'])
        });
      } else {
        this.categoriasService.save(item).subscribe((res) => {
          this.alertService.showClienteCreado();
          this.router.navigate(['./maestros/categorias'])
        });
      }
    } else {
    }
  }

  buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      image: ['']
    })
  }

  onChanges() {
    this.form.get('image').valueChanges.subscribe(response => {
      if (this.imagenes.length == 0) {
        if (response?.files) {
          this.categoriasService.convertFile(response?.files[0]).then((stringImg => {
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
        this.router.navigate(['./maestros/categorias'])
      }
    })
  }

}

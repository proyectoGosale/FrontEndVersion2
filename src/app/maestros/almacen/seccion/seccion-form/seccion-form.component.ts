import { isNgContent } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';
import { ReferenciasService } from 'src/services/referencias.service';
import { SeccionService } from 'src/services/seccion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seccion-form',
  templateUrl: './seccion-form.component.html',
  styleUrls: ['./seccion-form.component.sass']
})
export class SeccionFormComponent implements OnInit {

  referenciasList: any[] = [];

  form: FormGroup;
  currentIdAlamacen: any = 0;
  currentId: any = 0;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private seccionService: SeccionService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private referenciasService: ReferenciasService,
  ) { }

  ngOnInit(): void {

    this.buildForm();
    this.route.params.subscribe(params => {
      this.currentIdAlamacen = +params.idAlmacen
    })
    this.route.params.pipe(
      filter(params => params.id > 0),
      mergeMap((params) => {
        this.alertService.showLoading();
        return this.seccionService.getByIdConReferencias(params.id)
      }
      )).subscribe((seccion) => {
        this.form.patchValue(seccion);
        this.currentId = seccion.id;
        this.alertService.hideSwal();
    })

    this.obtenerReferencias();

  }

  submit() {
    if (this.form.valid) {
      let item = this.form.value;
      item.idAlmacen = this.currentIdAlamacen;
      console.log('A:', item);
      if (this.currentId > 0) {
        item.id = this.currentId;
        this.seccionService.updateConReferencias(item).subscribe((res) => {
          this.alertService.showSuccess();
          this.router.navigate(['./maestros/almacen/seccion', this.currentIdAlamacen])
        });
      } else {
        this.seccionService.saveConReferencias(item).subscribe((res) => {
          this.alertService.showSuccess();
          this.router.navigate(['./maestros/almacen/seccion', this.currentIdAlamacen])
        });
      }
    } else {
    }
  }

  buildForm() {

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      referencias: ['', Validators.required],
      capacidad: ['', Validators.required]
    })
  }

  async obtenerReferencias() {
    this.referenciasList = await this.referenciasService.getAll().toPromise();
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
        this.router.navigate(['./maestros/almacen/seccion', this.currentIdAlamacen])
      }
    })
  }

}

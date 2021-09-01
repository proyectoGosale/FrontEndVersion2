import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';
import { AlmacenService } from 'src/services/almacen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-almacen',
  templateUrl: './form-almacen.component.html',
  styleUrls: ['./form-almacen.component.sass']
})
export class FormAlmacenComponent implements OnInit {

  form: FormGroup;
  currentId = 0;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private almacenService: AlmacenService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.route.params.pipe(
      filter(params => params.id > 0),
      mergeMap((params) => {
        this.alertService.showLoading();
          return this.almacenService.getById(params.id)
        }
      )).subscribe((almacen) => {
        this.alertService.showLoading();
        this.form.patchValue(almacen);
        this.currentId = almacen.id;
        this.alertService.hideSwal();
    })
  }

  submit() {
    if (this.form.valid) {
      let item = this.form.value;
      this.alertService.showLoading();
      if (this.currentId > 0) {
        item.id = this.currentId;
        this.almacenService.update(item).subscribe((res) => {
          this.alertService.showSuccess();
          this.router.navigate(['./maestros/almacen'])

        });
      } else {
        this.almacenService.save(item).subscribe((res) => {
          this.alertService.showSuccess();
          this.router.navigate(['./maestros/almacen'])

        });
      }
    } else {
    }
  }

  buildForm() {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
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
        this.router.navigate(['./maestros/almacen'])
      }
    })
  }


}

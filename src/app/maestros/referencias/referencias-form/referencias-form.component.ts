import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';
import { ReferenciasService } from 'src/services/referencias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-referencias-form',
  templateUrl: './referencias-form.component.html',
  styleUrls: ['./referencias-form.component.sass']
})
export class ReferenciasFormComponent implements OnInit {

  colorList: any[] = [];

  form: FormGroup;
  currentId = 0;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private referenciasService: ReferenciasService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.route.params.pipe(
      filter(params => params.id > 0),
      mergeMap((params) => {
        this.alertService.showLoading();
        return this.referenciasService.getById(params.id)
      })).subscribe((item) => {
        this.form.patchValue(item);
        this.currentId = item.id;
        this.alertService.hideSwal();
      })
  }

  submit() {
    if (this.form.valid) {
      let item = this.form.value;
      this.alertService.showLoading();
      if (this.currentId > 0) {
        item.id = this.currentId;
        this.referenciasService.update(item).subscribe((res) => {
          this.alertService.showSuccess();
          this.router.navigate(['./maestros/referencias'])
        });
      } else {
        this.referenciasService.save(item).subscribe((res) => {
          this.alertService.showSuccess();
          this.router.navigate(['./maestros/referencias'])

        });
      }
    } else {
    }
  }

  buildForm() {

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      color1: ['', Validators.required],
      color2: ['', Validators.required]
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
        this.router.navigate(['./maestros/referencias'])
      }
    })
  }

  

}

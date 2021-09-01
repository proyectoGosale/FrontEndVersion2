import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';
import { ZonaService } from 'src/services/zona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-zona-comercial',
  templateUrl: './form-zona-comercial.component.html',
  styleUrls: ['./form-zona-comercial.component.sass']
})
export class FormZonaComercialComponent implements OnInit {

  allVendedores: any[];

  form: FormGroup;
  currentId = 0;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private zonaService: ZonaService,
    
    private alertService: AlertService,
    private route: ActivatedRoute
  ) { }

  

  ngOnInit(): void {
    this.buildForm();
    this.route.params.pipe(
      filter(params => params.id > 0),
      mergeMap((params) => {
        this.alertService.showLoading();
          return this.zonaService.getById(params.id)
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
        this.zonaService.update2(this.currentId, item).subscribe((res) => {
          
          this.router.navigate(['./maestros/zonas'])
        });
      } else {
        this.zonaService.save(item).subscribe((res) => {
          this.alertService.showSuccess();
          this.router.navigate(['./maestros/zonas'])

        });
      }
    } else {
    }
  }



  buildForm() {
    this.form = this.fb.group({
      vendedor: ['', Validators.required],
      zona: ['', Validators.required],
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
        this.router.navigate(['./maestros/zonas'])
      }
    })
  }

}

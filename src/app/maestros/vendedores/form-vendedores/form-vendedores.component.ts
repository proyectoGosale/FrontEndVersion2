import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';
import { VendedoresService } from 'src/services/vendedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-vendedores',
  templateUrl: './form-vendedores.component.html',
  styleUrls: ['./form-vendedores.component.sass']
})
export class FormVendedoresComponent implements OnInit {

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

  form: FormGroup;
  currentId = 0;
  constructor(
    private fb: FormBuilder,
    private router: Router,
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
        return this.vendedoresService.getById(params.id)
      }
      )).subscribe((vendedor) => {
        console.log(vendedor);
        this.form.patchValue(vendedor.data);
        this.alertService.hideSwal();
      })
  }

  submit() {
    if (this.form.valid) {
      let item = this.form.value;
      this.alertService.showLoading();
      if (this.currentId > 0) {
        this.vendedoresService.update2(this.currentId, item).subscribe(res => {
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
        this.vendedoresService.save(item).subscribe((res) => {
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
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      role_id: ['', Validators.required],
      password: ['', Validators.required]
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

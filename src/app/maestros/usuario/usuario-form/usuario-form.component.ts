import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';
import { UsuarioService } from 'src/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.sass']
})
export class UsuarioFormComponent implements OnInit {

  form: FormGroup;
  tiposDocumentoList: any[] = ['CC'];
  departamentosList: any[] = [];
  requiereDepartamentos = false;
  currentId: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) { }


 
  ngOnInit(): void {
    this.buildForm();
    this.route.params.pipe(
      filter(params => params.id > 0),
      mergeMap((params) => {
        this.alertService.showLoading();
        return  this.usuarioService.getbyId(params.id)
      }
      )).subscribe((usuario) => {
        this.form.patchValue(usuario);
        this.currentId = usuario.id;
        this.alertService.hideSwal();
      })
  }

  submit() {
    if (this.form.valid) {
      let item = this.form.value;
      this.alertService.showLoading();
      if (this.currentId > 0) {
        item.id = this.currentId;
        this.usuarioService.update(item).subscribe((res) => {
          this.alertService.showSuccess();
          this.router.navigate(['./maestros/usuario'])
        });
      } else {
        this.usuarioService.save(item).subscribe((res) => {
          this.alertService.showSuccess();
          this.router.navigate(['./maestros/usuario'])

        });
      }
    } else {
    }
  }

  buildForm() {

    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      rol: ['despachador'],
      username: ['', Validators.required],
      password: ['', Validators.required],
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
        this.router.navigate(['./maestros/usuario'])
      }
    })
  }

}

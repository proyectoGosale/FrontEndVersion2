import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../shared/security/auth.service';
import { UsuarioService } from 'src/services/usuario.service';
import { AlertService } from 'src/services/alert.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.error = '';
    this.alertService.showLoading();
    if (this.loginForm.invalid) {
      this.error = 'Usuario  o contraseña no válidos !';
      return;
    } else {
      this.authService
        .login(this.f.email.value, this.f.password.value)
        .subscribe(
          (res) => {
            if (res.success) {
              console.log(res);
              
              // switch (rol) {
              //   case 'analista':
              //   case 'dirProyectos':
              //     this.router.navigate(['/solicitudes']);
              //     break;
              //   case 'coordMantenimiento':
              //   case 'gerencia':
              //     this.router.navigate(['/ordenesTrabajo']);
              //     break;
              //   default:
              //     break;
              // }

              this.router.navigate(['/maestros/clientes']);
              this.alertService.hideSwal();
            } else {
              this.error = 'Usuario  o contraseña no válidos';
              this.alertService.hideSwal();
            }
          },
          (error) => {
            this.error = 'Usuario  o contraseña no válidos';
            this.submitted = false;
            this.alertService.hideSwal();
          }
        );
    }
  }
}

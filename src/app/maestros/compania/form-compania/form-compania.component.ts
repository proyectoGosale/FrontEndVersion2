import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';
import { CompaniaService } from 'src/services/compania.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-compania',
  templateUrl: './form-compania.component.html',
  styleUrls: ['./form-compania.component.sass']
})
export class FormCompaniaComponent implements OnInit {

  listCategory: any[] = [];
  categorias: any;
  nameCompania: any;
  nit: any;
  form: FormGroup;
  currentId = 0;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private companiaService: CompaniaService,
  ) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.currentId=params.id
    })
    this.route.params.pipe(
      filter(params => params.id > 0),
      mergeMap((params) => {
        this.alertService.showLoading();
          return this.companiaService.getById(params.id)
        }
      )).subscribe((categoria) => {
        this.nameCompania = categoria.business_name;
        this.nit = categoria.nit;
        this.categorias = categoria.data;
        this.form.patchValue(this.categorias);
        this.alertService.hideSwal();
        console.log(this.categorias);
        
    })
    this.buildForm();
  }

  submit() {
    if (this.form.valid) {
      let item = this.form.value;
      this.alertService.showLoading();
      if (this.currentId > 0) {
        item.id = this.currentId;
        this.companiaService.update2(this.currentId ,item).subscribe((res) => {
          this.alertService.showSuccess();
          this.router.navigate(['./maestros/compania'])
        });
      } else {
        this.companiaService.save(item).subscribe((res) => {
          this.alertService.showClienteCreado();
          this.router.navigate(['./maestros/compania'])
        });
      }
    } else {
    }
  }

  buildForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
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
        this.router.navigate(['./maestros/compania'])
      }
    })
  }

}

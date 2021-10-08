import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';
import { VendedoresService } from 'src/services/vendedores.service';
import { ZonaService } from 'src/services/zona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-zona-comercial',
  templateUrl: './form-zona-comercial.component.html',
  styleUrls: ['./form-zona-comercial.component.sass']
})
export class FormZonaComercialComponent implements OnInit {

  city: any[] = [
  {name:'Medellín'},{name:'Cali'},{name:'Popayán'},{name:'Pasto'},{name:'Manizales'},{name: 'Bogotá'},
  {name: 'Pereira'},{name:'Armenia'},{name:'Valledupar'},{name:'Bucaramanga'},{name:'Yopal'}
  ]

  allVendedores: any[] = [];
  form: FormGroup;
  currentId = 0;
  currentParamsId = 0;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private zonaService: ZonaService,
    private vendedoresService: VendedoresService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getData();
    this.route.params.subscribe(resp => {
      this.currentParamsId = resp.id
    })
    this.route.params.pipe(
      filter(params => params.id > 0),
      mergeMap((params) => {
        this.alertService.showLoading();
          return this.zonaService.getById(params.id)
        }
      )).subscribe((almacen) => {
        console.log(almacen);
        
        this.form.patchValue(almacen.data);
        this.currentId = almacen.id;
        this.alertService.hideSwal();
    })
  }


  submit() {
    if (this.form.valid) {
      let item = this.form.value;
      this.alertService.showLoading();
      if (this.currentParamsId > 0) {
        item.id = this.currentId;
        this.zonaService.update2(this.currentParamsId, item).subscribe((res) => {
          this.alertService.showSuccess();
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

  getData() {
    this.alertService.showLoading();
    this.vendedoresService.getAll().subscribe(resp => {
      this.allVendedores = resp.data;
      this.alertService.hideSwal();
    })
  }

  buildForm() {
    this.form = this.fb.group({
      user_id: ['', Validators.required],
      name: ['', Validators.required],
      city: ['', Validators.required],
      increment: ['', Validators.required],
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

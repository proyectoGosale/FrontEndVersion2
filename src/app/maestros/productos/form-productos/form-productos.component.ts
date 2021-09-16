import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';
import { ProductosService } from 'src/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.sass']
})
export class FormProductosComponent implements OnInit {

  currentId = 0;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productosService: ProductosService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(resp => {
      this.currentId = resp.id
    })
  }

  getData() {
    this.productosService.getAll().subscribe(resp => {
      console.log(resp.data);
      
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

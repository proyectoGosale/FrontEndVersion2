import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/services/alert.service';
import { CategoriasService } from 'src/services/categorias.service';
import { VendedoresService } from 'src/services/vendedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  categorias: any[] = [];

  constructor(
    private categoriasService: CategoriasService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getData();    
  }

  private getData() {
    this.alertService.showLoading();
    this.categoriasService.getAll().subscribe((res) => {
      this.categorias = res.data;
      this.alertService.hideSwal();
    }, (err) => {
    });
  }

  borrar(id) {
    Swal.fire({
      title: 'Atencion',
      text: 'Se eliminará este elemento,¿Seguro?',
      icon: 'question',
      cancelButtonText: 'No',
      confirmButtonText: 'Si, continuar',
      showCancelButton: true

    }).then((response) => {
      if (!response.dismiss) {
        this.categoriasService.delete(id).subscribe(res => {
          this.getData();
        }, (err) => {
          this.alertService.showError()
        })
      }
    })
  }

}

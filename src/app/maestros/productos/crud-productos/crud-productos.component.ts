import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/services/alert.service';
import { ProductosService } from 'src/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-productos',
  templateUrl: './crud-productos.component.html',
  styleUrls: ['./crud-productos.component.sass']
})
export class CrudProductosComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'nombre',
    'referencia',
    'dimencion',
    'precio',
    'accion'
  ];

  dataSource3 = new MatTableDataSource([]);

  constructor(
    private productosService: ProductosService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData() {
    this.alertService.showLoading();
    this.productosService.getAll().subscribe((res) => {
      this.dataSource3.data = res.data;
      this.alertService.hideSwal();
    }, (err) => {

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
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
        this.productosService.delete(id).subscribe(res => {
          this.getData();
        }, (err) => {
          this.alertService.showError()
        })
      }
    })
  }

}

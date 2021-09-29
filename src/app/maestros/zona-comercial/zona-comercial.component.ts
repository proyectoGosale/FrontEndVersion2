import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/services/alert.service';
import { VendedoresService } from 'src/services/vendedores.service';
import { ZonaService } from 'src/services/zona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-zona-comercial',
  templateUrl: './zona-comercial.component.html',
  styleUrls: ['./zona-comercial.component.sass']
})
export class ZonaComercialComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'Vendedor',
    'Nombre zona',
    'accion'
  ];

  vendedores: any;

  dataSource3 = new MatTableDataSource([]);

  constructor(
    private zonaService: ZonaService,
    private alertService: AlertService,
    private vendedoresService: VendedoresService
  ) { }

  ngOnInit(): void {
    this.obtenerVendedores();
    this.getData();
  }

  private getData() {
    this.alertService.showLoading();
    this.zonaService.getAll().subscribe((res) => {
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
        this.zonaService.delete(id).subscribe(res => {
          this.getData();
        }, (err) => {
          this.alertService.showError()
        })
      }
    })
  }

  async obtenerVendedores() {
    let vendedores = await this.vendedoresService.getAll().toPromise();
    this.vendedores = vendedores.data;
  }

  getVendedor(id_user) {
    return this.vendedores.find(vendedor => vendedor.id == id_user);
  }

}

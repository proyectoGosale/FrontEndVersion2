import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/services/alert.service';
import { ClientesService } from 'src/services/clientes.service';
import { ColeccionService } from 'src/services/coleccion.service';
import { VendedoresService } from 'src/services/vendedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coleccion',
  templateUrl: './coleccion.component.html',
  styleUrls: ['./coleccion.component.sass']
})
export class ColeccionComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'vendedor',
    'date',
    'status',
    'value',
    'accion'
  ];

  vendedoresList: any[] = [];

  dataSource3 = new MatTableDataSource([]);

  constructor(
    private vendedoresService: VendedoresService,
    private coleccionService: ColeccionService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.obtenerVendedores();
    this.getData();
  }

  private getData() {
    this.alertService.showLoading();
    this.coleccionService.getAll().subscribe((res) => {
      this.dataSource3.data = res.data;
      this.alertService.hideSwal();
    }, (err) => {

    });
  }

  async obtenerVendedores() {
    let vendedoresList = await this.vendedoresService.getAll().toPromise();
    this.vendedoresList = vendedoresList.data
  }

  getVendedores(idVendedor) {
    return this.vendedoresList.find(x => x.id == idVendedor)
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
        this.coleccionService.delete(id).subscribe(res => {
          this.getData();
        }, (err) => {
          this.alertService.showError()
        })
      }
    })
  }
}

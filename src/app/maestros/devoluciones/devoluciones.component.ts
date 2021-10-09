import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/services/alert.service';
import { ClientesService } from 'src/services/clientes.service';
import { DevolucionesService } from 'src/services/devoluciones.service';
import { VendedoresService } from 'src/services/vendedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.sass']
})
export class DevolucionesComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'cliente',
    'vendedor',
    'date',
    'estado',
    'accion'
  ];

  clienteList: any[] = [];
  vendedoresList: any[] = [];

  dataSource3 = new MatTableDataSource([]);

  constructor(
    private clientesService: ClientesService,
    private vendedoresService: VendedoresService,
    private devolucionesService: DevolucionesService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.obtenerClientes();
    this.obtenerVendedores();
    this.getData();
  }

  private getData() {
    this.alertService.showLoading();
    this.devolucionesService.getAll().subscribe((res) => {
      this.dataSource3.data = res.data;
      this.alertService.hideSwal();
    }, (err) => {

    });
  }

  async obtenerClientes() {
    let clienteList = await this.clientesService.getAll().toPromise();
    this.clienteList = clienteList.data
  }

  async obtenerVendedores() {
    let vendedoresList = await this.vendedoresService.getAll().toPromise();
    this.vendedoresList = vendedoresList.data
  }

  getClientes(idCliente) {
    return this.clienteList.find(x => x.id == idCliente);
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
        this.devolucionesService.delete(id).subscribe(res => {
          this.getData();
        }, (err) => {
          this.alertService.showError()
        })
      }
    })
  }


}

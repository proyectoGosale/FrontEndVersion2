import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/services/alert.service';
import { SeccionService } from 'src/services/seccion.service';

@Component({
  selector: 'app-capacidad-disponible',
  templateUrl: './capacidad-disponible.component.html',
  styleUrls: ['./capacidad-disponible.component.scss']
})
export class CapacidadDisponibleComponent implements OnInit {

  listAlmacenes: any;
  // [
  //   { 
  //     secciones: [
  //       { 
  //         qty: 3, 
  //         nombre: "seccion 12", 
  //         idAlmacen: 3, 
  //         capacidad: 5, 
  //         id: 10, 
  //         borrado: false 
  //       },
  //       { 
  //         qty: 1, 
  //         nombre: "seccion 12", 
  //         idAlmacen: 3, 
  //         capacidad: 8, 
  //         id: 10, 
  //         borrado: false 
  //       },
  //       { 
  //         qty: 10, 
  //         nombre: "seccion 12", 
  //         idAlmacen: 3, 
  //         capacidad: 10, 
  //         id: 10, 
  //         borrado: false 
  //       }
  //     ],
  //     borrado: false,
  //     id: 3,
  //     nombre: "almacen 1 PRUEBAs"
  //   }
  // ];

  listSecciones: any;
  asignado: boolean;

  constructor(
    private alertService: AlertService,
    private seccionService: SeccionService
  ) {

  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.alertService.showLoading();
    this.seccionService.getAllSeccionConCapacidad().subscribe((res) => {
      this.listAlmacenes = res;
      this.alertService.hideSwal();
    }, (err) => {
    });
  }



}

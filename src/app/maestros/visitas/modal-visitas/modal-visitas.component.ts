import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/services/alert.service';
import { ClientesService } from 'src/services/clientes.service';
import { VendedoresService } from 'src/services/vendedores.service';
import { VisitasService } from 'src/services/visitas.service';

export interface DialogData {
  nombreCliente: any;
  observaciones: any;
  vendedor: any;
}

@Component({
  selector: 'app-modal-visitas',
  templateUrl: './modal-visitas.component.html',
  styleUrls: ['./modal-visitas.component.sass']
})
export class ModalVisitasComponent implements OnInit {

  listClientes: any[] = [];
  listVisitas: any[] = [];
  listVendedores: any[] = [];
  count = 0;

  constructor(
    public dialogRef: MatDialogRef<ModalVisitasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private clientesService:ClientesService,
    private visitasService: VisitasService,
    private vendedoresService: VendedoresService,
    private alertService: AlertService
    ) { }

  ngOnInit() {
    this.obtenerClientes();
    this.obtenerVisita();
    this.obtenerVendedores();
  }

  obtenerClientes() {
    this.clientesService.getAll().subscribe(resp => {
      this.listClientes = resp.data;
    });
    
  }

  getClientes(idCliente) {
    return this.listClientes.find(x => x.id == idCliente)
  }

  obtenerVisita() {
    this.visitasService.getAll().subscribe(resp => {
      this.listVisitas = resp.data;
    });
  }

  getVisita(idCliente) {
    return this.listVisitas.find(x => x.client_id == idCliente)
  }

  obtenerVendedores() {
    this.alertService.showLoading();
    this.vendedoresService.getAll().subscribe(resp => {
      this.listVendedores = resp.data;
      this.alertService.hideSwal();
    });
  }

  getVendedores(idVendedor) {
    return this.listVendedores.find(x => x.id == idVendedor)
  }
 
}

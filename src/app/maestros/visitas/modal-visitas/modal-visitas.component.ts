import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientesService } from 'src/services/clientes.service';
import { VendedoresService } from 'src/services/vendedores.service';

export interface DialogData {
  nombreCliente: any;
  observaciones: any;
}

@Component({
  selector: 'app-modal-visitas',
  templateUrl: './modal-visitas.component.html',
  styleUrls: ['./modal-visitas.component.sass']
})
export class ModalVisitasComponent implements OnInit {

  listClientes: any[] = [];
  listVendedores: any[] = [];
  count = 0;

  constructor(
    public dialogRef: MatDialogRef<ModalVisitasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private clientesService:ClientesService,
    private vendedoresService:VendedoresService
    ) { }

  ngOnInit() {

  }

  getClientes(idCliente) {
    if (this.count == 0) {
      this.count = this.count + 1
      this.clientesService.getById(idCliente).subscribe(resp => {
        this.listClientes = resp.data
      })
    }
    
  
  }
 

}

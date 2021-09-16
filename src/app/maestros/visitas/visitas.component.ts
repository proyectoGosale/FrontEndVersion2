import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/services/alert.service';
import { ClientesService } from 'src/services/clientes.service';
import { VisitasService } from 'src/services/visitas.service';
import Swal from 'sweetalert2';
import { ModalVisitasComponent } from './modal-visitas/modal-visitas.component';

export interface DialogData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrls: ['./visitas.component.sass']
})
export class VisitasComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'cliente',
    'fecha',
    'estado',
    'accion'
  ];

  name: string = "hola mundo"
  id: number = 1

  listClientes: any[] = [];
  dataSource3 = new MatTableDataSource([]);

  constructor(
    private clientesService: ClientesService,
    private visitasService: VisitasService,
    private alertService: AlertService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getData();
    this.getObtenerClientes();
  }

  openDialog(id): void {
    this.alertService.showLoading();
    this.visitasService.getById(id).subscribe(resp => {
      this.alertService.hideSwal();
      let nameCliente = resp.data.client_id;
      let observation = resp.data.observations;
      console.log(this.name);
      
      const dialogRef = this.dialog.open(ModalVisitasComponent, {
        width: '250px',
        data: {
          nombreCliente: nameCliente,
          observaciones: observation
        }
      });
      dialogRef.afterOpened().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    })

  
  }

  async getObtenerClientes() {
    let clientes = await this.clientesService.getAll().toPromise();
    this.listClientes = clientes.data;
    console.log(this.listClientes)
  }

  getClientes(idClient) {
    return this.listClientes.find(cliente => cliente.id == idClient);
  }

  private getData() {
    this.alertService.showLoading();
    this.visitasService.getAll().subscribe((res) => {
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
        this.visitasService.delete(id).subscribe(res => {
          this.getData();
        }, (err) => {
          this.alertService.showError()
        })
      }
    })
  }


}

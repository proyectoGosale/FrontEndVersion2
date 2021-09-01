import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/services/alert.service';
import { DespachoService } from 'src/services/despacho.service';
import Swal from 'sweetalert2';
import { ModalDespachosComponent } from '../modal-despachos/modal-despachos.component';
import { UsuarioService } from 'src/services/usuario.service';

export interface DialogData {
  close: string;
  idDespacho: string;
}

@Component({
  selector: 'app-lista-despachos',
  templateUrl: './lista-despachos.component.html',
  styleUrls: ['./lista-despachos.component.scss']
})
export class ListaDespachosComponent implements OnInit {

  idDespacho: number;

  usuarios: any[] = [];

  allUsuariosDespacho: any[] = [];

  displayedColumns: string[] = [
    'id',
    'observaciones',
    'creado',
    'usuario',
    'asignadoA',
    'accion'
  ];

  dataSource3 = new MatTableDataSource([]);

  constructor(
    private despachoService: DespachoService,
    private alertService: AlertService,
    public dialog: MatDialog,
    private usuarioService:UsuarioService,
  ) { }

  ngOnInit(): void {
    this.getData();
    this.obtenerUsuarios();
  }

  openDialog(id): void {
   
    const dialogRef = this.dialog.open(ModalDespachosComponent, {
      width: '700px',
      data: {idDespacho: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }

  getData() {
    this.alertService.showLoading();
    this.despachoService.getAll().subscribe((res) => {
      this.dataSource3.data = res.map(resp => ({resp, asignado: false }));
      this.alertService.hideSwal();
      let item: any = this.dataSource3.data.filter(params => params.resp.asignadoA == null);
      if (item) {
        item.map(resp => resp.asignado = true)   
      }
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
        this.despachoService.deleteProfundo(id).subscribe(res => {
          this.getData();
        }, (err) => {
          this.alertService.showError()
        })
      }
    })
  }

  async obtenerUsuarios() {
    this.usuarios = await this.usuarioService.getAll().toPromise();
  }

  getUser(idAsignado) {
    return this.usuarios.find(user => user.id == idAsignado);
  }

}

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/services/alert.service';
import { DespachoService } from 'src/services/despacho.service';
import { UsuarioService } from 'src/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  usuarios: any[] = [];

  displayedColumns: string[] = [
    'id',
    'observaciones',
    'creado',
    'usuario',
    'accion'
  ];

  dataSource3 = new MatTableDataSource([]);
  tarjetasDespacho: any;

  constructor(
    private despachoService: DespachoService,
    private alertService: AlertService,
    private usuarioService:UsuarioService,
  ) { }

  ngOnInit(): void {
    this.getData();
    this.obtenerUsuarios();     
  }

  private getData() {
    this.alertService.showLoading();
    this.usuarioService.userData;
    let item = this.usuarioService.userData.id;    
    this.despachoService.getbyIdAsignado(item).subscribe((res) => {
      this.tarjetasDespacho = res;
      this.dataSource3.data = res;      
      this.alertService.hideSwal();
    }, (err) => {

    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }

  async obtenerUsuarios() {
    this.usuarios = await this.usuarioService.getAll().toPromise();
  }

  getUser(idAsignado) {
    return this.usuarios.find(user => user.id == idAsignado);
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


}

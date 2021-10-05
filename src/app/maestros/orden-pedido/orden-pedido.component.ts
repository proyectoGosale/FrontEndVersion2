import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/services/alert.service';
import { OrdenPedidoService } from 'src/services/orden-pedido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orden-pedido',
  templateUrl: './orden-pedido.component.html',
  styleUrls: ['./orden-pedido.component.sass']
})
export class OrdenPedidoComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'TD',
    'date',
    'total',
    'accion'
  ];

  dataSource3 = new MatTableDataSource([]);

  constructor(
    private ordenPedidoService: OrdenPedidoService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData() {
    this.alertService.showLoading();
    this.ordenPedidoService.getAll().subscribe((res) => {
      this.dataSource3.data = res.data.filter(resp => resp.document_type == "Orden de pedido");
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
        this.ordenPedidoService.delete(id).subscribe(res => {
          this.getData();
        }, (err) => {
          this.alertService.showError()
        })
      }
    })
  }

}

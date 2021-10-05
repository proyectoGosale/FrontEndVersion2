import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/services/alert.service';
import { FacturasService } from 'src/services/facturas.service';
import { NotasCreditoService } from 'src/services/notas-credito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notas-de-credito',
  templateUrl: './notas-de-credito.component.html',
  styleUrls: ['./notas-de-credito.component.sass']
})
export class NotasDeCreditoComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'TD',
    'valor',
    'estado',
    'accion'
  ];

  documentos: any[] = [];

  dataSource3 = new MatTableDataSource([]);

  constructor(
    private notasCreditoService: NotasCreditoService,
    private alertService: AlertService,
    private facturasService: FacturasService
  ) { }

  ngOnInit(): void {
    this.obtenerDocumento();
    this.getData();
  }

  private getData() {
    this.alertService.showLoading();
    this.notasCreditoService.getAll().subscribe((res) => {
      this.dataSource3.data = res.data
      this.alertService.hideSwal();
    }, (err) => {

    });
  }

  obtenerDocumento() {
    this.facturasService.getAll().subscribe(res => {
      this.documentos = res.data;
    })
  }

  getDocumentos(id) {
    return this.documentos.find(resp => resp.id == id)
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
        this.notasCreditoService.delete(id).subscribe(res => {
          this.getData();
        }, (err) => {
          this.alertService.showError()
        })
      }
    })
  }

}

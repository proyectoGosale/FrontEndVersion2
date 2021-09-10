import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/services/alert.service';
import { FacturasService } from 'src/services/facturas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.sass']
})
export class FacturasComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'TD',
    'date',
    'total',
    'accion'
  ];

  dataSource3 = new MatTableDataSource([]);

  constructor(
    private facturasService: FacturasService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData() {
    this.alertService.showLoading();
    this.facturasService.getAll().subscribe((res) => {
      this.dataSource3.data = res.data.filter(resp => resp.document_type == "Factura");
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
        this.facturasService.delete(id).subscribe(res => {
          this.getData();
        }, (err) => {
          this.alertService.showError()
        })
      }
    })
  }
}

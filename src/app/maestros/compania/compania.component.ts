import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/services/alert.service';
import { CompaniaService } from 'src/services/compania.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compania',
  templateUrl: './compania.component.html',
  styleUrls: ['./compania.component.sass']
})
export class CompaniaComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'business_name',
    'email',
    'address',
    'nit',
    'phone',
    'accion'
  ];

  dataSource3 = new MatTableDataSource([]);

  constructor(
    private companiaService: CompaniaService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData() {
    this.alertService.showLoading();
    this.companiaService.getAll().subscribe((res) => {
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
        this.companiaService.delete(id).subscribe(res => {
          this.getData();
        }, (err) => {
          this.alertService.showError()
        })
      }
    })
  }

}

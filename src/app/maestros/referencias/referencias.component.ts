import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/services/alert.service';
import { ReferenciasService } from 'src/services/referencias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-referencias',
  templateUrl: './referencias.component.html',
  styleUrls: ['./referencias.component.sass']
})
export class ReferenciasComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'nombre',
    'accion',
 ];

  dataSource3 = new MatTableDataSource([]);

  constructor(
    private referenciasService: ReferenciasService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData() {
    this.alertService.showLoading();
    this.referenciasService.getAll().subscribe((res) => {
      this.dataSource3.data = res;
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
        this.referenciasService.delete(id).subscribe(res => {
          this.getData();
        }, (err) => {
          this.alertService.showError()
        })
      }
    })
  }

}

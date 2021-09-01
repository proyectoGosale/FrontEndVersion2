import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';
import { SeccionService } from 'src/services/seccion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.sass']
})
export class SeccionComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'nombre',
    'accion'
  ];
  dataSource3 = new MatTableDataSource([]);
  listByIdAlmacen = [];
  currentIdAlamacen: number;
  currentId: any;

  constructor(
    private seccionService: SeccionService,
    private alertService: AlertService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getDataByIdAlmacen();
  }

  getDataByIdAlmacen() {
    this.route.params.pipe(
      filter(params => params.id > 0),
      mergeMap((params) => {
        this.alertService.showLoading();
        return this.seccionService.getByIdPorAlmacen(params.id)
      })).subscribe((res) => {
        this.dataSource3=res;
        this.dataSource3.data = this.listByIdAlmacen;
        this.alertService.hideSwal()
      })
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

    }).then((res) => {
      if (!res.dismiss) {
        this.seccionService.delete(id).subscribe(res => {

            this.getDataByIdAlmacen();

        }, (err) => {
          this.alertService.showError()
        })
      }
    })
  }


}

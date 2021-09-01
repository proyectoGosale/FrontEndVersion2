import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';
import { ColorService } from 'src/services/color.service';
import { DespachoService } from 'src/services/despacho.service';
import { ReferenciasService } from 'src/services/referencias.service';
import Swal from 'sweetalert2';
import { VehiculosService } from 'src/services/vehiculos.service';

@Component({
  selector: 'app-form-despachos',
  templateUrl: './gestion-despachos.component.html',
  styleUrls: ['./gestion-despachos.component.scss']
})
export class FormDespachosComponent implements OnInit {

  validacion: any;

  vinAsignado: any[] = [];
  idVehiculoAsignado: any;

  puedeGuardar: boolean;

  colorList: any[] = [];

  cantidadAsignada: number;
  cantidadPorAsignar: number;

  referenciasSelectedList: any[];
  currentIdDespacho: any;
  currentObservaciones: any;
  constructor(
    private alertService: AlertService,
    private despachoService: DespachoService,
    private referenciaService: ReferenciasService,
    private route: ActivatedRoute,
    private colorService: ColorService,
    public dialog: MatDialog,
    private router: Router,
    private vehiculosService: VehiculosService
  ) { }


  ngOnInit(): void {
    this.getData();
    this.getColores();
  }

  getData() {
    this.alertService.showLoading();
    this.route.params.pipe(
      filter(params => params.id > 0),
      mergeMap((params) =>
        forkJoin([
          this.despachoService.getbyIdDespacho(params.id),
          this.referenciaService.getAll(),
          this.vehiculosService.getByIdPorDespacho(params.id)]
        ))).subscribe((response) => {
          this.currentIdDespacho=response[0].id;
          this.currentObservaciones=response[0].observaciones;
          this.referenciasSelectedList = response[0].referencias.map(referenciaDespacho => {
            const vehiculoRelacionado = response[2].find(vehiculo => vehiculo.idReferencia == referenciaDespacho.idReferencia && !Boolean(vehiculo.relacionado));
            if (vehiculoRelacionado) {
              vehiculoRelacionado.relacionado = true;
            }
            return {
              referencia: response[1].find(referencia => referencia.id == referenciaDespacho.idReferencia),
              idReferencia: referenciaDespacho.idReferencia,
              asignado: Boolean(vehiculoRelacionado),
              vinAsig: vehiculoRelacionado,
              idDespacho: response[0].id,
              idVehiculo: vehiculoRelacionado?.id,
              seccion: referenciaDespacho.seccion
            }
          })
          this.cantidadAsignada = response[2].length;
          this.cantidadPorAsignar = this.referenciasSelectedList.length - this.cantidadAsignada;
          if (this.referenciasSelectedList.length == response[2].length) {
            this.puedeGuardar = true;
          } else { this.puedeGuardar = false; }
          this.referenciasSelectedList.sort((a:any,b:any) => a.asignado - b.asignado);
          this.alertService.hideSwal();
        })
  }

  guardarDespacho() {
    this.alertService.showLoading();
    let item = this.currentIdDespacho;
    if (item > 0) {
      this.despachoService.updateDespachoFinal(item).subscribe(response => {
        this.alertService.showSuccess();
        this.router.navigate(['./inboxDespacho'])
      })
      this.alertService.hideSwal();
    } else { }
  }

  onKey(event: any) {
    this.alertService.showLoading();
    let item = event.target.value;
    if (item) {
      forkJoin([this.vehiculosService.getByIdPorVin(item), this.vehiculosService.getVehiculoDisponiblePorVin(item)]).subscribe(
        (response) => {
          if (response) {
            if (response[1].return == true) {
              let vehiculo = response[0];
              this.asignarReferencia(vehiculo.idReferencia, vehiculo.id, vehiculo.vin);
            } else {
              let vehiculoError = response[1];
              let text = `Estatus de compra: ${vehiculoError.estatusDeCompra} \n \n Centro: ${vehiculoError.centro} \n \n Almacen: ${vehiculoError.almacen} \n \n Id despacho: ${vehiculoError.idDespacho}`;
              Swal.fire({
                title: 'Error',
                html: '<pre> No se puede asignar un vehiculo por: \n \n' + text + '</pre>',
                icon: 'error',
              });
              return;
            }
          } else {
            this.alertService.showError()
          }
          this.alertService.hideSwal();
        })
    }
    else {
      this.alertService.showError()
    }
  }

  asignarReferencia(idReferencia, idVehiculoAsignado, vinAsignado) {
    let referencia = this.referenciasSelectedList.find(ref => ref.idReferencia == idReferencia && !ref.asignado && !ref.vinAsig && !ref.idVehiculo);
    if (referencia) {
      referencia.idVehiculo = idVehiculoAsignado;
      referencia.vinAsig = vinAsignado;
      referencia.asignado = true;
      this.vehiculosService.agregarADespacho(referencia.idDespacho, referencia.idVehiculo).subscribe((resp) => {
        this.getData();
      })
    } else {
      this.alertService.showErrorReferenciaNoEncontradaEnDespacho()
    }

  }



  async getColores() {
    this.colorList = await this.colorService.getAll().toPromise();
  }

  getColor(idColor) {
    return this.colorList.find(color => color.id == idColor);
  }

  cancel() {
    Swal.fire({
      title: 'Atencion',
      text: 'Se perderan los cambios no guardados,¿Seguro?',
      icon: 'question',
      cancelButtonText: 'No',
      confirmButtonText: 'Si, continuar',
      showCancelButton: true

    }).then((response) => {
      if (!response.dismiss) {
        this.router.navigate(['./inboxDespacho'])
      }
    })
  }

  removeItem(item) {
    Swal.fire({
      title: 'Atencion',
      text: 'Se eliminará este elemento,¿Seguro?',
      icon: 'question',
      cancelButtonText: 'No',
      confirmButtonText: 'Si, continuar',
      showCancelButton: true

    }).then((response) => {
      if (!response.dismiss) {
        this.vehiculosService.getByQuitarVehiculo(item).subscribe(res => {
          this.getData();
        }, (err) => {
          this.alertService.showError()
        })
      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/services/alert.service';
import { VehiculosService } from 'src/services/vehiculos.service';

import { SeccionService } from 'src/services/seccion.service';
import { AlmacenService } from 'src/services/almacen.service';

@Component({
  selector: 'app-ubicacion-vehiculo',
  templateUrl: './ubicacion-vehiculo.component.html',
  styleUrls: ['./ubicacion-vehiculo.component.sass']
})
export class UbicacionVehiculoComponent implements OnInit {

  disabled: boolean = false;

  seccionPorIdALmacen: any;
  seccionLista: any[] = [];
  selectedValue: any;

  seccionListaSub: any[] = [];
  seccionAlmacenes: any[] = [];

  currentVinVehiculo: any

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private vehiculosService: VehiculosService,
    private seccionService: SeccionService,
    private almacenService: AlmacenService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getAlmacenes();
    this.getSecciones();
  }

  onClick() {
    let item = this.form.value;
    if (item.almacen !== 0) {
      this.seccionService.getByIdPorAlmacen(item.almacen).subscribe((seccion) => {
        this.seccionPorIdALmacen = seccion;
      })
    } else { }
  }

  onSubmit(): void {
    if (this.form.valid) {
      let item = this.form.value;
      if (item.idSeccion === "otraUbicacion") {
        this.currentVinVehiculo.idSeccion = item.idSeccionOtraUbicacion;
        this.alertService.showLoading();
        this.vehiculosService.update(this.currentVinVehiculo).subscribe((res) => {
          this.alertService.showSuccess();
        })
      } else {
        this.currentVinVehiculo.idSeccion = item.idSeccion;
        this.alertService.showLoading();
        this.vehiculosService.update(this.currentVinVehiculo).subscribe((res) => {
          this.alertService.showSuccess()
        })
      }
      this.form.reset();
    } else {
      this.alertService.showError()
    }
  }

  onKey(event: any) {
    this.alertService.showLoading();
    let item = event.target.value;
    if (item) {
      this.vehiculosService.getByIdUbicacionPorVin(item).subscribe((resp) => {
        this.seccionLista = resp;
      })
      this.vehiculosService.getByIdPorVin(item).subscribe((param) => {
        if (param) {
          this.currentVinVehiculo = param;
          this.currentVinVehiculo.idSeccion = param.idSeccion;
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

  buildForm() {
    this.form = this.fb.group({
      vin: ['', Validators.required],
      idSeccion: ['', Validators.required],
      almacen: [''],
      idSeccionOtraUbicacion: ['']
    })
    this.form.get('idSeccion').valueChanges.subscribe(val => {
      if (val !== 'otraUbicacion') {
        this.disabled = false;
        this.form.get('almacen').clearValidators();
        this.form.get('idSeccionOtraUbicacion').clearValidators();
        this.form.get('almacen').updateValueAndValidity();
        this.form.get('idSeccionOtraUbicacion').updateValueAndValidity();
      } else {
        this.disabled = true;
        this.form.get('almacen').setValidators(Validators.required);
        this.form.get('idSeccionOtraUbicacion').setValidators(Validators.required);
        this.form.get('almacen').updateValueAndValidity();
        this.form.get('idSeccionOtraUbicacion').updateValueAndValidity();
      }
    })
  }

  async getSecciones() {
    this.seccionListaSub = await this.seccionService.getAll().toPromise();
  }

  async getAlmacenes() {
    this.seccionAlmacenes = await this.almacenService.getAll().toPromise();
  }

}



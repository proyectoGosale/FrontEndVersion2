import { isNgTemplate } from '@angular/compiler';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { filter, map, mergeMap } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';
import { ColorService } from 'src/services/color.service';
import { DespachoService } from 'src/services/despacho.service';
import { ReferenciasService } from 'src/services/referencias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-despacho',
  templateUrl: './form-despacho.component.html',
  styleUrls: ['./form-despacho.component.sass']
})
export class FormDespachoComponent implements OnInit {

  referenciasList: any[] = [];

  error: any = 1

  erroresValoresEnTabla: any[] = [];

  colorList: any[] = [];

  formDespacho: FormGroup = new FormGroup({
    observaciones: new FormControl('', Validators.required),
    referencia: new FormControl('', Validators.required)
  })

  currentDespacho: any;

  referenciasSelectedList: any[] = [];

  constructor(
    private alertService: AlertService,
    private despachoService: DespachoService,
    private referenciaService: ReferenciasService,
    private router: Router,
    private route: ActivatedRoute,
    private colorService: ColorService,
  ) { }


  ngOnInit(): void {

    this.getColores();
    this.getReferencias();
    this.route.params.pipe(
      filter(params => params.id > 0),
      mergeMap((params) => {
        this.alertService.showLoading();
        return forkJoin([
          this.despachoService.getbyIdDespacho(params.id)
            .pipe(map(despacho => ({ ...despacho, referencias: despacho.referencias?.map(ref => ref.idReferencia) ?? [] }))),
          this.referenciaService.getAll()
        ])
      })).subscribe((response) => {
        this.currentDespacho = response[0];
        this.formDespacho.patchValue(response[0]);
        this.referenciasSelectedList = response[0].referencias.map(referenciaDespacho => response[1].find(referencia => referencia.id == referenciaDespacho))
        this.alertService.hideSwal();
      })
  }

  guardarDespacho() {
    if (this.formDespacho.valid) {
      let valor = this.formDespacho.value.observaciones;
      this.alertService.showLoading();
      let idReferencias = this.referenciasSelectedList.map(ref => ref.id);
      console.log(this.currentDespacho);
      if (this.currentDespacho) {
        this.despachoService.updateDespacho(idReferencias, valor, this.currentDespacho).subscribe(res => {
          this.alertService.showSuccess().then(res => {
            this.router.navigate(['./despachos'])
          })
        })
      } else {
        this.despachoService.saveDespacho(idReferencias, valor).subscribe(res => {
          this.alertService.showSuccess().then(res => {
            this.router.navigate(['./despachos'])
          })
        })
      }
    }

  }

  submit() {
    if (!this.formDespacho.valid) {
      return this.alertService.showToastFaltanCampos();
    }
    let valor = this.formDespacho.value;
    let referenciasPorSplit = valor.referencia.split("\n");
    this.despachoService.saveDespachoPorReferencia(referenciasPorSplit).subscribe((response) => {
      let item: any = response
      this.referenciasSelectedList = item.referencias;
      this.erroresValoresEnTabla = item.errores

      if (this.erroresValoresEnTabla.length > 0) {
        this.error = 0
        this.erroresValoresEnTabla;
      } else {
        this.referenciasSelectedList;
        this.error = 1
      }
    });
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
        this.router.navigate(['./despachos'])
      }
    })
  }

  removeItem(item, ix) {
    this.referenciasSelectedList.splice(ix, 1);
  }

  async getReferencias() {
    this.referenciasList = await this.referenciaService.getAll().toPromise();
  }

  getReferencia(idReferencia) {
    return this.referenciasList.find(referencia => referencia.id == idReferencia);
  }

  async getColores() {
    this.colorList = await this.colorService.getAll().toPromise();
  }

  getColor(idColor) {
    return this.colorList.find(color => color.id == idColor);
  }

}

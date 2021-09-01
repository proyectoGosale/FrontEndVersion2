import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UsuarioService } from 'src/services/usuario.service';
import { DespachoService } from 'src/services/despacho.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/services/alert.service';
import { DialogData, ListaDespachosComponent } from '../lista-despachos/lista-despachos.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-modal-despachos',
  templateUrl: './modal-despachos.component.html',
  styleUrls: ['./modal-despachos.component.sass']
})
export class ModalDespachosComponent implements OnInit {

  form: FormGroup;

  ListDespachadores: any[];
  ListDespachos: any;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private despachoService: DespachoService,
    public dialogRef: MatDialogRef<ListaDespachosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getDataUsuariosDespachadores();
    this.data;
    this.despachoService.getbyIdDespacho(this.data.idDespacho)
      .pipe(map(despacho => ({ ...despacho, referencias: despacho.referencias?.map(ref => ref.idReferencia) ?? [] })))
      .subscribe((resp) => {
        this.ListDespachos = resp;
      })
  }

  onSubmit() {
    if (this.form.valid) {
      let item = this.form.value;
      this.ListDespachos.asignadoA = item.asignadoA;
      this.despachoService.update(this.ListDespachos).subscribe(resp => {
      })
    } else { }
  }

  async getDataUsuariosDespachadores() {
    this.ListDespachadores = await this.usuarioService.getUsuariosPorDespachadores().toPromise();
  }

  buildForm() {
    this.form = this.fb.group({
      asignadoA: ['', Validators.required]
    })
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
        this.dialogRef.close();
      }
    })
  }

}

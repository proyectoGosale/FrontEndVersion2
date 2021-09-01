import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { AddressService } from 'src/services/address.service';
import { AlertService } from 'src/services/alert.service';
import { ClientesService } from 'src/services/clientes.service';
import { VendedoresService } from 'src/services/vendedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address-clientes',
  templateUrl: './address-clientes.component.html',
  styleUrls: ['./address-clientes.component.sass']
})
export class AddressClientesComponent implements OnInit {

  clientes: any[] = [];
  idCliente = 0;
  nombreCliente: any[] = [];
  listVendedores: any[] = [];
  form: FormGroup;
  currentId = 0;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private clientesService: ClientesService,
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getData();
    this.getClientes();
  }

  getData() {
    this.route.params.subscribe(params => {
      this.idCliente = params.idCliente})
    this.route.params.pipe(
      filter(params => params.id > 0),
      mergeMap((params) => {
        this.alertService.showLoading();
          return this.addressService.getById(params.id)
        }
      )).subscribe((address) => {
        let direccion = address.data;
        this.form.patchValue(direccion);
        this.currentId = address.id;
        this.alertService.hideSwal();
    })
  }

  getClientes() {
    this.alertService.showLoading();
    this.clientesService.getById(this.idCliente).subscribe(resp => {
      let nombreCliente = resp.data;
      this.nombreCliente = nombreCliente.name;
      this.alertService.hideSwal();
    })
  }

  submit() {
    if (this.form.valid) {
      let item = this.form.value;
      this.alertService.showLoading();
      item.client_id = this.idCliente;
      if (this.currentId > 0) {
        this.addressService.update2(this.currentId, item).subscribe((res) => {
          this.alertService.showDireccionActualizada();
          this.router.navigate(['./maestros/clientes'])
        });
      } else {
        this.addressService.save(item).subscribe((res) => {
          this.alertService.showDireccionCreada();
          this.router.navigate(['./maestros/clientes'])
        });
      }
    } else {
    }
  }

  buildForm() {
    this.form = this.fb.group({
      city: ['', Validators.required],
      neighborhood: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
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
        this.router.navigate(['./maestros/clientes'])
      }
    })
  }

}

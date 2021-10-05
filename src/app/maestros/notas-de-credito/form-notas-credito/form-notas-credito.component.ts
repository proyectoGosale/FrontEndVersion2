import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';
import { ClientesService } from 'src/services/clientes.service';
import { FacturasService } from 'src/services/facturas.service';
import { NotasCreditoService } from 'src/services/notas-credito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-notas-credito',
  templateUrl: './form-notas-credito.component.html',
  styleUrls: ['./form-notas-credito.component.sass']
})
export class FormNotasCreditoComponent implements OnInit {

  facturas: any[] = [];
  vendedor: any[] = [];
  clientes: any[] = [];
  listVendedores: any[] = [];
  descontarValor: any[] = [{nombre: 'Elaborado'},{ nombre: 'Aprobado'},{ nombre: 'Anulado'}];
  idPorCliente = 0;
  form: FormGroup;
  currentId = 0;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private clientesService: ClientesService,
    private facturasService: FacturasService,
    private notasCreditoService: NotasCreditoService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.obtenerCliente();
    this.getFactura();
    this.route.params.pipe(
      filter(params => params.id > 0),
      mergeMap((params) => {
        this.alertService.showLoading();
          return this.notasCreditoService.getById(params.id)
        }
      )).subscribe((cliente) => {
        let clientes = cliente.data
        this.form.patchValue(clientes);
        this.currentId = clientes.id;
        this.alertService.hideSwal();
    })
  }

  getFactura() {  
    this.facturasService.getAll().subscribe((res) => {
      this.facturas = res.data.filter(resp => resp.document_type == "Factura");
      this.alertService.hideSwal();
    }, (err) => {
    });
  }

  obtenerCliente() {
    this.clientesService.getAll().subscribe(resp => {
      this.clientes = resp.data;
    })
  }

  getClientes(id) {
    return this.clientes.find(resp => resp.id == id)
  }

  submit() {
    if (this.form.valid) {
      let item = this.form.value;
      this.alertService.showLoading();
      if (this.currentId > 0) {
        item.id = this.currentId;
        this.notasCreditoService.update2(this.currentId, item).subscribe((res) => {
          this.alertService.showSuccess();
          this.router.navigate(['./maestros/notasDeCredito'])
        });
      } else {
        this.notasCreditoService.save(item).subscribe((res) => {
          this.idPorCliente = res.id
          this.alertService.showClienteCreado();
          this.router.navigate(['./maestros/notasDeCredito'])
        });
      }
    } else {
    }
  }

  buildForm() {
    this.form = this.fb.group({
      document_id: ['', Validators.required],
      concept: ['', Validators.required],
      discounted_value: ['', Validators.required],
      status: ['', Validators.required],
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
        this.router.navigate(['./maestros/notasDeCredito'])
      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';
import { CategoriaPorIdService } from 'src/services/categoria-por-id.service';
import { CategoriasService } from 'src/services/categorias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.sass']
})
export class ListCategoryComponent implements OnInit {

  categorias: any[] = [];
  currentId = 0;

  constructor(
    private categoriaPorIdService: CategoriaPorIdService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getData();    
  }

  private getData() {

    this.route.params.subscribe(resp => {
      this.currentId = resp.id
    })
    this.route.params.pipe(
      filter(params => params.id > 0),
      mergeMap((params) => {
        this.alertService.showLoading();
        return this.categoriaPorIdService.getById(this.currentId)
      }
      )).subscribe((param) => {
        this.categorias = param.data
        console.log(param);
        this.alertService.hideSwal();
      })
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
        this.categoriaPorIdService.delete(id).subscribe(res => {
          this.getData();
        }, (err) => {
          this.alertService.showError()
        })
      }
    })
  }
}

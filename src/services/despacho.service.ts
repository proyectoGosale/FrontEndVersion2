import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class DespachoService extends AppService {

  httpClient: HttpClient;

  constructor(
    httpClient: HttpClient,
    private usuarioService: UsuarioService
  ) {
    super(httpClient, 'Despacho')
  }

  saveDespacho(listReferencias, observaciones) {
    let item = {
      referencias: listReferencias,
      observaciones: observaciones,
      creadoPor: this.usuarioService.userData?.id
    }
    return this.httpClient.post(`${this.url}/Insertar`, item);
  }
  updateDespacho(listReferencias: any, observaciones: any, currentDespacho: any) {
    let item = {
      ...currentDespacho,
      referencias: listReferencias,
      observaciones: observaciones,
      creadoPor: this.usuarioService.userData?.id
    }
    return this.httpClient.put(`${this.url}/Actualizar`, item);

  }

  saveDespachoPorReferencia(obj) {
    return this.httpClient.post(`${this.url}/ValidarReferencias`, obj);
  }


  public getbyIdDespacho(id): Observable<any> {
    return this.httpClient.get(`${this.url}/PorId/${id}`);
  }

  public getbyIdAsignado(id): Observable<any> {
    return this.httpClient.get(`${this.url}/AsignadosA/${id}`);
  }
  
  updateDespachoFinal(item: any) {
    let item1 = {
      idDespacho: item,
      idUsuario: this.usuarioService.userData?.id
    }
    return this.httpClient.put(`${this.url}/Finalizar`, item1);

  }

  public deleteProfundo(idDespacho): Observable<any> {
    return this.httpClient.delete(`${this.url}/Borrar/${idDespacho}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class SeccionService extends AppService {

  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    super(httpClient, 'Seccion')
  }

  public getByIdConReferencias(id): Observable<any> {
    return this.httpClient.get(`${this.url}/PorId/${id}`);
  }

  public updateConReferencias(obj): Observable<any> {
    return this.httpClient.put(`${this.url}/Actualizar`, obj);
  }

  public saveConReferencias(obj): Observable<any> {
    return this.httpClient.post(`${this.url}/Insertar`, obj);
  }

  public getByIdPorAlmacen(id): Observable<any> {
    return this.httpClient.get(`${this.url}/PorAlmacen/${id}`);
  }

  public getAllSeccionConCapacidad(): Observable<any> {
    return this.httpClient.get(`${this.url}/AgrupadasPorAlmacen`);
  }

}

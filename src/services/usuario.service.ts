import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  public apiUrl: string = environment.authUrl;
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;

  }


  public setHeaders(): HttpHeaders {
    let token = JSON.parse(localStorage.getItem('UserGestionDespachosToken'));

    const headers: HttpHeaders = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return headers;
  }


  public getAll(): Observable<any> {
    const header = this.setHeaders();

    return this.httpClient.get(`${this.apiUrl}`, { headers: header });
  }


  public getUsuariosPorProgramadores(): Observable<any> {
    const header = this.setHeaders();

    return this.httpClient.get(`${this.apiUrl}/Programadores`, { headers: header });
  }

  public getUsuariosPorDespachadores(): Observable<any> {
    const header = this.setHeaders();

    return this.httpClient.get(`${this.apiUrl}/Despachadores`, { headers: header });
  }






  public getbyId(id): Observable<any> {
    const header = this.setHeaders();
    return this.httpClient.get(`${this.apiUrl}/${id}`, { headers: header });
  }
  public save(obj): Observable<any> {
    const header = this.setHeaders();

    return this.httpClient.post(`${this.apiUrl}/register`, obj, { headers: header });
  }
  public update(obj): Observable<any> {
    const header = this.setHeaders();
    return this.httpClient.put(`${this.apiUrl}/${obj.id}`, obj, { headers: header });
  }


  public delete(id): Observable<any> {
    const header = this.setHeaders();
    return this.httpClient.delete(`${this.apiUrl}/${id}`, { headers: header });
  }

  get userData() {
    let info = JSON.parse(localStorage.getItem('userData'));
    return info;
  }



}

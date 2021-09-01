import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class VendedoresService extends AppService{

  httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    super(httpClient, 'user')
  }

  public setHeaders(): HttpHeaders {
    let token = JSON.parse(localStorage.getItem('UserGestionVendedoresToken'));

    const headers: HttpHeaders = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return headers;
  }

  public getbyId(id): Observable<any> {
    const header = this.setHeaders();
    return this.httpClient.get(`${this.url}/${id}`, { headers: header });
  }
  public save(obj): Observable<any> {
    const header = this.setHeaders();

    return this.httpClient.post(`${this.url}/register`, obj, { headers: header });
  }
  public update(obj): Observable<any> {
    const header = this.setHeaders();
    return this.httpClient.put(`${this.url}/${obj.id}`, obj, { headers: header });
  }


  public delete(id): Observable<any> {
    const header = this.setHeaders();
    return this.httpClient.delete(`${this.url}/${id}`, { headers: header });
  }

  get userData() {
    let info = JSON.parse(localStorage.getItem('UserGestionVendedores'));
    return info;
  }

}

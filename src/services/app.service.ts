import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class AppService {

  public static apiUrl: string = environment.apiUrl;
  httpClient: HttpClient;

  public url: string;
  constructor(httpClient: HttpClient, controllerUrl: string) {
    
    this.url = AppService.apiUrl + controllerUrl;
    this.httpClient = httpClient;
  }

  public buildHeaders(): any {
    const headers: HttpHeaders = new HttpHeaders();
    // const token = localStorage.getItem('LiquidacionToken');
    // headers.append('Authorization', `Bearer ${token}`);
    let options = { headers };
    return options;
  }



  public getAll(): Observable<any> {
    return this.httpClient.get(`${this.url}`);
  }

  public getById(id): Observable<any> {
    return this.httpClient.get(`${this.url}/${id}`);
  }

  public save(obj): Observable<any> {
    return this.httpClient.post(`${this.url}`, obj);
  }

  public update2(id, obj): Observable<any> {
    return this.httpClient.put(`${this.url}/${id}`, obj);
  }

  public update(obj): Observable<any> {
    return this.httpClient.put(`${this.url}`, obj);
  }
  public delete(id): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }



}

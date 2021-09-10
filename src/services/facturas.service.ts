import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class FacturasService extends AppService{

  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    super(httpClient, 'document')
  }
}

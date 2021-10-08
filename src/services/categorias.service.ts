import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService extends AppService{

  httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    super(httpClient, 'category')
   }
   
   convertFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
  } 
}

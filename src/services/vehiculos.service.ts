import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AppService } from './app.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService extends AppService {

  httpClient: HttpClient

  constructor(
    httpClient: HttpClient,
    private usuarioService: UsuarioService
    ) {
    super(httpClient, 'Vehiculo')
  }

  public getByIdPorVin(vin): Observable<any> {
    return this.httpClient.get(`${this.url}/PorVIN/${vin}`);
  }

  public getVehiculoDisponiblePorVin(vin): Observable<any> {
    return this.httpClient.get(`${this.url}/DisponibleXVin/${vin}`);
  }

  public getByIdUbicacionPorVin(vin): Observable<any> {
    return this.httpClient.get(`${this.url}/UbicacionSugerida/${vin}`);
  }

  agregarADespacho(idDesp: any, idVeh: any) {
    let item = {
      idDespacho: idDesp,
      idVehiculo: idVeh,
      idUsuario: this.usuarioService.userData?.id
    }
    return this.httpClient.put(`${this.url}/AgregarADespacho`, item);
  }

  public getByIdPorDespacho(item): Observable<any> {
    return this.httpClient.get(`${this.url}/PorDespacho/${item}`);
  }

  public getByQuitarVehiculo(vin): Observable<any> {
    return this.httpClient.get(`${this.url}/QuitarDespacho/${vin}`);
  }

}

import { Injectable } from '@angular/core';
import { User } from './user';
import { from, of } from 'rxjs';
import { AppService } from 'src/services/app.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, mergeMap } from 'rxjs/operators';
import { UsuarioService } from 'src/services/usuario.service';
import { VendedoresService } from 'src/services/vendedores.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  isLogin = false;

  url = `${environment.authUrl}/login`;

  constructor(
    public httpClient: HttpClient,
    private usuarioService: UsuarioService,
    private vendedoresService: VendedoresService
  ) {

  }

  login(email: string, password: string) {
    // const user = this.users.find(
    //   (x) => x.username === username && x.password === password
    // );

    return this.httpClient.post(this.url, { email, password })
      .pipe(mergeMap((loginRepose: any) => {        
        if (!loginRepose) {
          localStorage.setItem('STATE', 'false');
          this.isLogin = false;
          return from([{ success: this.isLogin }]);
        } else {
          return this.vendedoresService.getbyId(loginRepose.id).pipe(map((response: any) => {
            let resp = response.data;
            if (resp.rol == "Admin" || resp.rol == 'SuperAdmin' || resp.rol == "Vendedor" || resp.rol == "programador") {
              localStorage.setItem('STATE', 'true');
              localStorage.setItem('UserGestionVendedores', JSON.stringify(resp));
              localStorage.setItem('UserGestionVendedoresToken', JSON.stringify(loginRepose.access_token));
              this.isLogin = true;
              return { success: this.isLogin };
            } else {
              localStorage.setItem('STATE', 'false');
              this.isLogin = false;
              return { success: this.isLogin };
            }
          }));
        }
      }));
  }

  logout() {
    this.isLogin = false;
    localStorage.setItem('STATE', 'false');
    return of({ success: this.isLogin });
  }

  isLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn === 'true') {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    return this.isLogin;
  }
}

 import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url = environment.api;

  constructor(
    private httpClient: HttpClient,
    private cookie: CookieService
  ) { }

  public sendCredentials(email: string, password: string): Observable<any> {
    return this.httpClient.post(`${this.url}/auth/login`, {email, password})
    .pipe(
      tap((response:any) => {
        //TODO: Manejo de cookies y token de sesion
        const {tokenSession} = response;
        this.cookie.set('token_session', tokenSession, 4, '/');
      })
    );
  }


}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {


  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): 
  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkCookieSession();
  }
  
  checkCookieSession(): boolean {
    try{
      if(!this.cookieService.check('token_session')){
        this.router.navigate(['/auth/login'])
      }
      return true; // Retorna true si la cookie existe, false si no
    }catch(error){
      console.error('Error al verificar la cookie de sesión:', error);
      this.router.navigate(['/auth/login']); // Redirige al login en caso de error
      return false; // En caso de error, se asume que no hay sesión válida
    }
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService:AuthService,private router: Router ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // return true ça veut dire "navigation autorisée"
      /*return this.authService.isAdmin()*/

      if(this.authService.getLoggedIn()){
        this.router.navigate(['']);
        console.log("OK")
      }

      return this.authService.getLoggedIn();
      /*.then(admin  => {
        if(admin) {
          console.log("navigation autorisée")
          return true;
        } else {
          console.log("navigation refusée")
          return false;
        }
      })*/

  }

}

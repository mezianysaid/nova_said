import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthentificationService } from 'src/app/services/auth/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private UserService:AuthentificationService,private router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
      if(!this.UserService.isLoggedIn()){
         this.router.navigateByUrl('/login');
         this.UserService.deleteToken();
         return false;
      }
    return true;
  }
}

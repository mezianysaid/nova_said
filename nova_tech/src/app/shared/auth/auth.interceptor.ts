import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { AuthentificationService } from "src/app/services/auth/authentification.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private UserService:AuthentificationService,private router:Router){}
    intercept(req:HttpRequest<any>, next:HttpHandler){
      if(req.headers.get('NoAuth')){
         return next.handle(req.clone());
      }else{
          const clonedreq=req.clone({
                headers:req.headers.set('authorization','bearer ' + this.UserService.getToken())
          });
          return next.handle(clonedreq).pipe(
              tap( 
                  event =>{
                  },
                  err=>{
                      if(err.error.auth==false){ this.router.navigateByUrl('/login');}
                  }
              )
          )
      }
    }
}
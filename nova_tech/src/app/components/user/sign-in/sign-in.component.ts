import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/auth/authentification.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  error: any='';

  constructor(public _AuthService:AuthentificationService,private router:Router,private dialog:MatDialog) { }

  ngOnInit(): void {
    
    if(this._AuthService.isLoggedIn()){
      this.router.navigateByUrl('/home');
    }
  }
  onSubmit(){
    if(this._AuthService.formSignIn.valid){
      this._AuthService.Login(this._AuthService.formSignIn.value).subscribe(
        (res:any )=>{ 
             this._AuthService.setToken(res.token);
             this.router.navigateByUrl('home')
             this.dialog.closeAll();
             this._AuthService.formSignIn.reset();
      },err=>{
            this.error=err.error;    
      });
    } 
  }
  onClose(){
    this.dialog.closeAll();
  }
}

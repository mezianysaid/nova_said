import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/auth/authentification.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(public AuthService:AuthentificationService,private router:Router,private _http:HttpClient) { }
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSeccesMessage!:boolean;
  serverErrorMessage!:string;
  roleSelected!:string
  messagepass!:string;
  selectedFile=null;
  imageData!:string;
  ngOnInit(): void {
  }
  roles:string[]=['ADMIN','USER']
  onSubmit(){
    if(this.AuthService.formUser.valid){     
      console.log(this.AuthService.formUser.value)
      if(!this.AuthService.CkeckConfPass(this.AuthService.formUser.get('password')?.value,this.AuthService.formUser.get('Confirmpassword')?.value))
        {
          this.AuthService.RegisterUser(this.AuthService.formUser.value.fullName,this.AuthService.formUser.value.email,this.AuthService.formUser.value.password,this.AuthService.formUser.value.Roles,
            this.AuthService.formUser.value.idAdmin).subscribe(res=>{
              this.showSeccesMessage=true;
              this.AuthService.formUser.reset();
              this.router.navigate(['/login'])
              }
              ,err=>{
                   this.serverErrorMessage=err.error});
            }
      }
    }
     
}

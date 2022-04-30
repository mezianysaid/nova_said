import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { User } from 'src/app/classes/User.model';
import {environment} from'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  pass: any;
  confirmpass: any;
  ErrorMsg!: string;
  isAuthenticated=false;
  
  constructor(private http:HttpClient,private route: Router) { }
  formUser: FormGroup=new FormGroup({
    _id:new FormControl(null),
    fullName:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(4)]),
    Confirmpassword:new FormControl('',[Validators.required,Validators.minLength(4)]),
    Roles:new FormControl('',[Validators.required]),
    idAdmin:new FormControl(''),
    __v:new FormControl(0),
  });
  //create form Login
  formSignIn: FormGroup =new FormGroup({
    _id:new FormControl(null),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(4)]),
    __v:new FormControl(0),
  });
  readonly url='http://localhost:3100/api/uploads/';
  NoauthHeader={headers:new HttpHeaders({'NoAuth':'True'})}
  roles:[]=[]
  public RegisterUser(fullName:any,email:any,password:any,Roles:any,idAdmin:any){
    const data=new FormData();
    data.append("fullName", fullName);
    data.append("email", email);
    data.append("password",password);
    data.append("Roles",Roles);
    data.append("idadmin",idAdmin);
    return this.http.post(environment._urlBase + 'user/register',data);
   }

   Login(authCredentials:any):Observable<{}>{
    return this.http.post(environment._urlBase +'user/Authenticate',authCredentials,this.NoauthHeader);
                        //  map((res: HttpResponse) =>{
                          //  return res;
                        //  })).pipe(catchError(err=>this.errorHandler.errorHand(err)));
 }
 errorHand(error:HttpErrorResponse){
   let errMessage='';
   if(error){
     try{
       //error.error holds the json respone from api
       errMessage=JSON.stringify(error.error);
     }catch(err){
       errMessage=error.statusText;
     }
     return throwError(errMessage || error || 'Server error');
   }
   return throwError(errMessage || error || 'Server error');
 }
 CkeckConfPass(pass:string,confirmpass:string):any{
      if(pass != confirmpass){
      this.ErrorMsg="PASSWORDS DOES NOT MATCH !";
      }
    return this.ErrorMsg;
 }
 getUserProfile(){
  return this.http.get(environment._urlBase +'user/details');
 }
//helper methods
 setToken(token:any){
   localStorage.setItem('token',token);
 }
 getToken(){
   return localStorage.getItem('token')
 }
 deleteToken(){
   localStorage.removeItem('token');
 }
 getUserPayLoad(){
   var token = this.getToken();
   if(token){
      var userpayload= atob(token.split('.')[1]);
      return JSON.parse(userpayload);
   }else { return null;}
 }
 isLoggedIn(){
   var userPayload=this.getUserPayLoad();
   if(userPayload){
     this.isAuthenticated=true;
    //  this.isAuthenticated.asObservable();
      return userPayload.exp > Date.now() / 1000;
   }else {
   this.isAuthenticated=false;
     return false;
   }

 }
  getRoleUser(){
    return this.formUser.get('Roles');
  }

}

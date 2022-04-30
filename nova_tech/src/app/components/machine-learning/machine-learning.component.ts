import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {  Observable, throwError } from 'rxjs';
import { catchError, map,filter} from 'rxjs/operators';
import { AuthentificationService } from 'src/app/services/auth/authentification.service';
import { BlogService } from 'src/app/services/blog.service';
import { Blog } from '../../classes/Blog';
import { AddBlogComponent } from '../add-blog/add-blog.component';
import { User } from '../../classes/User.model';
@Component({
  selector: 'app-machine-learning',
  templateUrl: './machine-learning.component.html',
  styleUrls: ['./machine-learning.component.scss']
})
export class MachineLearningComponent implements OnInit {
  len?: number;

  constructor(private router:Router,
              public _serviceBlog:BlogService,
              private dialog:MatDialog,
              private route:ActivatedRoute,
              private _authServ:AuthentificationService
    ) { }
   blogs$!:Observable<Blog[]>
   deatilsBlog?:Blog[]
   crs:any;
   module:any
   searchTerm!:string
   key!:string
   role: any;
   user: any;
   
  ngOnInit(): void { 
    if(this._authServ.isLoggedIn()){
                 this._authServ.getUserProfile().subscribe(res=>{
                    this.user=res ; 
                   this.role=this.user.user.Roles;
    })}        
    this._serviceBlog.refresh$.subscribe(()=>{
      this.getListBlogs();
    })
    this.getListBlogs();
    this.module=this.route.routeConfig?.path
    // console.log(this.module)
  }
  getListBlogs(){
    const bloges$=this._serviceBlog.ListBlogs().pipe(
      map(bloges=>bloges),
      catchError(err=>{
        const message="Could not load blogs";
        console.log(message,err);
        return throwError(err)
      })
      );
     this.blogs$=bloges$.pipe(
       map(bloges=>bloges.filter(res=>res.module==this.module))
     );
     this.blogs$.subscribe(res=>{this.len=res.length})
  }


  ShowModuleDialog(){
     const dialogConfig=new MatDialogConfig()
     dialogConfig.ariaLabel="Add Blog";
     dialogConfig.autoFocus=true;
     dialogConfig.closeOnNavigation=true;
     dialogConfig.width="80%";
     dialogConfig.data={
       module:this.module
     }
     this.dialog.open(AddBlogComponent,dialogConfig);
  }
  DetailsBlog(id:any){
     this.router.navigate(["Detailsblog",{id}])
  }

  Search(){
    if(this.searchTerm==""){
      this.getListBlogs()
    }else{
      this.key=this.searchTerm.toLocaleLowerCase();
      const bloges$=this._serviceBlog.ListBlogs().pipe(
        map(bloges=>bloges),
        catchError(err=>{
          const message="Could not load blogs";
          console.log(message,err);
          return throwError(err)
        })
        );
       this.blogs$=bloges$.pipe(
         map(bloges=>bloges.filter(res=>(res.title?.toLocaleLowerCase().match(this.key) && res.module==this.module)))
       );
    }
  }
  clearSearch(){
    this.searchTerm='';
    this.getListBlogs()
  }
  }

import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { course } from 'src/app/classes/course.model';
import { BlogService } from 'src/app/services/blog.service';
import { Blog } from '../../classes/Blog';
import { AddCourseComponent } from '../add-course/add-course.component';
import { AuthentificationService } from '../../services/auth/authentification.service';
import { PipeTransform, Pipe } from "@angular/core";
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
// @Pipe({ name: ''})
export class BlogsComponent implements OnInit{
  role: any;
  user: any;
  constructor(public _serviceBlog:BlogService,
    private route:ActivatedRoute,
    private dialog:MatDialog,public sanitizer: DomSanitizer,private _authServ:AuthentificationService) { }
  blogs$?:Observable<any>
  show=false
  id:any
  courses$?:Observable<course[]>
  ngOnInit(): void {
    if(this._authServ.isLoggedIn()){
      this._authServ.getUserProfile().subscribe(res=>{
         this.user=res ; 
        this.role=this.user.user.Roles;
})}        
    this.id=this.route.snapshot.params['id']
    this._serviceBlog.refresh$.subscribe(()=>{
      this.getListBlogs(this.id);
    })
    this.getListBlogs(this.id)
  }
  getListBlogs(id:any){
    const bloges$=this._serviceBlog.ListBlogs().pipe(
      map(bloges=>bloges),
      catchError(err=>{
        const message="Could not load blogs";
        console.log(message,err);
        return throwError(err)
      })
      );
     this.blogs$=bloges$.pipe(
       map(bloges=>bloges.filter(res=>res._id==id))
     );
     this.blogs$.subscribe(res=>{ console.log(res)})
  }
  ShowModuleDialog(){
    const dialogConfig=new MatDialogConfig()
    dialogConfig.ariaLabel="Add Blog";
    dialogConfig.autoFocus=true;
    dialogConfig.closeOnNavigation=true;
    dialogConfig.width="80%";
    dialogConfig.data={
      data:this.id,
    }
    this.dialog.open(AddCourseComponent,dialogConfig);
 }
 ShowDivImage(){
     if(this.show==false){this.show=true}
     else(this.show=false)
 }
 AddImage(event:any){
  if(this._serviceBlog.formImage.valid){
    // console.log(this._serviceBlog.formImage.value)
    this._serviceBlog.AddImageToBlog(this._serviceBlog.formImage.value?.filename, this.id).subscribe(()=>{ 
      this._serviceBlog.formImage.reset();
      this.show=false;
    });
  }
 }
}

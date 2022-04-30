import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { BlogService } from 'src/app/services/blog.service';
import { Blog } from '../../classes/Blog';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {
  blogs$?: Observable<Blog[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any ,public _serviceBlog:BlogService,private dialog:MatDialog,private route:Router) { }

  ngOnInit(): void {
  }
  getListBlogs(){
    const bloges$=this._serviceBlog.ListBlogs().pipe(
      map(res=>res),
      catchError(err=>{
        const message="Could not load blogs";
        console.log(message,err);
        return throwError(err)
      })
      );
    bloges$.subscribe(res=>{
        console.log(res)
      })
     this.blogs$=bloges$.pipe(
       map(bloges=>bloges)
     )
  }
  AddBlog(event:any){
        //  console.log(this._serviceBlog.formBlog.value?.title)
        if(this._serviceBlog.formBlog.valid){
         this._serviceBlog.AddBlog(this._serviceBlog.formBlog.value?.title,this._serviceBlog.formBlog.value?.image,
          this.data.module).subscribe();
         this._serviceBlog.formBlog.reset();        
        //  this.route.navigateByUrl("/ML")
         this.closedialog();
  }
}
closedialog(){
  this.dialog.closeAll();
}
}

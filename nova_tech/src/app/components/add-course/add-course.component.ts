import { BlogService } from '../../services/blog.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Editor } from 'primeng/editor';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  constructor(public _serviceBlog:BlogService,
              private dialog:MatDialog,
              private route:ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public data:any) { }
   id:any
  ngOnInit(): void {
    // this.id=this.route.snapshot.params['id']
    this.id=this.data.data
  }
  AddBlog(event:any){
      this._serviceBlog.AddCourse(this._serviceBlog.formCourse?.value,this.id).subscribe();
      this._serviceBlog.formCourse.reset();
      this.closedialog();
  }
  closedialog(){
    this.dialog.closeAll()
  }

}

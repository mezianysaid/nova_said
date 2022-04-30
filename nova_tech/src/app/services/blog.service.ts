import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, shareReplay, Subject} from 'rxjs';
import { map, tap} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Blog } from '../classes/Blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  formBlog:FormGroup=new FormGroup({
    title:new FormControl('',[Validators.required]),
    module:new FormControl(''),
    image:new FormControl()
  });
  formCourse:FormGroup=new FormGroup({
    content:new FormControl('',[Validators.required])
  });
  formImage:FormGroup=new FormGroup({
    filename:new FormControl('',[Validators.required])
  })
  constructor(private http:HttpClient) { }
  Blogs$!:Observable<Blog[]>;
  private subject=new BehaviorSubject<Blog[]>([])
  // refresh
  private _refresh$=new Subject<void>()
  get refresh$(){
    return this._refresh$;
  }
  // add Blog 
  AddBlog(title:any,image:File,module:string):Observable<any>{
    // console.log(image.name,module)
    // image=image.name
    const data=new FormData()
    data.append("title",title);
    data.append("image",image);
    data.append("module",module)
    return this.http.post<any>(environment._urlBase+'blog/addBlog',data)
    .pipe(
      shareReplay(),
      tap(()=>{
        this._refresh$.next();
      })
    )
  }
  ListBlogs():Observable<Blog[]>{
    return this.http.get<Blog[]>(environment._urlBase+'blog/listblog').pipe(
      map((res:any)=> res),
      tap(blogs=>this.subject.next(blogs)),
      shareReplay()
    );
  }
  getListCourses():Observable<{}>{
       return this.http.get<{}>(environment._urlBase+'blog/fetchBlogs').pipe(shareReplay());
  }
  // 00000000000000000000000000000000
  AddCourse(data:any,id:any){
   return this.http.post<any>(environment._urlBase+'blog/addCourse/'+`${id}`,{data}).pipe(
     shareReplay(),tap(()=>{this._refresh$.next()})
   );
  }

  AddImageToBlog(image:File,id:any){
     const data=new FormData();
     data.append('image',image);
     data.append('id',id)
     console.log(image)
    return this.http.post<any>(environment._urlBase+'blog/addImageToBlog',data).pipe(
         tap(()=>{this._refresh$.next()}),
         shareReplay()
    )
  }
  SearchOnBLog(term:string){
    return this.http.get<any>(environment._urlBase+'blog/Searchblog/'+`${term}`);
  }
}

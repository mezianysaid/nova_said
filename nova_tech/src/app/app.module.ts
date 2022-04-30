import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MachineLearningComponent } from './components/machine-learning/machine-learning.component';
import { MaterialModule } from './shared/-material/-material.module';
import { HomeComponent } from './components/home/home.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { BlogService } from './services/blog.service';
import { BlogsComponent } from './components/blogs/blogs.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { EditorModule } from 'primeng/editor';
import { DeepLearningComponent } from './components/deep-learning/deep-learning.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { AuthInterceptor } from './shared/auth/auth.interceptor';
import { AuthentificationService } from './services/auth/authentification.service';
import { AuthGuardService } from './shared/auth/auth.guard.service';
import { DefaultLogComponent } from './components/user/default-log/default-log.component';
import { DefaultComponent } from './components/user/default/default.component';
import { AngularComponent } from './components/angular/angular.component';
@NgModule({
  declarations: [
    AppComponent,
    MachineLearningComponent,
    HomeComponent,
    SideNavComponent,
    AddBlogComponent,
    BlogsComponent,
    AddCourseComponent,
    DeepLearningComponent,
    SignInComponent,
    SignUpComponent,
    DefaultLogComponent,
    DefaultComponent,
    AngularComponent
  ],
  imports: [
    // NgxsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    MaterialModule,
    MatTabsModule,
    EditorModule,
  ],
  entryComponents:[
    AddBlogComponent,
    AddCourseComponent,
    SignInComponent,
    SignUpComponent
  ],
  providers: [
    { provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    AuthentificationService,
   AuthGuardService,
    BlogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

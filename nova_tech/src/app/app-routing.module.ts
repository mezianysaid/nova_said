import { MachineLearningComponent } from './components/machine-learning/machine-learning.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { DeepLearningComponent } from './components/deep-learning/deep-learning.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { DefaultComponent } from './components/user/default/default.component';
import { AuthGuardService } from './shared/auth/auth.guard.service';
import { AngularComponent } from './components/angular/angular.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'home',component:HomeComponent ,canActivate:[AuthGuardService]},
  {path:'ML',component:MachineLearningComponent,canActivate:[AuthGuardService]},  
  {path:'DL',component:DeepLearningComponent,canActivate:[AuthGuardService]},  
  {path:'Detailsblog',component:BlogsComponent,canActivate:[AuthGuardService]},
  {path:'addBlog',component:AddBlogComponent,canActivate:[AuthGuardService]},
  {path:'signIn',component:SignInComponent,canActivate:[AuthGuardService]},
  {path:'signUp',component:SignUpComponent,canActivate:[AuthGuardService]},
  {path:'angular',component:AngularComponent,canActivate:[AuthGuardService]},
  {path:'login',component:DefaultComponent},
  {path:'**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}

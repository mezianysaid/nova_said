import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { AuthentificationService } from '../../services/auth/authentification.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  // breakpointObserver: any;
  constructor(private breakpointObserver: BreakpointObserver,
    private auth:AuthentificationService,
    private route:Router) { }

  ngOnInit(): void {
  }
  paths=[
    {path:'home',label:'Home',icon:'home'},
    {path:'ML',label:'Machine Learning',icon:'article'},
    {path:'DL',label:'Deep Learning',icon:'article'},
    {path:'angular',label:'Angular',icon:'article'},
  ]
logout(){
this.auth.deleteToken();
this.route.navigate(['/login'])
}
}

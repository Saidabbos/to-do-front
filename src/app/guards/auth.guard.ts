import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
  logged: boolean;
  constructor(private router: Router,
              private auth: AuthService) {
    this.logged = this.auth.signed;
    if (!this.logged) {
      this.router.navigate(['/login']);
    }
    this.listenChange();
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin();
  }
  listenChange() {
     this.auth.logged.subscribe((data) => {
       this.logged = data;
      if (!data) {
        return this.checkLogin();
      }
     });
  }
  checkLogin() {
    return this.logged;
  }
}

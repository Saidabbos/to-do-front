import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';


@Injectable()
export class GuestGuard implements CanActivate {
  logged: boolean;
  constructor(private router: Router, private auth: AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.logged = this.auth.signed;
    if (this.logged) {
      this.router.navigate(['/plans']);
    }
    return !this.logged;
  }
}

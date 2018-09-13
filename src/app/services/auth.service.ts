import { Injectable } from '@angular/core';
import {TokenService} from './token.service';
import {Subject} from 'rxjs';
import {RequestService} from './request.service';

@Injectable()
export class AuthService {
  logged = new Subject<boolean>();
  signed: boolean;
  constructor(private request: RequestService,
              private token: TokenService) {
    if (localStorage.getItem('user')) {
      this.signed = true;
      this.logged.next(true);
    } else {
      this.signed = false;
      this.logged.next(false);
    }
  }
  setLogin(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.signed = true;
    this.token.hasToken.next(true);
    this.logged.next(true);
  }
    logout() {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
    }
    this.signed = false;
    this.token.hasToken.next(false);
    this.logged.next(false);
  }
}

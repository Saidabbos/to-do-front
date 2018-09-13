import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class TokenService {
  hasToken = new Subject();
  constructor() { }

}

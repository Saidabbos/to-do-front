import { Component } from '@angular/core';
import {RequestService} from './services/request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-front';
  constructor() {
  }
}

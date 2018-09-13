import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestService} from "../services/request.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private request: RequestService,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new  FormControl('', [Validators.required])
    });
  }
  signin() {
    if (this.loginForm.valid) {
      this.request.post(`signin`, this.loginForm.value).then(response => {
        this.auth.setLogin((response));
        this.router.navigate(['/plans']);
      }).catch(error => {
      });
    }
  }

}

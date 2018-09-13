import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from "ng2-validation";
import {RequestService} from "../services/request.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  loginForm: FormGroup;
   errors: any;
  constructor(private request: RequestService,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    const password = new FormControl('', Validators.compose([Validators.required]));
    const confirm = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);
    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: password,
      c_password: confirm
    });
  }
  signup() {
    if (this.loginForm.valid) {
      this.request.post('signup', this.loginForm.value).then(response => {
        this.auth.setLogin(response);
        this.router.navigate(['/plans']);
      }).catch(error => {
        this.errors = error;
      });
    }
  }

}

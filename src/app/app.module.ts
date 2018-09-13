import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RequestService} from './services/request.service';
import {TokenService} from './services/token.service';
import {HttpClientModule} from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { PlansComponent } from './plans/plans.component';
import {RouterModule} from '@angular/router';
import {AppRoutes} from './app-routes';
import {
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatToolbarModule, MatListModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthGuard} from "./guards/auth.guard";
import {GuestGuard} from "./guards/guest.guard";
import {AuthService} from "./services/auth.service";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { ConfirmationComponent } from './confirmation/confirmation.component';
import {CustomFormsModule} from "ng2-validation";

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    PlansComponent,
    ConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutes,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    InfiniteScrollModule,
    MatFormFieldModule,
    HttpClientModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    CustomFormsModule
  ],
  providers: [RequestService, TokenService, AuthGuard, GuestGuard, AuthService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationComponent]
})
export class AppModule { }

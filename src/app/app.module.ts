import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SignUpComponent } from './signup/signup.component';

import { UserService } from './shared/services/user.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'science' })
  ],
  providers: [
    FormBuilder,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

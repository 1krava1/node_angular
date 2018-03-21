import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SignUpComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { InventoryComponent } from './inventory/inventory.component';

import { InventoryService } from './shared/services/inventory.service';
import { UserService } from './shared/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

export function tG() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    InventoryComponent,
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tG
      }
    }),
    NgbModule.forRoot(),
    BrowserModule.withServerTransition({ appId: 'science' })
  ],
  providers: [
    FormBuilder,
    UserService,
    InventoryService,
    JwtModule,
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

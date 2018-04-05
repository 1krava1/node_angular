import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbAccordionConfig, NgbAccordion, NgbTabsetConfig, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { SignUpComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AccountComponent } from './account/account.component';
import { FaqComponent } from './faq/faq.component';

import { InventoryService } from './shared/services/inventory.service';
import { UserService } from './shared/services/user.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService } from './shared/guards/auth-guard.service';

export function tG() {
  return typeof localStorage !== 'undefined' ? localStorage.getItem('jwt') : '';
}

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    InventoryComponent,
    AccountComponent,
    FaqComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule.withServerTransition({ appId: 'science' }),
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tG
      }
    }),
  ],
  providers: [
    FormBuilder,
    UserService,
    InventoryService,
    JwtModule,
    JwtHelperService,
    AuthGuardService,
    NgbAccordion,
    NgbAccordionConfig,
    NgbTabsetConfig,
    NgbDropdownConfig,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

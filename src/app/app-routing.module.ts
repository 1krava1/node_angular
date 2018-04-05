import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SignUpComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AccountComponent } from './account/account.component';
import { FaqComponent } from './faq/faq.component';

import { AuthGuardService as isAuthorised } from './shared/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'signup/:token',
    component: SignUpComponent,
  },
  {
    path: 'inventory/:game',
    component: InventoryComponent,
    canActivate: [isAuthorised]
  },
  {
    path: 'inventory',
    component: InventoryComponent,
    canActivate: [isAuthorised]
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [isAuthorised]
  },
  {
    path: 'faq',
    component: FaqComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Customer/login/login.component';
import { RegisterComponent } from './Customer/register/register.component';
import { AuthGuardGuard } from './Guards/auth-guard.guard';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"menu",component:MenuComponent,canActivate:[AuthGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

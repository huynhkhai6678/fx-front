import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainRoutes} from './main.routing';
import {RouterModule} from '@angular/router';
import {PrivacyComponent} from '../../pages/privacy/privacy.component';
import {LoginComponent} from '../../pages/login/login.component';


@NgModule({
  declarations: [PrivacyComponent,LoginComponent],
  imports: [
    RouterModule.forChild(MainRoutes),
    CommonModule
  ]
})
export class MainModule { }

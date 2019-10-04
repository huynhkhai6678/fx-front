import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './layouts/main/main.component';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {LandingComponent} from './layouts/landing/landing.component';


const routes: Routes = [{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full',
}, {
  path: '',
  component: MainComponent,
  children: [
    {
      path: '',
      loadChildren: './layouts/main/main.module#MainModule'
    }]
},{
  path: '',
  component: LandingComponent,
  children: [
    {
      path: '',
      loadChildren: './layouts/landing/landing.module#LandingModule'
    }]
},
  {
    path: '**',
    redirectTo: 'dashboard'
  }];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

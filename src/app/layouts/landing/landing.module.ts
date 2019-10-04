import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {LandingRoutes} from './landing.routing';
import {HomeComponent} from '../../home/home.component';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { CarouselModule } from 'ngx-bootstrap';




@NgModule({
  declarations: [HomeComponent],
  imports: [
    RouterModule.forChild(LandingRoutes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    CarouselModule
  ]
})
export class LandingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CustomersModule } from 'src/app/customers/pages/customers/customers.module';
import { CreditCardsModule } from 'src/app/customers/pages/credit-cards/credit-cards.module';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { LoginModule } from '../login/login.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,

    LoginModule,
    CustomersModule,
    CreditCardsModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule

  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }

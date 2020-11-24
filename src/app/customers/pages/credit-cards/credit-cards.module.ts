import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditCardsRoutingModule } from './credit-cards-routing.module';
import { CreditCardsComponent } from './credit-cards.component';


@NgModule({
  declarations: [CreditCardsComponent],
  imports: [
    CommonModule,
    CreditCardsRoutingModule
  ],
  exports: [
    CreditCardsComponent
  ]
})
export class CreditCardsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditCardsRoutingModule } from './credit-cards-routing.module';
import { CreditCardsComponent } from './credit-cards.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [CreditCardsComponent],
  imports: [
    CommonModule,
    CreditCardsRoutingModule,
    ReactiveFormsModule,

    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSidenavModule
  ],
  exports: [
    CreditCardsComponent
  ]
})
export class CreditCardsModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { CreditCardsComponent } from './customers/pages/credit-cards/credit-cards.component';
import { CustomersComponent } from './customers/pages/customers/customers.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/'
      },
    {
        path: 'customers',
        component: CustomersComponent
    },
    {
        path: 'credit-cards',
        component: CreditCardsComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }

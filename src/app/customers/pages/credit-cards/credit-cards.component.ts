import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreditCardDto } from '../../models/credit-card.dto';
import { CustomerDto } from '../../models/customer.dto';
import { CreditCardService } from '../../services/credit-card.service';

@Component({
  selector: 'app-credit-cards',
  templateUrl: './credit-cards.component.html',
  styleUrls: ['./credit-cards.component.scss']
})
export class CreditCardsComponent implements OnInit {

  customer: CustomerDto = new CustomerDto();
  dataSource: CreditCardDto[] = [];
  displayedColumns: string[] = ['number', 'expire', 'printName', 'cvc', 'edit', 'delete'];

  form: FormGroup;

  id: string;
  textButton = 'Guardar';
  textTitle = 'Agregar nueva tarjeta de crédito';

  @Output() closeCreditCard = new EventEmitter<any>();

  constructor(
    private creditCardsService: CreditCardService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      number: new FormControl(),
      expire: new FormControl(),
      printName: new FormControl(),
      cvc: new FormControl()
    });
  }

  setCustomer(customer: CustomerDto) {
    this.customer = customer;
    this.getCreditCards();
  }

  closeScreen() {
    this.cancel();
    this.closeCreditCard.emit();
  }

  getCreditCards() {
    this.creditCardsService.getByCustomerId(this.customer.id).subscribe( resp => {
      if (resp.success) {
        this.dataSource = resp.data;
      }
    }, error => {
      this.openSnackBar(error.error.message, null);
    });
  }

  saveCreditCard() {

    const numberTC: string = this.form.controls['number'].value;
    const expire: string = this.form.controls['expire'].value;
    const cvc: string = this.form.controls['cvc'].value;

    if (!numberTC) {
      this.openSnackBar('El numero de la tarjeta de crédito es requerido.', null);
    } else if (!expire) {
      this.openSnackBar('La fecha expiración de la tarjeta de crédito es requerido', null);
    } else if (!cvc) {
      this.openSnackBar('El código de seguridad de la tarjeta de crédito es requerido', null);
    } else {
      const creditCard: CreditCardDto = new CreditCardDto();
      creditCard.customer = this.customer;
      creditCard.number = numberTC;
      creditCard.expire = expire;
      creditCard.printName = this.form.controls['printName'].value;
      creditCard.cvc = cvc;

      this.creditCardsService.save(creditCard).subscribe( resp => {
        if (resp.success) {
          this.cancel();
          this.getCreditCards();
        }
      }, error => {
        this.openSnackBar(error.error.message, null);
      });
    }
  }

  editCreditCard(creditCard: CreditCardDto) {
    this.textButton = 'Actualizar';
    this.textTitle = 'Modificar tarjeta de crédito';
    this.id = creditCard.number;
    this.form.controls['number'].setValue(creditCard.number);
    this.form.controls['expire'].setValue(creditCard.expire);
    this.form.controls['printName'].setValue(creditCard.printName);
    this.form.controls['cvc'].setValue(creditCard.cvc);
  }

  cancel() {
    this.id = null;
    this.form.reset();
    this.textButton = 'Guardar';
    this.textTitle = 'Agregar nueva tarjeta de crédito';
  }

  updateCreditCard(creditCard: CreditCardDto) {
    this.creditCardsService.update(creditCard).subscribe( resp => {
      if (resp.success) {
        this.getCreditCards();
      }
    }, error => {
      this.openSnackBar(error.error.message, null);
    });
  }

  deleteCreditCard(creditCard: CreditCardDto) {
    this.creditCardsService.delete(creditCard.number).subscribe( resp => {
      if (resp.success) {
        this.getCreditCards();
      }
    }, error => {
      this.openSnackBar(error.error.message, null);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}

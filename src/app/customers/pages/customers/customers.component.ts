import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerDto } from '../../models/customer.dto';
import { CustomerService } from '../../services/customer.service';
import { CreditCardsComponent } from '../credit-cards/credit-cards.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  dataSource: CustomerDto[] = [];
  displayedColumns: string[] = ['id', 'docType', 'docId', 'firstName', 'lastName', 'email', 'phone', 'age', 'edit', 'delete', 'viewCreditCards'];

  form: FormGroup;

  id: number;
  textButton = 'Guardar';
  textTitle = 'Agregar nuevo cliente';

  @ViewChild('drawer', { static: false }) drawer: MatDrawer;
  @ViewChild('creditCardComp', { static: false }) creditCardComp: CreditCardsComponent;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getCustomers();
  }

  initForm() {
    this.form = this.fb.group({
      firstName: new FormControl(),
      lastName: new FormControl(),
      docType: new FormControl(),
      docId: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      age: new FormControl()
    });
  }

  getCustomers() {
    this.customerService.get().subscribe( resp => {
      if (resp.success) {
        this.dataSource = resp.data;
      }
    }, error => {
      this.openSnackBar(error.error.message, null);
    });
  }

  saveCustomer() {

    const firstName: string = this.form.controls['firstName'].value;
    const lastName: string = this.form.controls['lastName'].value;
    const docType: string = this.form.controls['docType'].value;
    const docId: string = this.form.controls['docId'].value;

    if (!firstName) {
      this.openSnackBar('El nombre es requerido.', null);
    } else if (!lastName) {
      this.openSnackBar('El apellido es requerido', null);
    } else if (!docType) {
      this.openSnackBar('El tipo de documento es requerido', null);
    } else if (!docId) {
      this.openSnackBar('El documento es requerido', null);
    } else {
      const customer: CustomerDto = new CustomerDto();
      customer.id = this.id;
      customer.firstName = firstName;
      customer.lastName = lastName;
      customer.docType = docType;
      customer.docId = docId;
      customer.email = this.form.controls['email'].value;
      customer.phone = this.form.controls['phone'].value;
      customer.age = this.form.controls['age'].value;

      this.customerService.save(customer).subscribe( resp => {
        if (resp.success) {
          this.cancel();
          this.getCustomers();
        }
      }, error => {
        this.openSnackBar(error.error.message, null);
      });
    }
  }

  editCustomer(customer: CustomerDto) {
    this.textButton = 'Actualizar';
    this.textTitle = 'Modificar cliente';
    this.id = customer.id;
    this.form.controls['firstName'].setValue(customer.firstName);
    this.form.controls['lastName'].setValue(customer.lastName);
    this.form.controls['docType'].setValue(customer.docType);
    this.form.controls['docId'].setValue(customer.docId);
    this.form.controls['email'].setValue(customer.email);
    this.form.controls['phone'].setValue(customer.phone);
    this.form.controls['age'].setValue(customer.age);
  }

  cancel() {
    this.id = null;
    this.form.reset();
    this.textButton = 'Guardar';
    this.textButton = 'Agregar nuevo cliente';
  }

  updateCustomer(customer: CustomerDto) {
    this.customerService.update(customer).subscribe( resp => {
      if (resp.success) {
        this.getCustomers();
      }
    }, error => {
      this.openSnackBar(error.error.message, null);
    });
  }

  deleteCustomer(customer: CustomerDto) {
    this.customerService.delete(customer.id).subscribe( resp => {
      if (resp.success) {
        this.getCustomers();
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

  showCreditCards(customer: CustomerDto) {
    this.creditCardComp.setCustomer(customer);
    this.drawer.open();
  }

  closeCreditCards() {
    this.drawer.close();
    this.getCustomers();
  }

}

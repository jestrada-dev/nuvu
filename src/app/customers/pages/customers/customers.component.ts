import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerDto } from '../../models/customer.dto';
import { CustomerService } from '../../services/customer.service';

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
      console.log('Customers', resp);
      if (resp.success) {
        this.dataSource = resp.data;
      }
    }, error => {
      this.openSnackBar(error.error.message, null);
      console.log('Customers', error);
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

      console.log('creando customer', customer);
      this.customerService.save(customer).subscribe( resp => {
        console.log('Add new Customer', resp);
        if (resp.success) {
          this.cancel();
          this.getCustomers();
        }
      }, error => {
        this.openSnackBar(error.error.message, null);
        console.log('Add new Customer', error);
      });
    }
  }

  editCustomer(customer: CustomerDto) {
    this.textButton = 'Actualizar';
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
  }

  updateCustomer(customer: CustomerDto) {
    this.customerService.update(customer).subscribe( resp => {
      console.log('Update Customer', resp);
      if (resp.success) {
        this.getCustomers();
      }
    }, error => {
      this.openSnackBar(error.error.message, null);
      console.log('Update Customer', error);
    });
  }

  deleteCustomer(customer: CustomerDto) {
    this.customerService.delete(customer.id).subscribe( resp => {
      console.log('Delete Customer', resp);
      if (resp.success) {
        this.getCustomers();
      }
    }, error => {
      this.openSnackBar(error.error.message, null);
      console.log('Delete Customer', error);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}

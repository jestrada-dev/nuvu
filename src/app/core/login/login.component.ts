import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDto } from 'src/app/security/models/user.dto';
import { UserService } from 'src/app/security/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() login: EventEmitter<UserDto> = new EventEmitter();

  form: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      userName: new FormControl(),
      password: new FormControl()
    });
  }

  signIn() {
    const userName = this.form.controls['userName'].value;
    const password = this.form.controls['password'].value;
    if (userName && password) {
      const user: UserDto = new UserDto();
      user.userName = userName;
      user.password = password;

      this.userService.login(user).subscribe( resp => {
        if (resp.success) {

          this.login.emit(resp.data);
        }
      }, error => {
        this.openSnackBar(error.error.message, null);
      });
    } else {
      this.openSnackBar('Escriba usuario y contraseña', null);
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}

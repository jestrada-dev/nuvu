import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/security/models/user.dto';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLogged = false;

  constructor(
    public globalService: GlobalService
  ) { }

  ngOnInit(): void {
  }

  authenticated(user: UserDto){
    this.globalService.user = user;
    this.isLogged = true;
  }

  signOut() {
    this.globalService.user = null;
    this.isLogged = false;
  }
}

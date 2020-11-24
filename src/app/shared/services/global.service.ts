import { Injectable } from "@angular/core";
import { UserDto } from 'src/app/security/models/user.dto';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    public user: UserDto = new UserDto();

    constructor() {

    }

}

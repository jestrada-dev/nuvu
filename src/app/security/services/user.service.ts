import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResponse } from 'src/app/shared/models/general-response';
import { EndPoint } from '../../customers/services/end-point';
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../models/user.dto';

@Injectable({
    providedIn: 'root'
  })
  export class UserService {

    resource = '/users';
    url = EndPoint.URL + this.resource;

    constructor(private http: HttpClient) {
    }

    get(): Observable<GeneralResponse<UserDto[]>> {
        return this.http.get<GeneralResponse<UserDto[]>>(this.url);
    }

    save(users: UserDto[]): Observable<GeneralResponse<UserDto[]>> {
        return this.http.post<GeneralResponse<UserDto[]>>(this.url, users);
    }

    update(users: UserDto[]): Observable<GeneralResponse<UserDto[]>> {
        return this.http.put<GeneralResponse<UserDto[]>>(this.url, users);
    }

    delete(userName: string): Observable<GeneralResponse<string>> {
        return this.http.delete<GeneralResponse<string>>(this.url + '/' + userName);
    }

    login(user: UserDto): Observable<GeneralResponse<UserDto>> {
        return this.http.post<GeneralResponse<UserDto>>(this.url + '/auth', user);
    }

  }

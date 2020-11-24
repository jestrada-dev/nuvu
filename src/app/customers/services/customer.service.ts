import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResponse } from 'src/app/shared/models/general-response';
import { EndPoint } from './end-point';
import { HttpClient } from '@angular/common/http';
import { CustomerDto } from '../models/customer.dto';

@Injectable({
    providedIn: 'root'
  })
  export class CustomerService {

    resource = '/customers';
    url = EndPoint.URL + this.resource;

    constructor(private http: HttpClient) {
    }

    get(): Observable<GeneralResponse<CustomerDto[]>> {
        return this.http.get<GeneralResponse<CustomerDto[]>>(this.url);
    }

    save(customer: CustomerDto): Observable<GeneralResponse<CustomerDto>> {
        return this.http.post<GeneralResponse<CustomerDto>>(this.url, customer);
    }

    update(customer: CustomerDto): Observable<GeneralResponse<CustomerDto>> {
        return this.http.put<GeneralResponse<CustomerDto>>(this.url, customer);
    }

    delete(id: number): Observable<GeneralResponse<number>> {
        return this.http.delete<GeneralResponse<number>>(this.url + '/' + id);
    }

  }

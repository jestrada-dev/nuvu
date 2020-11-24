import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResponse } from 'src/app/shared/models/general-response';
import { EndPoint } from './end-point';
import { HttpClient } from '@angular/common/http';
import { CreditCardDto } from '../models/credit-card.dto';

@Injectable({
    providedIn: 'root'
  })
  export class CreditCardService {

    resource = '/credit-cards';
    url = EndPoint.URL + this.resource;

    constructor(private http: HttpClient) {
    }

    get(): Observable<GeneralResponse<CreditCardDto[]>> {
        return this.http.get<GeneralResponse<CreditCardDto[]>>(this.url);
    }

    getByCustomerId(customerId: number): Observable<GeneralResponse<CreditCardDto[]>> {
        return this.http.get<GeneralResponse<CreditCardDto[]>>(this.url + '/customer-id/' + customerId);
    }

    save(creditCard: CreditCardDto): Observable<GeneralResponse<CreditCardDto>> {
        return this.http.post<GeneralResponse<CreditCardDto>>(this.url, creditCard);
    }

    update(creditCard: CreditCardDto): Observable<GeneralResponse<CreditCardDto>> {
        return this.http.put<GeneralResponse<CreditCardDto>>(this.url, creditCard);
    }

    delete(numberCreditCard: string): Observable<GeneralResponse<string>> {
        return this.http.delete<GeneralResponse<string>>(this.url + '/' + numberCreditCard);
    }

  }

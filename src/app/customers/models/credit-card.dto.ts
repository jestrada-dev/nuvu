import { CustomerDto } from './customer.dto';

export class CreditCardDto {
    number: string;
    expire: string;
    printName: string;
    cvc: string;
    customer: CustomerDto;
}

import { CreditCardDto } from './credit-card.dto';

export class CustomerDto {
    id: number;
    docType: string;
    docId: string;
    lastName: string;
    firstName: string;
    creditCards: CreditCardDto[];
    email: string;
    phone: string;
    age: string;
}

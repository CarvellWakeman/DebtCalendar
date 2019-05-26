import { ILoanPayment } from './ILoanPayment';

export interface ILoan {
    id: number;
    lender: string;
    description: string;
    paymentDate: Date;
    interestRate: number;
    currentPayment: ILoanPayment;
}
import { ILoan } from '../interfaces/ILoan';
import { ILoanPayment } from '../interfaces/ILoanPayment';

export class Api {
    BaseUrl = 'https://localhost:44352';

    constructor() {
    }

    // Loans
    getLoans = (): Promise<any> => {
        return fetch(this.BaseUrl + '/api/loans', {
            method: 'GET'
        })
        .then(response => response.json() as Promise<any>)
        .then(result => { return result; });
    }

    getLoan = (loanId: number): Promise<any> => {
        return fetch(this.BaseUrl + '/api/loans/' + loanId, {
            method: 'GET'
        })
        .then(response => response.json() as Promise<any>)
        .then(result => { return result; });
    }

    // Loan Payments
    getPayments = (loanId: number): Promise<any> => {
        return fetch(this.BaseUrl + '/api/loans/' + loanId + '/payments', {
            method: 'GET'
        })
        .then(response => response.json() as Promise<any>)
        .then(result => { return result; });
    }
}
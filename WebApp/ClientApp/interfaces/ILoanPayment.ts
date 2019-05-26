export interface ILoanPayment {
    date: Date;
    startBalance: number;
    minimumInterest: number;
    minimumPrincipal: number;
    additionalPrincipal: number;
    totalPayment: number;
    endBalance: number;
}
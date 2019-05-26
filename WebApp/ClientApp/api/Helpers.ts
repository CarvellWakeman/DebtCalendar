import { ILoanPayment } from '../interfaces/ILoanPayment';

export class Helpers {
    // Constants
    secondsInDay = (24 * 60 * 60);

    // Helpers
    formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    formatDateTime = (datetime: Date) => {
        let date = new Date(datetime);
        return date.toDateString();
    }

    formatCurrency = (data: number) => {
        return this.formatter.format(data);
    }

    linearInterpolate = (start: number, end: number, curr: number) => {
        return (curr - start) / (end - start);
    }

    calculateDailyCost = (loanPayment: ILoanPayment) => {
        let now = new Date();
        let daysInMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        return (loanPayment.totalPayment / daysInMonth);
    }

    calculateCurrentCost = (loanPayment: ILoanPayment) => {
        let now = new Date();
        let todaySeconds = now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds();
        return this.linearInterpolate(0, this.secondsInDay, todaySeconds) * this.calculateDailyCost(loanPayment);
    }
}
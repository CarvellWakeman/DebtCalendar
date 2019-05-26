import * as React from 'react';
import { ILoan } from '../interfaces/ILoan';
import { ILoanPayment } from '../interfaces/ILoanPayment';
import { NavLink } from 'react-router-dom';
import { LoanPaymentRow } from './LoanPaymentRow';

interface Props {
    loan: ILoan;
    linkTo: string;
}

// Shows information for a single loan, links to detailed view of loan
export class LoanRow extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    // Helpers
    formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    formatCurrency = (data: number) => {
        return this.formatter.format(data);
    }

    // TODO: do
    linearInterpolate = (start: number, end: number, curr: number) => {
        return 1;
    }

    // TODO: max milliseconds in a day constant
    calculateDailyCost = (loanPayment: ILoanPayment) => {
        let now = new Date(0);
        return this.linearInterpolate(0, 1000000, now.getMilliseconds()) * loanPayment.totalPayment;
    }

    public render() {
        return <NavLink to={this.props.linkTo} exact activeClassName='active' className='list-group-item list-group-item-action'>
            <div className='row'>
                <div className='col-sm font-weight-bold'>
                    {this.props.loan.lender}
                </div>
                <div className='col-sm text-right font-weight-bold'>
                    {this.formatCurrency(this.calculateDailyCost(this.props.loan.currentPayment))} Paid Today
                </div>
            </div>

            <div className='row'>
                <div className='col-sm'>
                    <LoanPaymentRow payment={this.props.loan.currentPayment} />
                </div>
            </div>
        </NavLink>
    }
}

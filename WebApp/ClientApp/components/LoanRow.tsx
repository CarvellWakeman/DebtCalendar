import * as React from 'react';
import { ILoan } from '../interfaces/ILoan';
import { ILoanPayment } from '../interfaces/ILoanPayment';
import { NavLink } from 'react-router-dom';
import { LoanPaymentRow } from './LoanPaymentRow';
import { Helpers } from '../api/Helpers';

interface Props {
    loan: ILoan;
    linkTo: string;
}

interface State {
    helpers: Helpers;
}

// Shows information for a single loan, links to detailed view of loan
export class LoanRow extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            helpers: new Helpers()
        };
    }

    public render() {
        return <NavLink to={this.props.linkTo} exact activeClassName='active' className='list-group-item list-group-item-action'>
            <div className='row'>
                <div className='col-sm font-weight-bold'>
                    {this.props.loan.lender}
                </div>
                <div className='col-sm text-right font-weight-bold'>
                    <div>
                        <div className='d-inline-flex bd-highlight text-success'>
                            {this.state.helpers.formatCurrency(this.state.helpers.calculateCurrentCost(this.props.loan.currentPayment))}
                        </div>
                        <div className='d-inline-flex bd-highlight px-2'>
                            of
                        </div>
                        <div className='d-inline-flex bd-highlight'>
                            {this.state.helpers.formatCurrency(this.state.helpers.calculateDailyCost(this.props.loan.currentPayment))} Paid Today
                        </div>
                    </div>
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

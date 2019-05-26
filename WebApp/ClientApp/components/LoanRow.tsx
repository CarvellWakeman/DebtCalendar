import * as React from 'react';
import { ILoan } from '../interfaces/ILoan';
import { ILoanPayment } from '../interfaces/ILoanPayment';
import { NavLink } from 'react-router-dom';
import { LoanPaymentRow } from './LoanPaymentRow';
import { Helpers } from '../api/Helpers';

interface Props {
    loan: ILoan;
    linkTo: string;
    updateFunc: (n: number, m: number) => any;
}

interface State {
    helpers: Helpers;
    totalDailyCost: number;
    partialDailyCost: number;
}

// Shows information for a single loan, links to detailed view of loan
export class LoanRow extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);

        let scopedHelpers = new Helpers();

        this.state = {
            helpers: scopedHelpers,
            partialDailyCost: scopedHelpers.calculateCurrentCost(this.props.loan.currentPayment),
            totalDailyCost: scopedHelpers.calculateDailyCost(this.props.loan.currentPayment)
        };
    }

    public componentWillMount() {
        this.props.updateFunc(this.state.partialDailyCost, this.state.totalDailyCost);
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
                            {this.state.helpers.formatCurrency(this.state.partialDailyCost)}
                        </div>
                        <div className='d-inline-flex bd-highlight px-2'>
                            of
                        </div>
                        <div className='d-inline-flex bd-highlight'>
                            {this.state.helpers.formatCurrency(this.state.totalDailyCost)} Paid Today
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

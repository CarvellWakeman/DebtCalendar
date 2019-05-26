import * as React from 'react';
import { RouteComponentProps, Redirect, RouterProps } from 'react-router';
import { NavLink, RouteProps, withRouter } from 'react-router-dom';
import { ILoan } from '../interfaces/ILoan';
import { ILoanPayment } from '../interfaces/ILoanPayment';
import { LoanPaymentRow } from './LoanPaymentRow';
import { Api } from '../api/Api';

interface Props extends RouteComponentProps<any> {
}

interface State {
    api: Api;
    loan?: ILoan;
    payments: Array<ILoanPayment>;
}

// Detailed view of a loan
export class LoanDetails extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            api: new Api(),
            loan: undefined,
            payments: []
        };
    }

    // Lifecycle
    componentWillMount() {
        // Get Loan
        this.state.api.getLoan(this.props.match.params.loanId)
            .then(result => {
                this.setState({
                    loan: result.data as ILoan
                });    
            });

        // Get its payments
        this.state.api.getPayments(this.props.match.params.loanId)
            .then(result => {
                this.setState({
                    payments: result.data as Array<ILoanPayment>
                });
            });
    }


    public render() {
        // Render each transaction
        const paymentsJSX = this.state.payments
            .map(payment => (
                <LoanPaymentRow payment={payment} />
        ));

        return <div id='account-details'>
            <div className='row h-100'>
                <div className='col'>
                    <div className='d-flex'>
                        <NavLink to={'/loans'} exact>
                            <span className='btn btn-outline-secondary'>Back</span>
                        </NavLink>
                        <p className='bd-lead ml-3'>{this.state.loan ? this.state.loan.lender : "loading..."}</p>
                    </div>

                    {paymentsJSX}
                </div>
            </div>
        </div>;
    }
}

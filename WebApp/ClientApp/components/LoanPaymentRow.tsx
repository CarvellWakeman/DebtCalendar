import * as React from 'react';
import { ILoanPayment } from '../interfaces/ILoanPayment';
import { Helpers } from '../api/Helpers';

interface Props {
    payment: ILoanPayment;
}

interface State {
    helpers: Helpers;
}

// Shows information about a single loan payment
export class LoanPaymentRow extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            helpers: new Helpers()
        };
    }
    
    public render() {
        return <div className='card mt-2'>
            <div className='card-body'>
                <div className='row'>
                    <div className='col card-text'>
                        {this.state.helpers.formatDateTime(this.props.payment.date)}
                    </div>

                    <div className='col card-text d-flex justify-content-center'>
                        Start Balance {this.state.helpers.formatCurrency(this.props.payment.startBalance)}
                    </div>

                    <div className='col card-text d-flex justify-content-center'>
                        Interest {this.state.helpers.formatCurrency(this.props.payment.minimumInterest)}
                    </div>

                    <div className='col card-text d-flex justify-content-center'>
                        End Balance {this.state.helpers.formatCurrency(this.props.payment.endBalance)}
                    </div>

                    <div className={'col card-text text-right'}>
                        Monthly Payment {this.state.helpers.formatCurrency(this.props.payment.totalPayment)}
                    </div>
                </div>
            </div>
        </div>;
    }
}

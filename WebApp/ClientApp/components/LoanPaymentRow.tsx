import * as React from 'react';
import { ILoanPayment } from '../interfaces/ILoanPayment';

interface Props {
    payment: ILoanPayment;
}

// Shows information about a single loan payment
export class LoanPaymentRow extends React.Component<Props, {}> {
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

    formatDateTime = (datetime: Date) => {
        let date = new Date(datetime);
        return date.toDateString();
    }

    formatCurrency = (data: number) => {
        return this.formatter.format(data);
    }
    
    public render() {
        return <div className='card mt-2'>
            <div className='card-body'>
                <div className='row'>
                    <div className='col card-text'>
                        {this.formatDateTime(this.props.payment.date)}
                    </div>

                    <div className='col card-text d-flex justify-content-center'>
                        Start Balance {this.formatCurrency(this.props.payment.startBalance)}
                    </div>

                    <div className='col card-text d-flex justify-content-center'>
                        Interest {this.formatCurrency(this.props.payment.minimumInterest)}
                    </div>

                    <div className='col card-text d-flex justify-content-center'>
                        End Balance {this.formatCurrency(this.props.payment.endBalance)}
                    </div>

                    <div className={'col card-text text-right'}>
                        Monthly Payment {this.formatCurrency(this.props.payment.totalPayment)}
                    </div>
                </div>
            </div>
        </div>;
    }
}

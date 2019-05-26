import * as React from 'react';
import { ITransaction } from '../interfaces/ITransaction';

interface Props {
    transaction: ITransaction;
}

// Shows information about a single transaction
export class Transaction extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    // Helpers
    timeToDateTime = (seconds: number) => {
        let date: Date = new Date(0);
        date.setUTCSeconds(seconds);
        return date.toDateString() + " " + date.toLocaleTimeString();
    }

    transactionTypeToColor = (transactionType: string) => {
        switch (transactionType) {
            case "Withdrawl":
                return "text-danger";
            case "Deposit":
                return "text-success";
            default:
                return "";
        }
    }

    transactionTypeToSymbol = (transactionType: string) => {
        switch (transactionType) {
            case "Withdrawl":
                return "-";
            default:
                return "";
        }
    }
    
    public render() {
        return <div className='card mt-2'>
            <div className='card-body'>
                <div className='row'>
                    <div className='col card-text'>
                        {this.timeToDateTime(this.props.transaction.timeStamp)}
                    </div>

                    <div className='col card-text'>
                        {this.props.transaction.source}
                    </div>

                    <div className={'col card-text text-right ' + this.transactionTypeToColor(this.props.transaction.transactionType)}>
                        {this.transactionTypeToSymbol(this.props.transaction.transactionType)}${Math.round(this.props.transaction.amount * 100) / 100}
                    </div>
                </div>
            </div>
        </div>;
    }
}

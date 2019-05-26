import * as React from 'react';
import { RouteComponentProps, Redirect, RouterProps } from 'react-router';
import { NavLink, RouteProps, withRouter } from 'react-router-dom';
import { IApiToken } from '../interfaces/IApiToken';
import { IAccount } from '../interfaces/IAccount';
import { ITransaction } from '../interfaces/ITransaction';
import { Transaction } from './Transaction';
import { AddTransactionForm } from './AddTransactionForm';

interface Props extends RouteComponentProps<any> {
    apiToken?: IApiToken;
}

interface State {
    account?: IAccount;
    transactions: Array<ITransaction>;
}

// Detailed view of an account, shows its transactions and allows more to be added
export class AccountDetails extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            account: undefined,
            transactions: []
        };
    }

    // Lifecycle
    componentWillMount() {
        // Get Account
        this.getAccount()
            .then(result => {
                this.setState({
                    account: JSON.parse(result.data) as IAccount
                });    
            });

        // Get its transactions
        this.getTransactions()
            .then(result => {
                // Logout if unauthorized
                if (result.statusCode == 401) {
                    localStorage.removeItem('apitoken')
                }

                if (result.statusCode == 200) {
                    this.setState({
                        transactions: JSON.parse(result.data) as Array<ITransaction>
                    });
                }
            });
    }


    // API calls
    getAccount = (): Promise<any> => {
        return fetch('getAccount', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: (this.props.apiToken ? this.props.apiToken.token : ""),
                accountId: this.props.match.params.accountId,
            })
        })
            .then(response => response.json() as Promise<any>)
            .then(result => { return result; });
    }

    getTransactions = (): Promise<any> => {
        return fetch('getTransactions', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: (this.props.apiToken ? this.props.apiToken.token : ""),
                accountId: this.props.match.params.accountId,
            })
        })
            .then(response => response.json() as Promise<any>)
            .then(result => { return result; });
    }

    postTransaction = (newTransaction: ITransaction): Promise<any> => {
        return fetch('postTransaction', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: (this.props.apiToken ? this.props.apiToken.token : ""),
                accountId: this.props.match.params.accountId,
                transaction: newTransaction
            })
        })
            .then(response => response.json() as Promise<any>)
            .then(result => { return result; });
    }

    // Form
    addTransaction = (type: string, source: string, amount: number) => {
        let newTransaction: ITransaction = { accountId: this.props.match.params.accountId, transactionType: type, amount: amount, source: source, timeStamp: new Date().getUTCSeconds() };

        this.postTransaction(newTransaction)
            .then(result => {
                // Logout if unauthorized
                if (result.statusCode == 401) {
                    localStorage.removeItem('apitoken')
                    this.forceUpdate();
                }

                // Get Account
                this.getAccount()
                    .then(accountResult => {
                        this.getTransactions()
                            .then(transactionResult => {
                                this.setState({
                                    account: JSON.parse(accountResult.data) as IAccount,
                                    transactions: JSON.parse(transactionResult.data) as Array<ITransaction>
                                });
                            });
                    });
            });
    }

    public render() {
        // Redirect when user is logged out
        if (!localStorage.getItem('apitoken')) {
            return <Redirect to='/sessionexpired' />;
        }

        // Render each transaction
        const transactionsJSX = this.state.transactions
            .sort((a, b) => a.timeStamp >= b.timeStamp ? -1 : 1)
            .map(transaction => (
            <Transaction transaction={transaction} />
        ));

        return <div id='account-details'>
            <div className='row h-100'>
                <div className='col'>
                    <div className='d-flex'>
                        <NavLink to={'/accounts'} exact>
                            <span className='btn btn-outline-secondary'>Back to Accounts</span>
                        </NavLink>
                        <p className='bd-lead ml-3'>{this.state.account ? this.state.account.accountType : ""} Account</p>
                        <p className='bd-lead ml-3'>{this.state.account ? "$" + Math.round(this.state.account.balance * 100) / 100 : ""}</p>
                    </div>

                    {transactionsJSX}

                    <AddTransactionForm submitHandler={this.addTransaction} apiToken={this.props.apiToken} accountId={this.props.match.params.accountId}/>
                </div>
            </div>
        </div>;
    }
}

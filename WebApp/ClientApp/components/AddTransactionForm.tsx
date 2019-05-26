import * as React from 'react';
import { RouteComponentProps, Redirect, RouterProps } from 'react-router';
import { NavLink, RouteProps, withRouter } from 'react-router-dom';
import { IApiToken } from '../interfaces/IApiToken';
import { IAccount } from '../interfaces/IAccount';
import { ITransaction } from '../interfaces/ITransaction';
import { Transaction } from './Transaction';

interface Props {
    apiToken?: IApiToken;
    accountId: any;
    submitHandler: (type:string, source:string, amount:number) => void;
}

interface State {
    sourceText: string;
    amount: number;
    type: string;
}

// Form used to post a new transaction to the API
export class AddTransactionForm extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            sourceText: "",
            amount: 0.0,
            type: "Deposit"
        };
    }

    // Event Handlers
    handleChangeSource = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ sourceText: e.currentTarget.value });
    }

    handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ amount: +e.currentTarget.value });
    }

    handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ type: e.currentTarget.value });
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (this.isValid()) {
            this.props.submitHandler(this.state.type, this.state.sourceText, this.state.amount);
            this.clearForm();
        }
    }

    // Form
    isValid = () => {
        if (!this.state.sourceText) { return false; }
        if (this.state.amount < 0) { return false; }
        if (!this.state.type) { return false; }

        return true;
    }

    clearForm = () => {
        this.setState({
            sourceText: "",
            amount: 0,
            type: "Deposit"
        });
    }

    public render() {
        return <div>
            <form className='mt-5' onSubmit={this.handleSubmit}>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <label className="input-group-text">Type</label>
                    </div>

                    <select className='custom-select'
                        onChange={this.handleChangeType}
                        value={this.state.type} required>
                        <option value="Deposit">Deposit</option>
                        <option value="Withdrawl">Withdrawl</option>
                    </select>


                    <input type="text"
                        className="form-control"
                        placeholder="Description"
                        value={this.state.sourceText}
                        onChange={this.handleChangeSource}
                        required />

                    <div className="input-group-prepend">
                        <label className="input-group-text">Amount</label>
                    </div>

                    <input type="number"
                        step="0.01"
                        className="form-control"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.handleChangeAmount}
                        min="0.01" required />

                     <div className="input-group-append">
                        <button className="btn btn-outline-secondary"
                            type="submit"
                            disabled={!this.isValid()}>Commit</button>
                    </div>
                </div>
            </form>
        </div>;
    }
}

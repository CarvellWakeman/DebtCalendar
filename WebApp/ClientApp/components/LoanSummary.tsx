import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { ILoan } from '../interfaces/ILoan';
import { LoanRow } from './LoanRow';
import { Api } from '../api/Api';

interface Props {
}

interface State {
    api: Api;
    loans: Array<ILoan>;
}

// Shows account details for a logged in user
export class LoanSummary extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            api: new Api(),
            loans: []
        };
    }

    // Lifecycle
    componentWillMount() {
        this.state.api.getLoans()
            .then(result => {
                this.setState({
                    loans: result.data as Array<ILoan>
                });
            });
    }

    public render() {
        // Render each loan
        const loansJSX = this.state.loans.map(loan => (
            <LoanRow loan={loan} linkTo={'/loans/' + loan.id}/>
        ));

        return (
            <div id='user-details'>
                <div className='row h-100'>
                    <div className='col'>
                        <p className='bd-lead'>Your Loans</p>
                        {loansJSX}
                    </div>
                </div>
            </div>
        );
    }
}

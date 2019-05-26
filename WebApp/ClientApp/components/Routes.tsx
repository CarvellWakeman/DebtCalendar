import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LoanSummary } from './LoanSummary';
import { LoanDetails } from './LoanDetails';

interface Props {
}

// Routing table for application
export class Routes extends React.Component<Props, {}> {
    constructor() {
        super();
    }

    public render() {
        return <div id='routes-container'>
            <Route exact path='/' render={() => <Redirect to='/loans'/>} />
            <Route exact path='/loans' render={() => <LoanSummary />} />
            <Route exact path='/loans/:loanId' render={(props) => <LoanDetails {...props} />} />
        </div>;
    }
}

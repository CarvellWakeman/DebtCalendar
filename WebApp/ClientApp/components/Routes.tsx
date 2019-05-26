import * as React from 'react';
import { Route } from 'react-router-dom';
import { Login } from './Login';
import { Register } from './Register';
import { UserDetails } from './UserDetails';
import { AccountDetails } from './AccountDetails';
import { SessionExpired } from './SessionExpired';
import { IApiToken } from '../interfaces/IApiToken';

interface Props {
    apiToken?: IApiToken;
    loginHandler: () => void;
}

// Routing table for application
export class Routes extends React.Component<Props, {}> {
    constructor() {
        super();
    }

    public render() {
        return <div id='routes-container'>
            <Route exact path='/' render={() => <Login loginHandler={this.props.loginHandler} />} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/sessionexpired' component={SessionExpired} />
            <Route exact path='/accounts' render={() => <UserDetails apiToken={this.props.apiToken} />} />
            <Route exact path='/account/:accountId/transactions' render={(props) => <AccountDetails apiToken={this.props.apiToken} {...props} />} />
        </div>;
    }
}

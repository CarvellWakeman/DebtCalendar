import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { IApiToken } from '../interfaces/IApiToken';
import { IAccount } from '../interfaces/IAccount';
import { Account } from './Account';

interface Props {
    apiToken?: IApiToken;
}

interface State {
    accounts: Array<IAccount>;
}

// Shows account details for a logged in user
export class UserDetails extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            accounts: []
        };
    }

    // Lifecycle
    componentWillMount() {
        this.getAccounts()
            .then(result => {
                // Logout if unauthorized
                if (result.statusCode == 401) {
                    localStorage.removeItem('apitoken')
                }

                this.setState({
                    accounts: JSON.parse(result.data) as Array<IAccount>
                });
            });
    }

    // API calls
    getAccounts = (): Promise<any> => {
        return fetch('getAccounts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: (this.props.apiToken ? this.props.apiToken.token : "")
            })
        })
            .then(response => response.json() as Promise<any>)
            .then(result => { return result; });
    }

    public render() {
        if (!localStorage.getItem('apitoken')) {
            return <Redirect to='/sessionexpired' />;
        }

        // Render each account
        const accountsJSX = this.state.accounts.map(account => (
            <Account account={account} linkTo={'/account/' + account.id + '/transactions'}/>
        ));

        return (
            <div id='user-details'>
                <div className='row h-100'>
                    <div className='col-7'>
                        <p className='bd-lead'>Your Accounts</p>
                        {accountsJSX}
                    </div>

                    <div className='col-5'>
                        <div className='card h-100'>
                            <div className='card-body'>
                                <div className='card-text'>
                                    Other Banking Stuff Would Go Here
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

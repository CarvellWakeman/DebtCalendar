import * as React from 'react';
import { Route, Link, NavLink, Redirect } from 'react-router-dom';
import { NavMenu } from './NavMenu';
import { Routes } from './Routes';
import { IApiToken } from '../interfaces/IApiToken';

interface State {
    apiToken?: IApiToken;
    redirectToLogin: boolean;
}

// Main app container, contains logic for login and logout
export class Layout extends React.Component<{}, State> {
    constructor() {
        super();

        // Get API token from token string
        this.state = {
            apiToken: this.buildToken(localStorage.getItem("apitoken")),
            redirectToLogin: false
        };
    }

    // API
    buildToken = (base64Token: string | null): IApiToken => {
        // Get user from API token
        let apiTokenObject = undefined;
        if (base64Token) {
            let splitToken = base64Token.split('.')[1];
            let jsonString: string = atob(splitToken);
            apiTokenObject = JSON.parse(jsonString);
            apiTokenObject.token = base64Token;
        }

        return apiTokenObject;
    }

    login = () => {
        this.setState({
            apiToken: this.buildToken(localStorage.getItem("apitoken"))
        });
    };

    logout = () => {
        localStorage.removeItem("apitoken");
        this.setState({
            apiToken: undefined,
            redirectToLogin: true
        });
    };

    public render() {
        if (this.state.redirectToLogin) {
            this.setState({
                redirectToLogin: false
            });
            return <Redirect to='/' />;
        }

        return <div id="parent-container">
            <NavMenu apiToken={this.state.apiToken} logoutHandler={this.logout}/>

            <div className='container-fluid main-container'>
                <Routes apiToken={this.state.apiToken} loginHandler={this.login} />
            </div>
        </div>;
    }
}

import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { IApiToken } from '../interfaces/IApiToken';

interface Props {
    apiToken: IApiToken;
    logoutHandler: () => void;
}

// Navbar menu shown when user is logged in
export class LoggedIn extends React.Component<Props, {}> {

    public render() {
        return <div>
            <div className="navbar-text ml-auto mr-4 text-white">Welcome, {this.props.apiToken.name}</div>
            <button className='btn btn-outline-primary' onClick={this.props.logoutHandler}>Log out</button>
        </div>;
    }
}

import * as React from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { LoggedOut } from './LoggedOut';
import { LoggedIn } from './LoggedIn';
import { IApiToken } from '../interfaces/IApiToken';

interface Props {
    apiToken?: IApiToken;
    logoutHandler: () => void;
}

// Container for navigation menu, links to main page
export class NavMenu extends React.Component<Props, {}> {

    public render() {
        // Right side of menu is login button by default
        let rightSideMenu = <LoggedOut />;

        // If user exists, display their name and log out button
        if (localStorage.getItem('apitoken') && this.props.apiToken) {
            rightSideMenu = <LoggedIn apiToken={this.props.apiToken} logoutHandler={this.props.logoutHandler} />
        }

        return <nav className="navbar navbar-dark bg-dark">
            <NavLink to={'/accounts'} exact activeClassName='active'>
                <span className="navbar-brand">Banking Ledger</span>
                <span className="navbar-text font-italic">for AltSource, by Zach Lerew</span>
            </NavLink>

            {rightSideMenu}
        </nav>
    }
}

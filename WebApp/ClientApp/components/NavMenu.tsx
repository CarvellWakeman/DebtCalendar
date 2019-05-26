import * as React from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';

interface Props {
}

// Container for navigation menu, links to main page
export class NavMenu extends React.Component<Props, {}> {

    public render() {
        return <nav className="navbar navbar-dark bg-dark">
            <div className="active">
                <span className="navbar-brand">Loan Payback Calendar</span>
                <span className="navbar-text font-italic">by Zach Lerew 2019</span>
            </div>
        </nav>
    }
}

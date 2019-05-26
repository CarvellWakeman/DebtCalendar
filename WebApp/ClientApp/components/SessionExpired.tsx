import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { Link } from 'react-router-dom';

// Session expired page that prompts user to log in again
export class SessionExpired extends React.Component<RouteComponentProps<{}>, {}> {
    constructor() {
        super();
        this.state = {};
    }

    public render() {
        return (
            <div>
                <p>Your session has expired (session expiration time is set in API/appsettings.json)</p>
                <Link to='/'>
                    <span className='btn btn-outline-primary'>
                        Click Here to Login Again
                    </span>
                </Link>
            </div>
        );
    }
}

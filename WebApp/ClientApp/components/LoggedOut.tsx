import * as React from 'react';
import { NavLink } from 'react-router-dom';

// Navbar menu shown when user is logged out
export class LoggedOut extends React.Component<{}, {}> {

    public render() {
        return <div>
            <NavLink to={'/register'} exact activeClassName='active'>
                <button className='btn btn-success register-button'>Register</button>
            </NavLink>

            <NavLink to={'/'} exact activeClassName='active'>
                <button className='btn btn-primary'>Login</button>
            </NavLink>                        
        </div>;
    }
}

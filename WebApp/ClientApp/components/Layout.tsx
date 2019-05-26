import * as React from 'react';
import { Route, Link, NavLink, Redirect } from 'react-router-dom';
import { NavMenu } from './NavMenu';
import { Routes } from './Routes';

interface State {
}

// Main app container
export class Layout extends React.Component<{}, State> {
    constructor() {
        super();
    }

    // API
    public render() {
        return <div id="parent-container">
            <NavMenu/>

            <div className='container-fluid main-container'>
                <Routes/>
            </div>
        </div>;
    }
}
